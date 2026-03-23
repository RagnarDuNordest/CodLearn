'use client';

import { useState, useEffect, useRef } from 'react';

const TIMER_KEY_PREFIX = 'codlearn_time_';

function timerKey(lessonId: string): string {
  return `${TIMER_KEY_PREFIX}${lessonId}`;
}

function loadStoredSeconds(lessonId: string): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = localStorage.getItem(timerKey(lessonId));
    return raw ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}

function saveStoredSeconds(lessonId: string, seconds: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(timerKey(lessonId), String(seconds));
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  if (minutes >= 1) {
    return `${minutes} min`;
  }
  return `${seconds} seg`;
}

export function useLessonTimer(lessonId: string) {
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(() =>
    loadStoredSeconds(lessonId)
  );

  // Use a ref to hold the accumulated seconds so the interval closure always
  // reads the latest value without needing it in the dependency array.
  const accumulatedRef = useRef<number>(loadStoredSeconds(lessonId));

  // Re-sync when lessonId changes
  useEffect(() => {
    const stored = loadStoredSeconds(lessonId);
    accumulatedRef.current = stored;
    setElapsedSeconds(stored);
  }, [lessonId]);

  useEffect(() => {
    const interval = setInterval(() => {
      accumulatedRef.current += 1;
      setElapsedSeconds(accumulatedRef.current);
    }, 1000);

    return () => {
      clearInterval(interval);
      // Persist on unmount
      saveStoredSeconds(lessonId, accumulatedRef.current);
    };
  }, [lessonId]);

  const formattedTime = formatTime(elapsedSeconds);

  return { elapsedSeconds, formattedTime };
}

/**
 * Reads all codlearn_time_* keys from localStorage and returns the total
 * number of minutes studied across all lessons (rounded down).
 */
export function getTotalStudyMinutes(): number {
  if (typeof window === 'undefined') return 0;

  let totalSeconds = 0;

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(TIMER_KEY_PREFIX)) {
        const raw = localStorage.getItem(key);
        if (raw) {
          const seconds = parseInt(raw, 10);
          if (!isNaN(seconds)) {
            totalSeconds += seconds;
          }
        }
      }
    }
  } catch {
    // localStorage may be unavailable in some environments
  }

  return Math.floor(totalSeconds / 60);
}
