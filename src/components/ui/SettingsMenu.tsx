'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  Settings,
  Sun,
  Moon,
  Monitor,
  RotateCcw,
  ChevronRight,
  X,
} from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { useThemeSettings } from '@/hooks/useThemeSettings';
import { useExperienceSettings } from '@/hooks/useExperienceSettings';
import { useDashboardBackground, BackgroundPatternType } from '@/hooks/useDashboardBackground';
import { PatternPreview } from '@/components/ui/BackgroundPattern';
import { playSound } from '@/lib/sounds';
import ProfileSetup from '@/components/ui/ProfileSetup';

const ACCENT_COLORS = [
  { hex: '#6366f1', label: 'Índigo' },
  { hex: '#8b5cf6', label: 'Roxo' },
  { hex: '#ec4899', label: 'Rosa' },
  { hex: '#ef4444', label: 'Vermelho' },
  { hex: '#f97316', label: 'Laranja' },
  { hex: '#eab308', label: 'Amarelo' },
  { hex: '#22c55e', label: 'Verde' },
  { hex: '#06b6d4', label: 'Ciano' },
];

const EDITOR_FONTS = [
  { value: 'monospace', label: 'Padrão' },
  { value: "'Fira Code', monospace", label: 'Fira Code' },
  { value: "'JetBrains Mono', monospace", label: 'JetBrains Mono' },
  { value: "'Cascadia Code', monospace", label: 'Cascadia Code' },
];

