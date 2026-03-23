'use client';

import { useEffect } from 'react';

const LAST_REMINDED_KEY = 'codlearn_last_reminded';
const EXPERIENCE_KEY = 'codlearn_experience';

function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
}

function getCurrentHHMM(): string {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

function getExperienceSettings(): { reminderEnabled: boolean; reminderTime: string } | null {
  try {
    const raw = localStorage.getItem(EXPERIENCE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function checkAndFire(): void {
  if (typeof window === 'undefined') return;
  if (!('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  const settings = getExperienceSettings();
  if (!settings || !settings.reminderEnabled) return;

  const currentTime = getCurrentHHMM();
  if (currentTime !== settings.reminderTime) return;

  const today = getTodayDateString();
  const lastReminded = localStorage.getItem(LAST_REMINDED_KEY);
  if (lastReminded === today) return; // already fired today

  try {
    new Notification('CodLearn — Hora de estudar! 🚀', {
      body: 'Não esqueça da sua meta diária. Continue de onde parou!',
      icon: '/favicon.ico',
      tag: 'codlearn-reminder',
    });
    localStorage.setItem(LAST_REMINDED_KEY, today);
  } catch {
    // Notification may fail in some environments
  }
}

export function useReminder(): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check immediately on mount
    checkAndFire();

    // Then check every minute
    const interval = setInterval(checkAndFire, 60_000);

    return () => clearInterval(interval);
  }, []);
}
