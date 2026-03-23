'use client';

import { useEffect, useRef } from 'react';
import { useLevelUp } from '@/hooks/useLevelUp';
import { useLevel, LEVELS } from '@/hooks/useLevel';
import { launchConfetti } from '@/lib/confetti';
import { playSound } from '@/lib/sounds';

export default function LevelUpModal() {
  const { showLevelUp, newLevel, dismiss } = useLevelUp();
  const { progressPct, levelInfo } = useLevel();
  const confettiFired = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (showLevelUp) {
      if (!confettiFired.current) {
        confettiFired.current = true;
        launchConfetti('center');
        playSound('badge');
      }
      timerRef.current = setTimeout(() => {
        dismiss();
        confettiFired.current = false;
      }, 8000);
    } else {
      confettiFired.current = false;
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [showLevelUp, dismiss]);

  if (!showLevelUp) return null;

  const lvlInfo = LEVELS.find((l) => l.level === newLevel) ?? LEVELS[0];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm levelup-backdrop">
      <style>{`
        @keyframes levelup-scale-in {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .levelup-card {
          animation: levelup-scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes xp-fill {
          0% { width: 0%; }
          100% { width: var(--xp-pct); }
        }
        .xp-bar-fill {
          animation: xp-fill 1.2s ease-out 0.6s forwards;
          width: 0%;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.4); }
          50% { box-shadow: 0 0 50px rgba(99,102,241,0.8), 0 0 80px rgba(99,102,241,0.4); }
        }
        .levelup-card {
          animation: levelup-scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                     pulse-glow 2s ease-in-out 0.6s infinite;
        }
      `}</style>

      <div className="levelup-card bg-card border border-primary/40 rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl">
        {/* Up arrow emoji */}
        <div className="text-5xl mb-2">⬆️</div>

        <h2 className="text-2xl font-black tracking-wider text-primary mb-1 uppercase">
          Level Up!
        </h2>

        <p className="text-4xl font-black mb-1">
          {lvlInfo.emoji}
        </p>

        <h3 className="text-xl font-bold mb-1">
          Você chegou ao Nível {newLevel}!
        </h3>
        <p className="text-muted-foreground text-sm mb-5">
          {lvlInfo.name}
        </p>

        {/* XP Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>XP do nível</span>
            <span>{progressPct}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="xp-bar-fill h-full bg-gradient-to-r from-primary to-blue-400 rounded-full"
              style={{ '--xp-pct': `${progressPct}%` } as React.CSSProperties}
            />
          </div>
        </div>

        {/* Perks */}
        <div className="bg-muted/40 rounded-xl p-4 mb-6 text-left space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Novidades desbloqueadas
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span>🔓</span>
            <span>Novos módulos desbloqueados</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>⚡</span>
            <span>Desafios mais difíceis disponíveis</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>🏅</span>
            <span>Continue assim para chegar ao Nível {Math.min(newLevel + 1, 10)}!</span>
          </div>
        </div>

        <button
          onClick={() => { dismiss(); confettiFired.current = false; }}
          className="w-full py-3 px-6 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors"
        >
          Continuar
        </button>

        <p className="text-xs text-muted-foreground mt-3">
          Fecha automaticamente em 8 segundos
        </p>
      </div>
    </div>
  );
}
