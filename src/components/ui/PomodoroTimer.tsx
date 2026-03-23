'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Timer, Play, Pause, RotateCcw, X, Coffee, ChevronUp } from 'lucide-react';

type Phase = 'work' | 'break' | 'longBreak';

const PHASES: Record<Phase, { label: string; minutes: number; color: string }> = {
  work: { label: '🎯 Foco', minutes: 25, color: 'text-red-400' },
  break: { label: '☕ Pausa', minutes: 5, color: 'text-emerald-400' },
  longBreak: { label: '🌴 Pausa longa', minutes: 15, color: 'text-blue-400' },
};

export default function PomodoroTimer() {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>('work');
  const [secondsLeft, setSecondsLeft] = useState(PHASES.work.minutes * 60);
  const [running, setRunning] = useState(false);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = useCallback((p: Phase = phase) => {
    setRunning(false);
    setSecondsLeft(PHASES[p].minutes * 60);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [phase]);

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current!);
          setRunning(false);
          // Auto-advance phase
          setPhase((prev) => {
            if (prev === 'work') {
              const newCycles = cycles + 1;
              setCycles(newCycles);
              const next: Phase = newCycles % 4 === 0 ? 'longBreak' : 'break';
              setSecondsLeft(PHASES[next].minutes * 60);
              return next;
            } else {
              setSecondsLeft(PHASES.work.minutes * 60);
              return 'work';
            }
          });
          // Browser notification
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('CodLearn Pomodoro', {
              body: phase === 'work' ? 'Foco terminado! Hora de pausar.' : 'Pausa terminada! Hora de focar.',
            });
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, cycles, phase]);

  const switchPhase = (p: Phase) => {
    setPhase(p);
    reset(p);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const totalSeconds = PHASES[phase].minutes * 60;
  const progressPct = ((totalSeconds - secondsLeft) / totalSeconds) * 100;
  const circumference = 2 * Math.PI * 30;

  return (
    <div className="fixed bottom-[96px] right-6 z-40">
      {/* Collapsed button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-12 h-12 rounded-full bg-background border border-border shadow-lg flex items-center justify-center hover:bg-accent transition-colors"
          title={running ? `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')} - Pomodoro` : 'Pomodoro Timer'}
        >
          <Timer className={`w-5 h-5 ${running ? PHASES[phase].color : 'text-muted-foreground'}`} />
          {running && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
          )}
        </button>
      )}

      {/* Expanded panel */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 bg-card border border-border rounded-2xl shadow-2xl w-64 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-primary" />
              <span className="font-bold text-sm">Pomodoro</span>
              {cycles > 0 && (
                <span className="text-xs text-muted-foreground">{cycles} ciclos</span>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-accent transition-colors"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>

          {/* Phase selector */}
          <div className="flex gap-1 p-2 bg-muted/30">
            {(Object.keys(PHASES) as Phase[]).map((p) => (
              <button
                key={p}
                onClick={() => switchPhase(p)}
                className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors ${
                  phase === p
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent text-muted-foreground'
                }`}
              >
                {p === 'work' ? 'Foco' : p === 'break' ? 'Pausa' : 'Longa'}
              </button>
            ))}
          </div>

          {/* Timer circle */}
          <div className="flex flex-col items-center py-6 gap-4">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
                <circle
                  cx="36" cy="36" r="30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-muted/30"
                />
                <circle
                  cx="36" cy="36" r="30"
                  fill="none"
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="var(--color-primary, #16a34a)"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progressPct / 100)}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-mono font-bold">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
              </div>
            </div>

            <p className={`text-sm font-medium ${PHASES[phase].color}`}>
              {PHASES[phase].label}
            </p>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => reset()}
                className="p-2 rounded-full hover:bg-accent transition-colors text-muted-foreground"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setRunning((r) => !r)}
                className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity shadow-lg"
              >
                {running ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              <button
                onClick={() => {
                  setRunning(false);
                  reset('work');
                  setPhase('work');
                  setCycles(0);
                }}
                className="p-2 rounded-full hover:bg-accent transition-colors text-muted-foreground"
                title="Resetar tudo"
              >
                <Coffee className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="px-4 pb-3 text-center">
            <p className="text-[10px] text-muted-foreground">
              25min foco → 5min pausa → a cada 4 ciclos: 15min pausa longa
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
