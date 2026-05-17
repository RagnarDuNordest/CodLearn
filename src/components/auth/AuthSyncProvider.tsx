'use client';

import { useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { getProgress, markLessonCompleted } from '@/lib/progress';

export default function AuthSyncProvider({ children }: { children: React.ReactNode }) {
  const syncedRef = useRef(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session && !syncedRef.current) {
        syncedRef.current = true;

        // Sync local progress to cloud on login
        const local = getProgress();
        const entries = Object.values(local.lessons);
        if (entries.length > 0) {
          const rows = entries.map((lp) => ({
            user_id: session.user.id,
            lesson_id: lp.lessonId,
            module_id: lp.moduleId,
            completed: lp.completed,
            completed_at: lp.completedAt ?? null,
            last_accessed_at: lp.lastAccessedAt ?? new Date().toISOString(),
          }));
          await supabase.from('lesson_progress').upsert(rows, { onConflict: 'user_id,lesson_id' });
        }

        // Load cloud progress into localStorage
        const { data } = await supabase
          .from('lesson_progress')
          .select('*')
          .eq('user_id', session.user.id);

        if (data) {
          for (const lp of data) {
            if (lp.completed) {
              markLessonCompleted(lp.lesson_id, lp.module_id);
            }
          }
        }

        // Notify app to refresh progress
        window.dispatchEvent(new CustomEvent('codlearn:progress-updated'));
      }

      if (event === 'SIGNED_OUT') {
        syncedRef.current = false;
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return <>{children}</>;
}
