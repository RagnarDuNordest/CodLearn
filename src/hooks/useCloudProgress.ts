'use client';

import { useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';
import { getProgress } from '@/lib/progress';

export function useCloudProgress() {
  const { user } = useAuth();

  const syncLocalToCloud = useCallback(async () => {
    if (!user) return;
    const local = getProgress();
    const entries = Object.values(local.lessons);
    if (entries.length === 0) return;

    const rows = entries.map((lp) => ({
      user_id: user.id,
      lesson_id: lp.lessonId,
      module_id: lp.moduleId,
      completed: lp.completed,
      completed_at: lp.completedAt ?? null,
      last_accessed_at: lp.lastAccessedAt ?? new Date().toISOString(),
    }));

    await supabase.from('lesson_progress').upsert(rows, { onConflict: 'user_id,lesson_id' });
  }, [user]);

  const markLessonCompletedCloud = useCallback(async (lessonId: string, moduleId: string) => {
    if (!user) return;
    await supabase.from('lesson_progress').upsert({
      user_id: user.id,
      lesson_id: lessonId,
      module_id: moduleId,
      completed: true,
      completed_at: new Date().toISOString(),
      last_accessed_at: new Date().toISOString(),
    }, { onConflict: 'user_id,lesson_id' });
  }, [user]);

  const getCloudProgress = useCallback(async () => {
    if (!user) return null;
    const { data } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('user_id', user.id);
    return data;
  }, [user]);

  return { syncLocalToCloud, markLessonCompletedCloud, getCloudProgress };
}
