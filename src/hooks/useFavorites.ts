'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'codlearn_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      setFavorites([]);
    }
  }, []);

  const toggleFavorite = useCallback((lessonId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId];
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (lessonId: string) => favorites.includes(lessonId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}
