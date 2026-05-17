import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, key);

export type Database = {
  profiles: {
    id: string;
    name: string | null;
    tag: string | null;
    avatar_id: string | null;
    created_at: string;
  };
  lesson_progress: {
    id: string;
    user_id: string;
    lesson_id: string;
    module_id: string;
    completed: boolean;
    completed_at: string | null;
    last_accessed_at: string;
  };
};
