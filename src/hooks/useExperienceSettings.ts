'use client';

import { useState, useEffect, useCallback } from 'react';

export interface ExperienceSettings {
  soundEnabled: boolean;
  animationsEnabled: boolean;
  reminderEnabled: boolean;
  reminderTime: string;
}

const STORAGE_KEY = 'codlearn_experience';

const DEFAULTS: ExperienceSettings = {
  soundEnabled: true,
  animationsEnabled: true,
  reminderEnabled: false,
  reminderTime: '20:00',
};

function loadSettings(): ExperienceSettings {
  if (typeof window === 'undefined') return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

function saveSettings(settings: ExperienceSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

export function useExperienceSettings() {
  const [settings, setSettings] = useState<ExperienceSettings>(DEFAULTS);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  const update = useCallback((patch: Partial<ExperienceSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      saveSettings(next);
      return next;
    });
  }, []);

  const setSoundEnabled = useCallback(
    (value: boolean) => update({ soundEnabled: value }),
    [update]
  );

  const setAnimationsEnabled = useCallback(
    (value: boolean) => update({ animationsEnabled: value }),
    [update]
  );

  const setReminderEnabled = useCallback(
    (value: boolean) => update({ reminderEnabled: value }),
    [update]
  );

  const setReminderTime = useCallback(
    (value: string) => update({ reminderTime: value }),
    [update]
  );

  return {
    settings,
    setSoundEnabled,
    setAnimationsEnabled,
    setReminderEnabled,
    setReminderTime,
  };
}
