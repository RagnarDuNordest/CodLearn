'use client';

import { useState, useEffect } from 'react';

interface ThemeSettings {
  accentColor: string;
  editorFont: string;
  editorFontSize: number;
  contentFontSize: number;
}

const STORAGE_KEY = 'codlearn_theme_settings';

const defaults: ThemeSettings = {
  accentColor: '#6366f1',
  editorFont: 'monospace',
  editorFontSize: 14,
  contentFontSize: 16,
};

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function lightenHex(hex: string, amount: number = 0.15): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * amount));
  const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * amount));
  const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function applySettings(settings: ThemeSettings) {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', settings.accentColor);
  root.style.setProperty('--color-primary-hover', lightenHex(settings.accentColor, 0.15));
  root.style.setProperty('--editor-font', settings.editorFont);
  root.style.setProperty('--editor-font-size', `${settings.editorFontSize}px`);
  root.style.setProperty('--content-font-size', `${settings.contentFontSize}px`);
}

function loadSettings(): ThemeSettings {
  if (typeof window === 'undefined') return defaults;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
}

function saveSettings(settings: ThemeSettings) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function useThemeSettings() {
  const [settings, setSettings] = useState<ThemeSettings>(defaults);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = loadSettings();
    setSettings(stored);
  }, []);

  // Apply CSS variables whenever settings change
  useEffect(() => {
    applySettings(settings);
  }, [settings]);

  const updateSettings = (partial: Partial<ThemeSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      saveSettings(next);
      return next;
    });
  };

  const setAccentColor = (color: string) => updateSettings({ accentColor: color });
  const setEditorFont = (font: string) => updateSettings({ editorFont: font });
  const setEditorFontSize = (size: number) =>
    updateSettings({ editorFontSize: Math.min(20, Math.max(12, size)) });
  const setContentFontSize = (size: number) =>
    updateSettings({ contentFontSize: Math.min(20, Math.max(14, size)) });

  return { settings, setAccentColor, setEditorFont, setEditorFontSize, setContentFontSize };
}
