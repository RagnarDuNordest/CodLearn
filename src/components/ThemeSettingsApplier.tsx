'use client';

import { useThemeSettings } from '@/hooks/useThemeSettings';

export default function ThemeSettingsApplier() {
  useThemeSettings(); // run the hook to apply CSS variables on mount
  return null;
}
