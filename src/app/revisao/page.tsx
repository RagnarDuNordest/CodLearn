'use client';

import { useState, useEffect, useMemo } from 'react';
import { Brain, RefreshCw, CheckCircle2, Clock, ChevronRight, Trophy } from 'lucide-react';
import Link from 'next/link';
import { getAllLessons } from '@/data/lessons';
import { useProgress } from '@/hooks/useProgress';

interface ReviewLesson {
  id: string;
  moduleId: string;
  title: string;
  completedAt: number;
  reviewedAt?: number;
  dueDate: number;
  interval: number; // days
}

function getDueDate(completedAt: number, interval: number): number {
  return completedAt + interval * 24 * 60 * 60 * 1000;
}

function getIntervalLabel(interval: number): string {
  if (interval <= 1) return 'Novo';
  if (interval <= 3) return '3 dias';
  if (interval <= 7) return '1 semana';
  if (interval <= 14) return '2 semanas';
  return '1 mês';
}

export default function RevisaoPage() {
  const { isLessonCompleted } = useProgress();
  const allLessons = useMemo(() => getAllLessons(), []);

  const [reviewData, setReviewData] = useState<Record<string, ReviewLesson>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [mode, setMode] = useState<'list' | 'review'>('list');
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionScore, setSessionScore] = useState({ remembered: 0, forgot: 0 });

  // Load review data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('codlearn_spaced_repetition');
    if (stored) {
      try {
        setReviewData(JSON.parse(stored));
      } catch {}
    }
  }, []);

  // Build list of completed lessons that have review data or need initial review
  const reviewLessons = useMemo(() => {
    const now = Date.now();
    return allLessons
      .filter((l) => isLessonCompleted(l.id))
      .map((l) => {
        const existing = reviewData[l.id];
        if (existing) return existing;
        // First time — due immediately
        const completedKey = `codlearn_completed_${l.moduleId}`;
        const completedAt = Date.now() - 24 * 60 * 60 * 1000; // simulate 1 day ago
        return {
          id: l.id,
          moduleId: l.moduleId,
          title: l.title,
          completedAt,
          interval: 1,
          dueDate: completedAt,
        };
      })
      .sort((a, b) => a.dueDate - b.dueDate);
  }, [allLessons, isLessonCompleted, reviewData]);

  const dueLessons = reviewLessons.filter((l) => l.dueDate <= Date.now());
  const upcomingLessons = reviewLessons.filter((l) => l.dueDate > Date.now());

  const updateReviewLesson = (lesson: ReviewLesson, remembered: boolean) => {
    const newInterval = remembered
      ? Math.min(lesson.interval * 2, 30)
      : 1;
    const now = Date.now();
    const updated: ReviewLesson = {
      ...lesson,
      interval: newInterval,
      reviewedAt: now,
      dueDate: getDueDate(now, newInterval),
    };
    setReviewData((prev) => {
      const next = { ...prev, [lesson.id]: updated };
      localStorage.setItem('codlearn_spaced_repetition', JSON.stringify(next));
      return next;
    });
    if (remembered) setSessionScore((s) => ({ ...s, remembered: s.remembered + 1 }));
    else setSessionScore((s) => ({ ...s, forgot: s.forgot + 1 }));
  };

  const currentLesson = dueLessons[currentIdx];
  const allLessonsMap = useMemo(() => {
    const map: Record<string, (typeof allLessons)[0]> = {};
    allLessons.forEach((l) => { map[l.id] = l; });
    return map;
  }, [allLessons]);

  const lessonDetail = currentLesson ? allLessonsMap[currentLesson.id] : null;

  if (mode === 'review' && dueLessons.length > 0) {
    if (currentIdx >= dueLessons.length) {
      return (
        <div className="max-w-2xl mx-auto py-16 px-4 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2">Sessão de revisão concluída!</h2>
          <p className="text-muted-foreground mb-6">
            Você revisou {dueLessons.length} lição{dueLessons.length > 1 ? 'ões' : ''}.
          </p>
          <div className="flex gap-4 justify-center mb-8">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
              <p className="text-2xl font-bold text-emerald-400">{sessionScore.remembered}</p>
              <p className="text-sm text-muted-foreground">Lembrei</p>
            </div>
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-2xl font-bold text-red-400">{sessionScore.forgot}</p>
              <p className="text-sm text-muted-foreground">Esqueci</p>
            </div>
          </div>
          <button
            onClick={() => { setMode('list'); setCurrentIdx(0); setSessionScore({ remembered: 0, forgot: 0 }); }}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Voltar à lista
          </button>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        {/* Progress */}
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground">Revisão {currentIdx + 1} de {dueLessons.length}</span>
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${((currentIdx) / dueLessons.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
          <div className="p-6 border-b border-border bg-muted/20">
            <div className="text-xs text-muted-foreground mb-2">
              Módulo: {currentLesson.moduleId}
            </div>
            <h2 className="text-xl font-bold">{currentLesson.title}</h2>
            {lessonDetail && (
              <p className="text-muted-foreground mt-2 text-sm">{lessonDetail.description}</p>
            )}
          </div>

          {!showAnswer ? (
            <div className="p-6 text-center">
              <p className="text-muted-foreground mb-4">
                Você consegue lembrar os conceitos desta lição?
              </p>
              <button
                onClick={() => setShowAnswer(true)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Ver lição
              </button>
              <p className="text-xs text-muted-foreground mt-3">
                Tente lembrar antes de ver!
              </p>
            </div>
          ) : (
            <div className="p-6">
              {lessonDetail && lessonDetail.sections.length > 0 && (
                <div className="mb-4 p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium mb-1">Resumo:</p>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {lessonDetail.sections[0]?.content?.substring(0, 200)}...
                  </p>
                  <Link
                    href={`/licao/${currentLesson.moduleId}/${currentLesson.id}`}
                    className="text-xs text-primary hover:underline mt-1 block"
                  >
                    Ver lição completa →
                  </Link>
                </div>
              )}

              <p className="text-sm font-medium mb-3">Como foi sua lembrança?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    updateReviewLesson(currentLesson, false);
                    setShowAnswer(false);
                    setCurrentIdx((i) => i + 1);
                  }}
                  className="flex-1 py-3 bg-red-500/10 text-red-400 border border-red-500/30 rounded-xl font-medium hover:bg-red-500/20 transition-colors"
                >
                  😅 Esqueci
                </button>
                <button
                  onClick={() => {
                    updateReviewLesson(currentLesson, true);
                    setShowAnswer(false);
                    setCurrentIdx((i) => i + 1);
                  }}
                  className="flex-1 py-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xl font-medium hover:bg-emerald-500/20 transition-colors"
                >
                  ✅ Lembrei!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="w-7 h-7 text-primary" />
          <h1 className="text-3xl font-bold">Revisão Espaçada</h1>
        </div>
        <p className="text-muted-foreground">
          Sistema de revisão inteligente baseado no método Leitner. Revise no momento certo para memorizar mais.
        </p>
      </div>

      {reviewLessons.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-4xl mb-3">📚</p>
          <p className="font-medium mb-2">Complete algumas lições primeiro!</p>
          <p className="text-sm">As lições concluídas aparecerão aqui para revisão.</p>
          <Link
            href="/"
            className="inline-block mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90"
          >
            Ir para o Dashboard
          </Link>
        </div>
      ) : (
        <>
          {/* Due now */}
          {dueLessons.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                  Para revisar agora ({dueLessons.length})
                </h2>
                <button
                  onClick={() => { setMode('review'); setCurrentIdx(0); setShowAnswer(false); }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:opacity-90 transition-opacity"
                >
                  <RefreshCw className="w-4 h-4" />
                  Iniciar revisão
                </button>
              </div>
              <div className="space-y-2">
                {dueLessons.slice(0, 5).map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/20 rounded-xl"
                  >
                    <Clock className="w-4 h-4 text-red-400 shrink-0" />
                    <span className="text-sm flex-1">{lesson.title}</span>
                    <span className="text-xs text-muted-foreground">{lesson.moduleId}</span>
                  </div>
                ))}
                {dueLessons.length > 5 && (
                  <p className="text-xs text-muted-foreground text-center py-1">
                    +{dueLessons.length - 5} mais...
                  </p>
                )}
              </div>
            </div>
          )}

          {dueLessons.length === 0 && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="font-medium text-emerald-400">Tudo em dia!</p>
                <p className="text-sm text-muted-foreground">Nenhuma lição pendente para hoje.</p>
              </div>
            </div>
          )}

          {/* Upcoming */}
          {upcomingLessons.length > 0 && (
            <div>
              <h2 className="font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full" />
                Próximas revisões ({upcomingLessons.length})
              </h2>
              <div className="space-y-2">
                {upcomingLessons.slice(0, 8).map((lesson) => {
                  const daysUntil = Math.ceil((lesson.dueDate - Date.now()) / (24 * 60 * 60 * 1000));
                  return (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-sm flex-1">{lesson.title}</span>
                      <span className="text-xs text-muted-foreground">
                        em {daysUntil} dia{daysUntil !== 1 ? 's' : ''}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                        {getIntervalLabel(lesson.interval)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
