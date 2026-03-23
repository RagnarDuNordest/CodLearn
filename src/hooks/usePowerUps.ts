'use client';

import { useState, useCallback } from 'react';

const STORAGE_KEY = 'codlearn_powerups';

interface PowerUps {
  hintsUsed: Record<string, number>; // lessonId → count used
}

function loadPowerUps(): PowerUps {
  if (typeof window === 'undefined') return { hintsUsed: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { hintsUsed: {} };
    return JSON.parse(raw) as PowerUps;
  } catch {
    return { hintsUsed: {} };
  }
}

function savePowerUps(data: PowerUps) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function usePowerUps() {
  const [powerUps, setPowerUps] = useState<PowerUps>(() => loadPowerUps());

  const useHint = useCallback((lessonId: string) => {
    setPowerUps((prev) => {
      const updated: PowerUps = {
        hintsUsed: {
          ...prev.hintsUsed,
          [lessonId]: (prev.hintsUsed[lessonId] ?? 0) + 1,
        },
      };
      savePowerUps(updated);
      return updated;
    });
  }, []);

  const getHintsUsed = useCallback(
    (lessonId: string): number => {
      return powerUps.hintsUsed[lessonId] ?? 0;
    },
    [powerUps]
  );

  const totalHintsUsed = Object.values(powerUps.hintsUsed).reduce((a, b) => a + b, 0);

  return { useHint, getHintsUsed, totalHintsUsed };
}
