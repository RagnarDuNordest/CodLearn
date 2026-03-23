'use client';

import { useState, useEffect, useCallback } from 'react';

const GOAL_KEY = 'codlearn_daily_goal';
const PROGRESS_KEY = 'codlearn_daily_progress';

interface GoalData {
  target: number;
}

interface DailyProgressData {
  date: string;
  count: number;
}

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadGoal(): number {
  if (typeof window === 'undefined') return 1;
  try {
    const raw = localStorage.getItem(GOAL_KEY);
    if (!raw) return 1;
    const parsed = JSON.parse(raw) as GoalData;
    return parsed.target ?? 1;
  } catch {
    return 1;
  }
}

function loadTodayCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw) as DailyProgressData;
    if (parsed.date !== getTodayString()) return 0;
    return parsed.count ?? 0;
  } catch {
    return 0;
  }
}

function saveTodayCount(count: number): void {
  if (typeof window === 'undefined') return;
  const data: DailyProgressData = { date: getTodayString(), count };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

function saveGoal(t: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(GOAL_KEY, JSON.stringify({ target: t }));
}

export function useDailyGoal() {
  const [target, setTargetState] = useState<number>(1);
  const [todayCount, setTodayCount] = useState<number>(0);

  // Load on mount
  useEffect(() => {
    setTargetState(loadGoal());
    setTodayCount(loadTodayCount());
  }, []);

  // Listen for progress events to refresh today's count
  useEffect(() => {
    const handler = () => {
      setTodayCount(loadTodayCount());
    };
    window.addEventListener('codlearn:progress-updated', handler);
    return () => window.removeEventListener('codlearn:progress-updated', handler);
  }, []);

  const recordLessonCompleted = useCallback(() => {
    const today = getTodayString();
    let count = 0;
    try {
      const raw = localStorage.getItem(PROGRESS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DailyProgressData;
        if (parsed.date === today) count = parsed.count;
      }
    } catch { /* ignore */ }
    const newCount = count + 1;
    saveTodayCount(newCount);
    setTodayCount(newCount);
  }, []);

  const setTarget = useCallback((n: number) => {
    saveGoal(n);
    setTargetState(n);
  }, []);

  const percentage = target > 0 ? Math.min(100, Math.round((todayCount / target) * 100)) : 0;
  const isGoalMet = todayCount >= target;

  return { target, todayCount, percentage, isGoalMet, setTarget, recordLessonCompleted };
}
