import { UserProgress, LessonProgress } from '@/types/progress';
import { STORAGE_KEY } from './constants';

function createInitialProgress(): UserProgress {
  return {
    lessons: {},
    currentLessonId: null,
    startedAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  };
}

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') return createInitialProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialProgress();
    return JSON.parse(raw) as UserProgress;
  } catch {
    return createInitialProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  progress.lastActiveAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  // Notify listeners (e.g. useLevel) that progress changed in real time
  window.dispatchEvent(new CustomEvent('codlearn:progress-updated'));
}

export function markLessonCompleted(lessonId: string, moduleId: string): void {
  const progress = getProgress();
  const existing = progress.lessons[lessonId];
  progress.lessons[lessonId] = {
    ...existing,
    lessonId,
    moduleId,
    completed: true,
    lastAccessedAt: new Date().toISOString(),
    completedAt: existing?.completedAt || new Date().toISOString(),
  };
  progress.currentLessonId = lessonId;
  saveProgress(progress);
}

export function getLessonProgress(lessonId: string): LessonProgress | null {
  const progress = getProgress();
  return progress.lessons[lessonId] || null;
}

export function getModuleProgress(
  moduleId: string,
  lessonIds: string[]
): { completed: number; total: number } {
  const progress = getProgress();
  const completed = lessonIds.filter(
    (id) => progress.lessons[id]?.completed
  ).length;
  return { completed, total: lessonIds.length };
}

export function getOverallProgress(allLessonIds: string[]): {
  completed: number;
  total: number;
  percentage: number;
} {
  const progress = getProgress();
  const completed = allLessonIds.filter(
    (id) => progress.lessons[id]?.completed
  ).length;
  const total = allLessonIds.length;
  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