export default function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const { resolvedTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { resetProgress } = useProgress();
  const {
    settings,
    setAccentColor,
    setEditorFont,
    setEditorFontSize,
    setContentFontSize,
  } = useThemeSettings();

  const {
    settings: expSettings,
    setSoundEnabled,
    setAnimationsEnabled,
    setReminderEnabled,
    setReminderTime,
  } = useExperienceSettings();

  const { pattern: bgPattern, setPattern: setBgPattern } = useDashboardBackground();

  const BG_PATTERNS: { value: BackgroundPatternType; label: string }[] = [
    { value: 'none', label: 'Nenhum' },
    { value: 'dots', label: 'Pontos' },
    { value: 'grid', label: 'Grade' },
    { value: 'gradient', label: 'Gradiente' },
    { value: 'stars', label: 'Estrelas' },
    { value: 'matrix', label: 'Matrix' },
  ];

  function handleSoundToggle() {
    const next = !expSettings.soundEnabled;
    setSoundEnabled(next);
    if (next) {
      setTimeout(() => playSound('click'), 50);
    }
  }

  function handleReminderRequest() {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    Notification.requestPermission().then((perm) => {
      if (perm === 'granted') {
        setReminderEnabled(true);
      }
    });
  }

  const reminderStatusText = expSettings.reminderEnabled
    ? `🔔 Lembrete ativo para as ${expSettings.reminderTime}`
    : '🔕 Lembrete desativado';

  useEffect(() => { setMounted(true); }, []);

  // Close on outside click or Escape
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setConfirmReset(false);
      }
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); setConfirmReset(false); }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, []);

  const themes = [
    { id: 'light', label: 'Claro', icon: Sun },
    { id: 'dark', label: 'Escuro', icon: Moon },
    { id: 'system', label: 'Sistema', icon: Monitor },
  ] as const;

  const currentTheme = mounted ? (theme ?? 'system') : 'system';

  return (
    <div ref={ref} className="relative">
      {/* Gear button */}
      <button
        onClick={() => { setOpen((o) => !o); setConfirmReset(false); }}
        className={`rounded-full p-2 transition-colors hover:bg-accent ${
          open ? 'bg-accent text-foreground' : 'text-muted-foreground'
        }`}
        aria-label="Configurações"
        title="Configurações"
      >
        <Settings className={`h-5 w-5 transition-transform duration-300 ${open ? 'rotate-90' : ''}`} />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-background border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <span className="font-semibold text-sm">Configurações</span>
            <button
              onClick={() => { setOpen(false); setConfirmReset(false); }}
              className="p-1 rounded-lg hover:bg-accent transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="p-4 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Profile section — at the TOP */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Perfil
              </p>
              <ProfileSetup />
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Theme section */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Aparência
              </p>
              <div className="grid grid-cols-3 gap-2">
                {themes.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setTheme(id)}
                    className={`flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-xl border text-xs font-medium transition-all ${
                      currentTheme === id
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-muted-foreground/50 hover:bg-accent text-muted-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Accent color section */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Cor de destaque
              </p>
              <div className="grid grid-cols-8 gap-1.5">
                {ACCENT_COLORS.map(({ hex, label }) => {
                  const isSelected = settings.accentColor === hex;
                  return (
                    <button
                      key={hex}
                      onClick={() => setAccentColor(hex)}
                      title={label}
                      className="rounded-full transition-transform hover:scale-110"
                      style={{
                        width: 28,
                        height: 28,
                        background: hex,
                        outline: isSelected ? `3px solid white` : 'none',
                        outlineOffset: isSelected ? '-3px' : '0',
                        boxShadow: isSelected ? `0 0 0 2px ${hex}` : 'none',
                      }}
                      aria-label={label}
                    />
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Editor font section */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Fonte do editor
              </p>
              <div className="grid grid-cols-2 gap-2">
                {EDITOR_FONTS.map(({ value, label }) => {
                  const isSelected = settings.editorFont === value;
                  return (
                    <button
                      key={value}
                      onClick={() => setEditorFont(value)}
                      className={`px-2 py-2 rounded-xl border text-xs font-medium transition-all text-left truncate ${
                        isSelected
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-muted-foreground/50 hover:bg-accent text-muted-foreground'
                      }`}
                      style={{ fontFamily: value }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Font size section */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Tamanho da fonte
              </p>
              <div className="space-y-4">
                {/* Editor font size */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-muted-foreground">Editor</span>
                    <span className="text-xs font-medium text-foreground">{settings.editorFontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min={12}
                    max={20}
                    step={1}
                    value={settings.editorFontSize}
                    onChange={(e) => setEditorFontSize(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground/60 mt-0.5">
                    <span>12px</span>
                    <span>20px</span>
                  </div>
                </div>

                {/* Content font size */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-muted-foreground">Conteúdo</span>
                    <span className="text-xs font-medium text-foreground">{settings.contentFontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min={14}
                    max={20}
                    step={1}
                    value={settings.contentFontSize}
                    onChange={(e) => setContentFontSize(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground/60 mt-0.5">
                    <span>14px</span>
                    <span>20px</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Sons & Animações section */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Sons &amp; Animações
              </p>

              {/* Sound toggle */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-foreground leading-tight pr-2">🔊 Sons ao completar lições e ganhar badges</span>
                <button
                  role="switch"
                  aria-checked={expSettings.soundEnabled}
                  onClick={handleSoundToggle}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    expSettings.soundEnabled ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                      expSettings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Animations toggle */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-foreground leading-tight pr-2">🎉 Confetti e animações de celebração</span>
                <button
                  role="switch"
                  aria-checked={expSettings.animationsEnabled}
                  onClick={() => setAnimationsEnabled(!expSettings.animationsEnabled)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    expSettings.animationsEnabled ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                      expSettings.animationsEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Daily reminder sub-section */}
              <div className="mt-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Lembrete diário
                </p>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground">Lembrete de estudo</span>
                  <button
                    role="switch"
                    aria-checked={expSettings.reminderEnabled}
                    onClick={() => setReminderEnabled(!expSettings.reminderEnabled)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      expSettings.reminderEnabled ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                        expSettings.reminderEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {expSettings.reminderEnabled && (
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <label htmlFor="reminder-time" className="text-xs text-muted-foreground">
                        Horário:
                      </label>
                      <input
                        id="reminder-time"
                        type="time"
                        value={expSettings.reminderTime}
                        onChange={(e) => setReminderTime(e.target.value)}
                        className="text-sm bg-background border border-border rounded-lg px-2 py-1 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <button
                      onClick={handleReminderRequest}
                      className="w-full py-2 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
                    >
                      Ativar lembrete
                    </button>
                  </div>
                )}

                <p className="text-xs text-muted-foreground mt-2">{reminderStatusText}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Background pattern section */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Fundo do app
              </p>
              <div className="grid grid-cols-3 gap-2">
                {BG_PATTERNS.map(({ value, label }) => {
                  const isSelected = bgPattern === value;
                  return (
                    <button
                      key={value}
                      onClick={() => setBgPattern(value)}
                      title={label}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border p-1.5 transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-muted-foreground/50 hover:bg-accent'
                      }`}
                    >
                      <div className="w-12 h-8 rounded overflow-hidden bg-background border border-border/50">
                        <PatternPreview pattern={value} />
                      </div>
                      <span className={`text-[10px] font-medium ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Account / progress section */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Progresso
              </p>

              {!confirmReset ? (
                <button
                  onClick={() => setConfirmReset(true)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-red-500 transition-colors text-sm"
                >
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Resetar todo o progresso
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 space-y-2">
                  <p className="text-xs text-red-400 font-medium">
                    Tem certeza? Esta ação não pode ser desfeita.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        resetProgress();
                        setConfirmReset(false);
                        setOpen(false);
                      }}
                      className="flex-1 py-1.5 text-xs font-semibold bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                      Confirmar reset
                    </button>
                    <button
                      onClick={() => setConfirmReset(false)}
                      className="flex-1 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* App info */}
            <div className="border-t border-border pt-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">CodLearn v0.1</span>
              <span className="text-xs text-muted-foreground">Feito com ❤️</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
