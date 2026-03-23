'use client';

import Link from 'next/link';
import { modules } from '@/data/modules';
import { getAllLessons, getLessonsByModule } from '@/data/lessons';
import { useProgress } from '@/hooks/useProgress';
import { useStreak } from '@/hooks/useStreak';
import { getTotalStudyMinutes } from '@/hooks/useLessonTimer';
import { useFavorites } from '@/hooks/useFavorites';
import ProgressBar from '@/components/ui/ProgressBar';
import WeeklyChart from '@/components/ui/WeeklyChart';
import { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  Circle,
  Trophy,
  Flame,
  Clock,
  BookOpen,
  Zap,
  Star,
  ArrowRight,
  Hammer,
  Heart,
} from 'lucide-react';

export default function ProgressoPage() {
  const allLessons = useMemo(() => getAllLessons(), []);
  const allLessonIds = useMemo(() => allLessons.map((l) => l.id), [allLessons]);
  const { progress, getModuleStats, getOverallStats, resetProgress } = useProgress(allLessonIds);
  const overall = getOverallStats();
  const { streakDays } = useStreak();
  const { favorites } = useFavorites();
  const [studyMinutes, setStudyMinutes] = useState(0);

  // Map favorite IDs to lesson objects
  const favoriteLessons = useMemo(
    () => favorites.map((id) => allLessons.find((l) => l.id === id)).filter(Boolean) as typeof allLessons,
    [favorites, allLessons]
  );

  useEffect(() => {
    setStudyMinutes(getTotalStudyMinutes());
  }, []);

  function formatStudyTime(minutes: number): string {
    if (minutes >= 60) {
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      return m > 0 ? `${h}h ${m}m` : `${h}h`;
    }
    return `${minutes} min`;
  }

  // Completed modules (100%)
  const completedModules = modules.filter((mod) => {
    const stats = getModuleStats(mod.id, mod.lessons);
    return stats.completed === stats.total && stats.total > 0;
  });

  // Count completed projects
  const completedProjects = allLessons.filter(
    (l) =>
      (l.type === 'guided-project' || l.type === 'free-project') &&
      progress?.lessons[l.id]?.completed
  ).length;

  const totalProjects = allLessons.filter(
    (l) => l.type === 'guided-project' || l.type === 'free-project'
  ).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Seu Progresso</h1>
        <p className="text-muted-foreground">
          Acompanhe sua evolução em cada módulo.
        </p>
      </div>

      {/* Weekly Activity Chart */}
      <WeeklyChart className="mb-8" />

      {/* Top Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xl font-bold">{overall.completed}/{overall.total}</p>
            <p className="text-xs text-muted-foreground">Lições concluídas</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 rounded-lg">
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <p className="text-xl font-bold">{streakDays}</p>
            <p className="text-xs text-muted-foreground">
              {streakDays === 1 ? 'Dia seguido' : 'Dias seguidos'}
            </p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="text-xl font-bold">{formatStudyTime(studyMinutes)}</p>
            <p className="text-xs text-muted-foreground">Tempo estudado</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Hammer className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-xl font-bold">{completedProjects}/{totalProjects}</p>
            <p className="text-xs text-muted-foreground">Projetos feitos</p>
          </div>
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Progresso Geral</h2>
            <p className="text-sm text-muted-foreground">
              {overall.completed} de {overall.total} lições concluídas
            </p>
          </div>
          <span className="ml-auto text-2xl font-bold text-primary">{overall.percentage}%</span>
        </div>
        <ProgressBar value={overall.percentage} />
      </div>

      {/* Completed modules achievements */}
      {completedModules.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            Módulos Concluídos
          </h2>
          <div className="flex flex-wrap gap-2">
            {completedModules.map((mod) => (
              <span
                key={mod.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium rounded-full"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {mod.title}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Per-module breakdown */}
      <h2 className="text-lg font-semibold mb-4">Detalhes por Módulo</h2>
      <div className="space-y-4">
        {modules.map((mod) => {
          const stats = getModuleStats(mod.id, mod.lessons);
          const percentage =
            stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
          const moduleLessons = getLessonsByModule(mod.id);
          const isComplete = stats.completed === stats.total && stats.total > 0;

          // Find next incomplete lesson
          const nextLesson = moduleLessons.find(
            (l) => !progress?.lessons[l.id]?.completed
          );

          return (
            <div
              key={mod.id}
              className={`bg-card border rounded-xl overflow-hidden transition-colors ${
                isComplete ? 'border-emerald-500/30' : 'border-border'
              }`}
            >
              {/* Module header */}
              <div className="flex items-center justify-between px-5 pt-4 pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">{mod.title}</h3>
                  {isComplete && (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 bg-emerald-500/15 text-emerald-400 rounded-full">
                      Completo ✓
                    </span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {stats.completed}/{stats.total}
                </span>
              </div>

              <div className="px-5 pb-3">
                <ProgressBar value={percentage} />
              </div>

              {/* Lesson list — compact */}
              <div className="px-5 pb-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                {moduleLessons.map((lesson) => {
                  const done = progress?.lessons[lesson.id]?.completed ?? false;
                  const isProject =
                    lesson.type === 'guided-project' || lesson.type === 'free-project';
                  return (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-2 py-1 text-sm"
                    >
                      {done ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
                      )}
                      <span
                        className={`truncate ${
                          done ? 'text-foreground' : 'text-muted-foreground'
                        } ${isProject ? 'italic' : ''}`}
                      >
                        {lesson.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* CTA: continue or view */}
              <div className="px-5 pb-4">
                {nextLesson ? (
                  <Link
                    href={`/licao/${mod.id}/${nextLesson.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Continuar: {nextLesson.title}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                ) : (
                  <Link
                    href={`/modulo/${mod.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:underline"
                  >
                    Ver trilha completa
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Favoritos */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-400" />
          Favoritos
        </h2>
        {favoriteLessons.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-6 text-center text-muted-foreground text-sm">
            Nenhum favorito ainda. Marque lições com ⭐ para encontrá-las aqui.
          </div>
        ) : (
          <div className="space-y-2">
            {favoriteLessons.map((lesson) => {
              const mod = modules.find((m) => m.id === lesson.moduleId);
              if (!mod) return null;
              return (
                <Link
                  key={lesson.id}
                  href={`/licao/${lesson.moduleId}/${lesson.id}`}
                  className="flex items-center justify-between px-4 py-3 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors group"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                      {lesson.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{mod.title}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-3 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Reset Progress */}
      <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Quer começar do zero?
        </p>
        <button
          onClick={() => {
            if (confirm('Tem certeza que deseja resetar todo o progresso? Esta ação não pode ser desfeita.')) {
              resetProgress();
            }
          }}
          className="text-sm text-red-500 hover:text-red-400 transition-colors"
        >
          Resetar todo o progresso
        </button>
      </div>
    </div>
  );
}
