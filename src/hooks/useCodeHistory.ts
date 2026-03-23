'use client';

import { useState, useCallback, useEffect } from 'react';

export interface CodeSnapshot {
  code: string;
  timestamp: number;
  label?: string;
}

const MAX_HISTORY = 10;

export function useCodeHistory(lessonId: string) {
  const storageKey = `codlearn_history_${lessonId}`;
  const [history, setHistory] = useState<CodeSnapshot[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        setHistory([]);
      }
    }
  }, [storageKey]);

  const saveSnapshot = useCallback(
    (code: string, label?: string) => {
      setHistory((prev) => {
        const snap: CodeSnapshot = { code, timestamp: Date.now(), label };
        const updated = [snap, ...prev].slice(0, MAX_HISTORY);
        localStorage.setItem(storageKey, JSON.stringify(updated));
        return updated;
      });
    },
    [storageKey]
  );

  const clearHistory = useCallback(() => {
    localStorage.removeItem(storageKey);
    setHistory([]);
  }, [storageKey]);

  return { history, saveSnapshot, clearHistory };
}
