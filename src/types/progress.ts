export interface LessonProgress {
  lessonId: string;
  moduleId: string;
  completed: boolean;
  lastAccessedAt: string;
  completedAt: string | null;
}

export interface UserProgress {
  lessons: Record<string, LessonProgress>;
  currentLessonId: string | null;
  startedAt: string;
  lastActiveAt: string;
}
