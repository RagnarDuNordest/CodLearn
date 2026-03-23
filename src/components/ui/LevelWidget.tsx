'use client';

import { useState, useRef, useEffect } from 'react';
import { useLevel, LEVELS } from '@/hooks/useLevel';
import { ChevronDown, Zap, Star } from 'lucide-react';

export default function LevelWidget() {
  const { level, levelInfo, totalXP, xpInLevel, xpForLevel, progressPct, xpToNext } = useLevel();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Compact trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg hover:bg-accent transition-colors group"
        title={`Nível ${level} — ${levelInfo.name} · ${totalXP} XP total`}
      >
        {/* Level number + name */}
        <div className="flex items-center gap-1">
          <span className="text-sm">{levelInfo.emoji}</span>
          <span className="text-xs font-bold text-foreground">Nível {level}</span>
          <ChevronDown
            className={`w-3 h-3 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </div>

        {/* Mini XP bar */}
        <div className="w-full h-1 bg-border rounded-full overflow-hidden" style={{ minWidth: '72px' }}>
          <div
            className="h-1 rounded-full bg-gradient-to-r from-primary to-blue-400 transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* XP label */}
        <span className="text-[10px] text-muted-foreground leading-none">
          {levelInfo.maxXP === Infinity
            ? `${totalXP} XP — Max`
            : `${xpInLevel}/${xpForLevel} XP`}
        </span>
      </button>

      {/* Popover */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-background border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 pt-4 pb-3 bg-gradient-to-br from-primary/10 to-blue-500/10 border-b border-border">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{levelInfo.emoji}</span>
              <div>
                <p className="font-bold text-lg leading-tight">Nível {level}</p>
                <p className="text-sm text-muted-foreground">{levelInfo.name}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xl font-bold text-primary">{totalXP}</p>
                <p className="text-xs text-muted-foreground">XP total</p>
              </div>
            </div>

            {/* XP bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{xpInLevel} XP</span>
                {levelInfo.maxXP !== Infinity ? (
                  <span>{xpForLevel} XP para nível {level + 1}</span>
                ) : (
                  <span>Nível máximo!</span>
                )}
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-primary to-blue-400 transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              {xpToNext > 0 && (
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  Faltam <span className="font-semibold text-foreground">{xpToNext} XP</span> para {LEVELS[level]?.name ?? 'o próximo nível'}
                </p>
              )}
            </div>
          </div>

          {/* XP breakdown */}
          <div className="px-4 py-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Como ganhar XP
            </p>
            <div className="space-y-1.5">
              {[
                { label: 'Lição concluída', xp: 10, icon: '📖' },
                { label: 'Projeto guiado', xp: 25, icon: '🔨' },
                { label: 'Projeto livre', xp: 30, icon: '⚡' },
              ].map(({ label, xp, icon }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span>{icon}</span>
                    <span className="text-muted-foreground">{label}</span>
                  </div>
                  <span className="font-semibold text-primary">+{xp} XP</span>
                </div>
              ))}
            </div>
          </div>

          {/* Level ladder */}
          <div className="px-4 pb-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Trilha de níveis
            </p>
            <div className="space-y-1">
              {LEVELS.map((lvl) => {
                const isCurrent = lvl.level === level;
                const isDone = lvl.level < level;
                return (
                  <div
                    key={lvl.level}
                    className={`flex items-center gap-2 px-2 py-1 rounded-lg text-xs ${
                      isCurrent
                        ? 'bg-primary/15 font-semibold'
                        : isDone
                        ? 'opacity-60'
                        : 'opacity-40'
                    }`}
                  >
                    <span>{lvl.emoji}</span>
                    <span className={isCurrent ? 'text-primary' : ''}>
                      Nível {lvl.level} — {lvl.name}
                    </span>
                    {isDone && (
                      <Star className="w-3 h-3 text-yellow-400 ml-auto fill-yellow-400" />
                    )}
                    {isCurrent && (
                      <Zap className="w-3 h-3 text-primary ml-auto" />
                    )}
                    {!isDone && !isCurrent && (
                      <span className="ml-auto text-muted-foreground/60">
                        {lvl.minXP} XP
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
