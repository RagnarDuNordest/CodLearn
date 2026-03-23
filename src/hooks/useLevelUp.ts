'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLevel } from '@/hooks/useLevel';

const LAST_SEEN_LEVEL_KEY = 'codlearn_last_seen_level';

export function useLevelUp() {
  const { level } = useLevel();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState<number>(1);

  useEffect(() => {
    if (level === 0) return; // not yet hydrated

    const stored = localStorage.getItem(LAST_SEEN_LEVEL_KEY);
    const lastSeen = stored ? parseInt(stored, 10) : level;

    if (level > lastSeen) {
      setNewLevel(level);
      setShowLevelUp(true);
    }

    // Always keep last seen in sync (update after showing)
  }, [level]);

  const dismiss = useCallback(() => {
    setShowLevelUp(false);
    localStorage.setItem(LAST_SEEN_LEVEL_KEY, String(level));
  }, [level]);

  return { showLevelUp, newLevel, dismiss };
}
