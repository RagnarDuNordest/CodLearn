'use client';

import { useReminder } from '@/hooks/useDailyReminder';

export default function ReminderRunner() {
  useReminder();
  return null;
}
