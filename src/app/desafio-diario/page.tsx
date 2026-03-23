'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  Flame,
  Calendar,
  Play,
  RotateCcw,
  Lightbulb,
  Trophy,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import dailyChallenges, { DailyChallenge } from '@/data/daily-challenges';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

// ─── Constants ────────────────────────────────────────────────────────────────

const PISTON_LANG: Record<string, { language: string; version: string }> = {
  python:     { language: 'python',     version: '3.10.0' },
  javascript: { language: 'javascript', version: '18.15.0' },
};

const DIFF_CONFIG: Record<DailyChallenge['difficulty'], { label: string; badgeClass: string }> = {
  iniciante:     { label: 'Iniciante',     badgeClass: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' },
  intermediario: { label: 'Intermediário', badgeClass: 'bg-amber-500/15 text-amber-400 border border-amber-500/30' },
  avancado:      { label: 'Avançado',      badgeClass: 'bg-red-500/15 text-red-400 border border-red-500/30' },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function getTodayChallenge(): DailyChallenge {
  const today = new Date();
  const dayIndex = Math.floor(today.getTime() / 86400000) % dailyChallenges.length;
  return dailyChallenges[dayIndex];
}

function formatDatePT(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function getLast30Days(): string[] {
  const days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ExampleBlock({ ex, index }: { ex: DailyChallenge['examples'][number]; index: number }) {
  return (
    <div className="rounded-lg overflow-hidden border border-border/50 text-xs font-mono">
      <div className="bg-muted/30 px-3 py-1.5 text-muted-foreground font-sans text-[11px] font-semibold tracking-wide">
        Exemplo {index + 1}
      </div>
      <div className="p-3 space-y-2 bg-background/40">
        <div className="flex gap-2">
          <span className="text-muted-foreground shrink-0 w-14">Entrada:</span>
          <pre className="text-foreground whitespace-pre-wrap">{ex.input}</pre>
        </div>
        <div className="flex gap-2">
          <span className="text-muted-foreground shrink-0 w-14">Saída:</span>
          <pre className="text-emerald-400 whitespace-pre-wrap">{ex.output}</pre>
        </div>
        {ex.explanation && (
          <div className="flex gap-2 pt-1 border-t border-border/30">
            <span className="text-muted-foreground shrink-0 w-14 font-sans">Exp.:</span>
            <span className="text-muted-foreground font-sans leading-relaxed">{ex.explanation}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function StreakCounter({ streak }: { streak: number }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-border bg-card">
      <Flame className={`w-6 h-6 ${streak > 0 ? 'text-orange-400' : 'text-muted-foreground'}`} />
      <div>
        <div className="text-2xl font-bold leading-none">{streak}</div>
        <div className="text-[11px] text-muted-foreground mt-0.5">dias seguidos</div>
      </div>
    </div>
  );
}

function CalendarHeatmap({ completedDays }: { completedDays: string[] }) {
  const last30 = getLast30Days();
  const completedSet = new Set(completedDays);
  const today = getTodayString();

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {last30.map((day) => {
        const isCompleted = completedSet.has(day);
        const isToday = day === today;
        return (
          <div
            key={day}
            title={day}
            className={`w-5 h-5 rounded-sm border transition-colors ${
              isCompleted
                ? 'bg-emerald-500 border-emerald-400'
                : isToday
                ? 'bg-primary/20 border-primary/40'
                : 'bg-muted/40 border-border/40'
            }`}
          />
        );
      })}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DesafioDiarioPage() {
  const challenge = getTodayChallenge();
  const today = getTodayString();

  const [code, setCode] = useState(challenge.starter);
  const [output, setOutput] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExamples, setShowExamples] = useState(true);

  const [streak, setStreak] = useState(0);
  const [completedDays, setCompletedDays] = useState<string[]>([]);
  const [completedToday, setCompletedToday] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  // Load state from localStorage
  useEffect(() => {
    try {
      const storedStreak = parseInt(localStorage.getItem('daily_streak') ?? '0', 10);
      const lastDate = localStorage.getItem('last_challenge_date') ?? '';
      const stored = JSON.parse(localStorage.getItem('completed_days') ?? '[]') as string[];

      setCompletedDays(stored);
      setCompletedToday(stored.includes(today));

      // Calculate current streak
      // If last challenge was not yesterday or today, reset streak display
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().slice(0, 10);

      if (lastDate === today || lastDate === yesterdayStr) {
        setStreak(storedStreak);
      } else if (lastDate === '') {
        setStreak(0);
      } else {
        // Streak broken
        setStreak(0);
        localStorage.setItem('daily_streak', '0');
      }
    } catch {
      // ignore localStorage errors
    }
  }, [today]);

  const handleComplete = useCallback(() => {
    if (completedToday) return;

    const newCompleted = [...completedDays, today];
    const lastDate = localStorage.getItem('last_challenge_date') ?? '';

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    const newStreak = lastDate === yesterdayStr ? streak + 1 : 1;

    localStorage.setItem('completed_days', JSON.stringify(newCompleted));
    localStorage.setItem('daily_streak', String(newStreak));
    localStorage.setItem('last_challenge_date', today);

    setCompletedDays(newCompleted);
    setStreak(newStreak);
    setCompletedToday(true);
    setJustCompleted(true);

    setTimeout(() => setJustCompleted(false), 5000);
  }, [completedToday, completedDays, today, streak]);

  const runCode = async () => {
    const pistonLang = PISTON_LANG[challenge.language];
    if (!pistonLang) {
      setOutput('Execução não disponível para esta linguagem.');
      setIsError(false);
      return;
    }

    setRunning(true);
    setOutput(null);

    try {
      const res = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: pistonLang.language,
          version: pistonLang.version,
          files: [{ content: code }],
        }),
      });

      const data = await res.json();
      const out = data.run?.stdout ?? '';
      const err = data.run?.stderr ?? '';

      if (err) {
        setOutput(err);
        setIsError(true);
      } else if (out) {
        setOutput(out);
        setIsError(false);
      } else {
        setOutput('(sem saída)');
        setIsError(false);
      }
    } catch {
      setOutput('Erro de conexão. Verifique sua internet e tente novamente.');
      setIsError(true);
    } finally {
      setRunning(false);
    }
  };

  const diff = DIFF_CONFIG[challenge.difficulty];

  return (
    <div className="w-full pb-16">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar ao início
      </Link>

      {/* Page header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">🔥</span>
          <h1 className="text-3xl font-bold">Desafio do Dia</h1>
        </div>
        <p className="text-sm text-muted-foreground capitalize">
          {formatDatePT(today)}
        </p>
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap items-start gap-4 mb-8">
        <StreakCounter streak={streak} />

        <div className="flex-1 min-w-[200px] px-4 py-3 rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Últimos 30 dias
            </span>
          </div>
          <CalendarHeatmap completedDays={completedDays} />
          <p className="text-[11px] text-muted-foreground mt-2">
            {completedDays.length} dia{completedDays.length !== 1 ? 's' : ''} concluído{completedDays.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Celebration message */}
      {justCompleted && (
        <div className="mb-6 px-5 py-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3">
          <Trophy className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <p className="font-semibold text-emerald-400">🎉 Desafio concluído! Parabéns!</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Sua sequência agora é de <strong className="text-emerald-400">{streak} dia{streak !== 1 ? 's' : ''}</strong>. Continue assim!
            </p>
          </div>
        </div>
      )}

      {/* Main content: left panel + right panel */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">

        {/* ── Left panel: Challenge description ── */}
        <div className="space-y-4">
          {/* Title + badges */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${diff.badgeClass}`}>
                {diff.label}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border bg-accent/30 text-muted-foreground border-border/60">
                {challenge.language}
              </span>
              {challenge.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded text-[10px] bg-accent/40 text-muted-foreground border border-border/40">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-bold mb-3">{challenge.title}</h2>
            <p className="text-sm text-foreground/90 leading-relaxed">{challenge.description}</p>
          </div>

          {/* Examples */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <button
              onClick={() => setShowExamples((v) => !v)}
              className="w-full flex items-center justify-between px-5 py-3.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent/20 transition-colors"
            >
              <span className="font-semibold uppercase tracking-wider">
                Exemplos ({challenge.examples.length})
              </span>
              {showExamples ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {showExamples && (
              <div className="px-5 pb-5 space-y-3 border-t border-border/30">
                {challenge.examples.map((ex, i) => (
                  <ExampleBlock key={i} ex={ex} index={i} />
                ))}
              </div>
            )}
          </div>

          {/* Hint */}
          {challenge.hint && (
            <div>
              {!showHint ? (
                <button
                  onClick={() => setShowHint(true)}
                  className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  Ver dica
                </button>
              ) : (
                <div className="flex items-start gap-2 bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-200/70 font-mono whitespace-pre-wrap leading-relaxed">
                    {challenge.hint}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Mark as complete */}
          {completedToday ? (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              Desafio de hoje concluído!
            </div>
          ) : (
            <button
              onClick={handleComplete}
              className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-500 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              Marcar como concluído
            </button>
          )}
        </div>

        {/* ── Right panel: Editor ── */}
        <div className="space-y-3">
          {/* Editor header */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {challenge.language}
            </span>
            <button
              onClick={() => { setCode(challenge.starter); setOutput(null); }}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Resetar
            </button>
          </div>

          {/* Monaco Editor */}
          <div className="rounded-xl overflow-hidden border border-border" style={{ height: 320 }}>
            <MonacoEditor
              height="320px"
              language={challenge.language}
              theme="vs-dark"
              value={code}
              onChange={(v) => setCode(v ?? '')}
              options={{
                fontSize: 14,
                fontFamily: 'var(--font-geist-mono)',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                padding: { top: 12 },
                automaticLayout: true,
              }}
            />
          </div>

          {/* Run button */}
          <button
            onClick={runCode}
            disabled={running || !code.trim()}
            className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4" />
            {running ? 'Executando...' : '▶ Executar código'}
          </button>

          {/* Output */}
          {output !== null && (
            <div className={`rounded-xl border overflow-hidden ${isError ? 'border-red-500/30' : 'border-emerald-500/20'}`}>
              <div
                className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide ${
                  isError ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'
                }`}
              >
                {isError ? '✗ Erro' : '✓ Saída'}
              </div>
              <pre className={`px-4 py-3 text-xs font-mono whitespace-pre-wrap leading-relaxed bg-background/50 ${isError ? 'text-red-300/80' : 'text-foreground/90'}`}>
                {output}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
