'use client';

import { useState, useEffect, useCallback } from 'react';

interface StreakData {
  lastDate: string;
  count: number;
}

const STREAK_KEY = 'codlearn_streak';
const STREAK_BEST_KEY = 'codlearn_streak_best';

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function getYesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function loadStreakData(): StreakData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StreakData;
  } catch {
    return null;
  }
}

function loadBestStreak(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = localStorage.getItem(STREAK_BEST_KEY);
    return raw ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}

function saveStreakData(data: StreakData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STREAK_KEY, JSON.stringify(data));
}

function saveBestStreak(count: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STREAK_BEST_KEY, String(count));
}

/**
 * Computes the current streak count given stored data (or null if none).
 * Does NOT automatically save — calling code decides when to persist.
 */
function computeStreak(stored: StreakData | null): StreakData {
  const today = getTodayString();
  const yesterday = getYesterdayString();

  if (!stored) {
    // First time — start streak at 1
    return { lastDate: today, count: 1 };
  }

  if (stored.lastDate === today) {
    // Already recorded today — streak unchanged
    return stored;
  }

  if (stored.lastDate === yesterday) {
    // Consecutive day — increment
    return { lastDate: today, count: stored.count + 1 };
  }

  // Gap in days — reset
  return { lastDate: today, count: 1 };
}

export function useStreak() {
  const [streakDays, setStreakDays] = useState<number>(0);
  const [isNewRecord, setIsNewRecord] = useState<boolean>(false);

  useEffect(() => {
    const stored = loadStreakData();
    const best = loadBestStreak();

    // On mount, just read and display the current stored streak without
    // automatically advancing it. Activity is recorded only via recordActivity().
    const currentCount = stored ? stored.count : 0;
    setStreakDays(currentCount);
    setIsNewRecord(currentCount > 0 && currentCount >= best);
  }, []);

  /**
   * Call this when the user completes a learning activity (e.g. runs code,
   * finishes a lesson). It will advance the streak if needed and persist.
   */
  const recordActivity = useCallback(() => {
    const stored = loadStreakData();
    const newData = computeStreak(stored);

    saveStreakData(newData);

    const best = loadBestStreak();
    const newRecord = newData.count > best;
    if (newRecord) {
      saveBestStreak(newData.count);
    }

    setStreakDays(newData.count);
    setIsNewRecord(newRecord || newData.count >= best);
  }, []);

  return { streakDays, isNewRecord, recordActivity };
}
