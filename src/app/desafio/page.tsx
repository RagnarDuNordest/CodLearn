'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getTodayChallenge, DailyChallenge } from '@/data/dailyChallenges';
import CodeEditor from '@/components/lesson/CodeEditor';
import { CodeChallenge } from '@/types/lesson';
import { useDailyGoal } from '@/hooks/useDailyGoal';
import { ArrowLeft, Trophy, CheckCircle2 } from 'lucide-react';

function getTodayKey(): string {
  const today = new Date().toISOString().slice(0, 10);
  return `codlearn_daily_solved_${today}`;
}

function difficultyColor(difficulty: DailyChallenge['difficulty']): string {
  switch (difficulty) {
    case 'fácil':   return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    case 'médio':   return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    case 'difícil': return 'bg-red-500/15 text-red-400 border-red-500/30';
  }
}

function challengeToCodeChallenge(c: DailyChallenge): CodeChallenge {
  return {
    id: c.id,
    title: c.title,
    description: c.description,
    language: 'python',
    starterCode: c.starterCode,
    solution: c.solution,
    hints: [],
    testCases: c.testCases,
  };
}

export default function DesafioPage() {
  const challenge = getTodayChallenge();
  const codeChallenge = challengeToCodeChallenge(challenge);
  const { recordLessonCompleted } = useDailyGoal();

  const [alreadySolved, setAlreadySolved] = useState(false);

  useEffect(() => {
    const key = getTodayKey();
    setAlreadySolved(localStorage.getItem(key) === '1');
  }, []);

  const handleAllTestsPassed = useCallback(() => {
    const key = getTodayKey();
    if (localStorage.getItem(key) !== '1') {
      localStorage.setItem(key, '1');
      setAlreadySolved(true);
      recordLessonCompleted();
    }
  }, [recordLessonCompleted]);

  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar ao início
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Trophy className="w-5 h-5 text-amber-400" />
          <span className="text-sm font-medium text-amber-400 uppercase tracking-wide">
            Desafio do Dia
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-1">{challenge.title}</h1>
        <p className="text-sm text-muted-foreground capitalize">{today}</p>
      </div>

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${difficultyColor(challenge.difficulty)}`}>
          {challenge.difficulty}
        </span>
        <span className="text-xs text-muted-foreground px-2.5 py-1 rounded-full border border-border bg-muted/30">
          {challenge.topic}
        </span>
        {alreadySolved && (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completado hoje!
          </span>
        )}
      </div>

      {/* Description */}
      <div className="bg-card border border-border rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Descrição
        </h2>
        <p className="text-sm leading-relaxed text-foreground">{challenge.description}</p>

        {challenge.testCases.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Casos de Teste
            </h3>
            <div className="space-y-2">
              {challenge.testCases.map((tc, i) => (
                <div key={i} className="text-xs bg-muted/50 rounded-lg px-3 py-2">
                  <span className="text-muted-foreground">{tc.description}: </span>
                  <span className="font-mono text-emerald-400">{tc.expectedOutput}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Code Editor */}
      <CodeEditor challenge={codeChallenge} onAllTestsPassed={handleAllTestsPassed} />

      {alreadySolved && (
        <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
          <p className="text-emerald-400 font-semibold text-lg">🎉 Desafio de hoje concluído!</p>
          <p className="text-sm text-muted-foreground mt-1">Volte amanhã para um novo desafio.</p>
        </div>
      )}
    </div>
  );
}
