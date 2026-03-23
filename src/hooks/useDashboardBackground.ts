'use client';

import { useState, useEffect } from 'react';

export type BackgroundPatternType = 'none' | 'dots' | 'grid' | 'matrix' | 'gradient' | 'stars';

const STORAGE_KEY = 'codlearn_bg';

interface BgState {
  pattern: BackgroundPatternType;
}

export function useDashboardBackground() {
  const [pattern, setPatternState] = useState<BackgroundPatternType>('none');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: BgState = JSON.parse(saved);
        if (parsed.pattern) {
          setPatternState(parsed.pattern as BackgroundPatternType);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  function setPattern(newPattern: BackgroundPatternType) {
    setPatternState(newPattern);
    try {
      const state: BgState = { pattern: newPattern };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }

  return { pattern: mounted ? pattern : 'none' as BackgroundPatternType, setPattern };
}
