'use client';

import { useState, useEffect, useCallback } from 'react';

const WEEKLY_KEY = 'codlearn_weekly';

const DAY_LABELS: Record<number, string> = {
  0: 'Dom',
  1: 'Seg',
  2: 'Ter',
  3: 'Qua',
  4: 'Qui',
  5: 'Sex',
  6: 'Sáb',
};

function getTodayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function loadWeeklyData(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(WEEKLY_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, number>;
  } catch {
    return {};
  }
}

function saveWeeklyData(data: Record<string, number>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WEEKLY_KEY, JSON.stringify(data));
}

export function incrementToday() {
  const data = loadWeeklyData();
  const key = getTodayKey();
  data[key] = (data[key] ?? 0) + 1;
  saveWeeklyData(data);
}

export interface DayData {
  date: string;
  count: number;
  label: string;
}

export function useWeeklyActivity() {
  const [weekData, setWeekData] = useState<DayData[]>([]);

  const rebuild = useCallback(() => {
    const raw = loadWeeklyData();
    const days: DayData[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const key = `${y}-${m}-${day}`;
      days.push({
        date: key,
        count: raw[key] ?? 0,
        label: DAY_LABELS[d.getDay()] ?? key,
      });
    }
    setWeekData(days);
  }, []);

  useEffect(() => {
    rebuild();
  }, [rebuild]);

  useEffect(() => {
    const handler = () => {
      incrementToday();
      rebuild();
    };
    window.addEventListener('codlearn:lesson-completed', handler);
    return () => window.removeEventListener('codlearn:lesson-completed', handler);
  }, [rebuild]);

  return { weekData };
}
