'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserProgress } from '@/types/progress';
import {
  getProgress,
  markLessonCompleted,
  getModuleProgress as getModuleProgressUtil,
  getOverallProgress as getOverallProgressUtil,
  resetProgress,
} from '@/lib/progress';

export function useProgress(allLessonIds?: string[]) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(getProgress());
    setHydrated(true);
  }, []);

  const refresh = useCallback(() => {
    setProgress(getProgress());
  }, []);

  const markCompleted = useCallback(
    (lessonId: string, moduleId: string) => {
      markLessonCompleted(lessonId, moduleId);
      refresh();
    },
    [refresh]
  );

  const getModuleStats = useCallback(
    (moduleId: string, lessonIds: string[]) => {
      if (!hydrated) return { completed: 0, total: lessonIds.length };
      return getModuleProgressUtil(moduleId, lessonIds);
    },
    [hydrated]
  );

  const getOverallStats = useCallback(() => {
    if (!hydrated || !allLessonIds) return { completed: 0, total: allLessonIds?.length ?? 0, percentage: 0 };
    return getOverallProgressUtil(allLessonIds);
  }, [allLessonIds, hydrated]);

  const isLessonCompleted = useCallback(
    (lessonId: string) => {
      return progress?.lessons[lessonId]?.completed ?? false;
    },
    [progress]
  );

  const handleReset = useCallback(() => {
    resetProgress();
    refresh();
  }, [refresh]);

  return {
    progress,
    hydrated,
    refresh,
    markCompleted,
    getModuleStats,
    getOverallStats,
    isLessonCompleted,
    resetProgress: handleReset,
  };
}
