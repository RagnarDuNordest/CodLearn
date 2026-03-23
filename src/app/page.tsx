'use client';

import Link from 'next/link';
import { modules } from '@/data/modules';
import { getAllLessons, getLessonsByModule } from '@/data/lessons';
import { useProgress } from '@/hooks/useProgress';
import { useStreak } from '@/hooks/useStreak';
import { getTotalStudyMinutes } from '@/hooks/useLessonTimer';
import { useFavorites } from '@/hooks/useFavorites';
import { useDailyGoal } from '@/hooks/useDailyGoal';
import { useBadges } from '@/hooks/useBadges';
import { useProfile } from '@/hooks/useProfile';
import { getAvatarById } from '@/data/avatars';
import ProgressBar from '@/components/ui/ProgressBar';
import WeeklyChart from '@/components/ui/WeeklyChart';
import OnboardingQuiz from '@/components/onboarding/OnboardingQuiz';
import { useState, useEffect, useMemo } from 'react';
import {
  Lightbulb,
  Code,
  Cpu,
  Database,
  Boxes,
  GitBranch,
  GitMerge,
  Coffee,
  Globe,
  Server,
  Layout,
  Brain,
  Terminal,
  BookOpen,
  Flame,
  Clock,
  Zap,
  ArrowRight,
  PlayCircle,
  Heart,
  Target,
  Award,
  Calendar,
  GripVertical,
} from 'lucide-react';
import { playSound } from '@/lib/sounds';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Lightbulb, Code, Cpu, Database, Boxes, GitBranch, GitMerge,
  Coffee, Globe, Server, Layout, Brain, Terminal,
};

const MODULE_COLORS: Record<string, string> = {
  intro: '#0891B2', logica: '#7C3AED', linux: '#4B5563', git: '#F05032',
  python: '#3572A5', c: '#555555', java: '#B07219', estruturas: '#059669',
  algoritmos: '#D97706', sql: '#336791', 'html-css': '#E44D26',
  frontend: '#c9a800', backend: '#1D4ED8',
};

export default function Home() {
  const allLessons = useMemo(() => getAllLessons(), []);
  const allLessonIds = useMemo(() => allLessons.map((l) => l.id), [allLessons]);
  const { getModuleStats, getOverallStats, progress, isLessonCompleted } = useProgress(allLessonIds);
  const overall = getOverallStats();
  const { streakDays } = useStreak();
  const { favorites } = useFavorites();
  const [studyMinutes, setStudyMinutes] = useState(0);
  const { target, todayCount, percentage: goalPct, isGoalMet, setTarget } = useDailyGoal();
  const { earnedCount, totalCount } = useBadges();
  const { profile } = useProfile();
  const [dailyStreak, setDailyStreak] = useState(0);
  const avatar = getAvatarById(profile.avatarId);

  // Map favorite IDs to lesson objects (up to 4 for the dashboard)
  const favoriteLessons = useMemo(
    () =>
      favorites
        .map((id) => allLessons.find((l) => l.id === id))
        .filter(Boolean)
        .slice(0, 4) as typeof allLessons,
    [favorites, allLessons]
  );

  useEffect(() => {
    setStudyMinutes(getTotalStudyMinutes());
    try {
      setDailyStreak(Number(localStorage.getItem('daily_streak') ?? 0));
    } catch { /* ignore */ }
  }, []);

  // --- Drag-and-drop card order ---
  const DEFAULT_CARD_ORDER = ['licoes', 'streak', 'tempo', 'progresso'];
  const CARD_ORDER_KEY = 'codlearn_card_order';

  const [cardOrder, setCardOrder] = useState<string[]>(() => DEFAULT_CARD_ORDER);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [showActivity, setShowActivity] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CARD_ORDER_KEY);
      if (raw) {
        const parsed: string[] = JSON.parse(raw);
        // Validate that all default IDs are present
        if (DEFAULT_CARD_ORDER.every((id) => parsed.includes(id))) {
          setCardOrder(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  function handleDragStart(id: string) {
    setDraggingId(id);
  }

  function handleDragOver(e: React.DragEvent, overId: string) {
    e.preventDefault();
    if (!draggingId || draggingId === overId) return;
    setCardOrder((prev) => {
      const next = [...prev];
      const fromIdx = next.indexOf(draggingId);
      const toIdx = next.indexOf(overId);
      if (fromIdx === -1 || toIdx === -1) return prev;
      next.splice(fromIdx, 1);
      next.splice(toIdx, 0, draggingId);
      return next;
    });
  }

  function handleDrop() {
    setDraggingId(null);
    try {
      localStorage.setItem(CARD_ORDER_KEY, JSON.stringify(cardOrder));
    } catch {
      // ignore
    }
  }

  // --- Listen for lesson-completed event to play success sound ---
  useEffect(() => {
    const handler = () => playSound('success');
    window.addEventListener('codlearn:lesson-completed', handler);
    return () => window.removeEventListener('codlearn:lesson-completed', handler);
  }, []);

  // Find the next lesson to continue: first incomplete lesson across all modules in order
  const nextLesson = useMemo(() => {
    for (const mod of [...modules].sort((a, b) => a.order - b.order)) {
      const modLessons = getLessonsByModule(mod.id);
      for (const lesson of modLessons) {
        if (!isLessonCompleted(lesson.id)) {
          return { lesson, mod };
        }
      }
    }
    return null;
  }, [isLessonCompleted]);

  // Find the last completed lesson (most recently touched module)
  const lastCompleted = useMemo(() => {
    if (!progress) return null;
    const completedEntries = Object.entries(progress.lessons)
      .filter(([, lp]) => lp.completed && lp.completedAt)
      .sort((a, b) => {
        const ta = new Date(a[1].completedAt!).getTime();
        const tb = new Date(b[1].completedAt!).getTime();
        return tb - ta;
      });
    if (completedEntries.length === 0) return null;
    const [lessonId] = completedEntries[0];
    return allLessons.find((l) => l.id === lessonId) ?? null;
  }, [progress, allLessons]);

  function formatStudyTime(minutes: number): string {
    if (minutes >= 60) {
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      return m > 0 ? `${h}h ${m}m` : `${h}h`;
    }
    return `${minutes} min`;
  }

  const hasStarted = overall.completed > 0;

  return (
    <div>
      {/* Onboarding quiz — shows on first visit only */}
      <OnboardingQuiz />

      {/* Welcome Section */}
      <div className="mb-8 flex items-start gap-4">
        {profile.name && (
          <div
            className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 border-border"
            dangerouslySetInnerHTML={{ __html: avatar.svg }}
          />
        )}
        <div>
          <h1 className="text-3xl font-bold mb-1">
            {profile.name ? (
              <>
                Bem-vindo de volta, <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">{profile.name}</span>! 👋
              </>
            ) : hasStarted ? (
              <>
                {'Bem-vindo de volta ao '}
                <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">CodLearn</span>
              </>
            ) : (
              <>
                {'Bem-vindo ao '}
                <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">CodLearn</span>
              </>
            )}
          </h1>
          {profile.tag && (
            <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-1">
              {profile.tag}
            </span>
          )}
          <p className="text-muted-foreground text-lg">
            {hasStarted
              ? 'Continue de onde parou e mantenha o ritmo!'
              : 'Sua jornada na programacao comeca aqui. Aprenda no seu ritmo!'}
          </p>
        </div>
      </div>

      {/* Daily Challenge Banner */}
      <Link
        href="/desafio"
        className="block mb-4 p-5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl hover:border-amber-500/60 transition-all group"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-amber-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-amber-400 uppercase tracking-wide mb-0.5">
                Novo desafio disponível
              </p>
              <p className="font-semibold text-foreground">Desafio do Dia 🗓️</p>
              <p className="text-sm text-muted-foreground">
                Resolva um desafio Python diário e mantenha o ritmo!
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-amber-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>

      {/* Continue Banner — shown only when user has progress */}
      {nextLesson && (
        <Link
          href={`/licao/${nextLesson.mod.id}/${nextLesson.lesson.id}`}
          className="block mb-8 p-5 bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/30 rounded-2xl hover:border-primary/60 transition-all group"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <PlayCircle className="w-6 h-6 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-primary uppercase tracking-wide mb-0.5">
                  {hasStarted ? 'Continue estudando' : 'Comece agora'}
                </p>
                <p className="font-semibold text-foreground truncate">
                  {nextLesson.lesson.title}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {nextLesson.mod.title} · {nextLesson.lesson.estimatedMinutes} min
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      )}

      {/* Stats Cards — drag-and-drop reorderable */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {cardOrder.map((id) => {
          const isDragging = draggingId === id;
          const baseClass = `bg-card border border-border rounded-xl p-4 cursor-grab active:cursor-grabbing select-none transition-opacity group relative flex flex-col gap-3 ${
            isDragging ? 'opacity-50' : 'opacity-100'
          }`;

          const modulesStarted = [...modules].filter(mod => {
            const s = getModuleStats(mod.id, mod.lessons);
            return s.completed > 0;
          }).length;
          const modulesCompleted = [...modules].filter(mod => {
            const s = getModuleStats(mod.id, mod.lessons);
            return s.total > 0 && s.completed === s.total;
          }).length;

          if (id === 'licoes') return (
            <div key="licoes" className={baseClass}
              draggable onDragStart={() => handleDragStart('licoes')}
              onDragOver={(e) => handleDragOver(e, 'licoes')} onDrop={handleDrop}
            >
              <GripVertical className="w-3 h-3 text-muted-foreground/40 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Lições</span>
              </div>
              <div>
                <p className="text-2xl font-bold leading-none">{overall.completed}<span className="text-sm font-normal text-muted-foreground">/{overall.total}</span></p>
                <p className="text-[11px] text-muted-foreground mt-1">{modulesStarted} módulo{modulesStarted !== 1 ? 's' : ''} iniciado{modulesStarted !== 1 ? 's' : ''}</p>
              </div>
              <div className="mt-auto">
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${overall.percentage}%` }} />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1 text-right">{overall.percentage}%</p>
              </div>
            </div>
          );

          if (id === 'streak') return (
            <div key="streak" className={baseClass}
              draggable onDragStart={() => handleDragStart('streak')}
              onDragOver={(e) => handleDragOver(e, 'streak')} onDrop={handleDrop}
            >
              <GripVertical className="w-3 h-3 text-muted-foreground/40 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Flame className="w-4 h-4 text-orange-500" />
                </div>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Sequência</span>
              </div>
              <div>
                <p className="text-2xl font-bold leading-none">{streakDays} <span className="text-sm font-normal text-muted-foreground">{streakDays === 1 ? 'dia' : 'dias'}</span></p>
                <p className="text-[11px] text-muted-foreground mt-1">{streakDays > 0 ? '🔥 Continue assim!' : 'Comece sua sequência hoje'}</p>
              </div>
              <div className="flex gap-1 mt-auto">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className={`flex-1 h-1.5 rounded-full ${i >= 7 - streakDays ? 'bg-orange-500' : 'bg-muted'}`} />
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground -mt-2">Últimos 7 dias</p>
            </div>
          );

          if (id === 'tempo') return (
            <div key="tempo" className={baseClass}
              draggable onDragStart={() => handleDragStart('tempo')}
              onDragOver={(e) => handleDragOver(e, 'tempo')} onDrop={handleDrop}
            >
              <GripVertical className="w-3 h-3 text-muted-foreground/40 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Clock className="w-4 h-4 text-amber-500" />
                </div>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Tempo</span>
              </div>
              <div>
                <p className="text-2xl font-bold leading-none">{formatStudyTime(studyMinutes)}</p>
                <p className="text-[11px] text-muted-foreground mt-1">total estudado</p>
              </div>
              <div className="mt-auto pt-2 border-t border-border/40 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">Média/sessão</span>
                <span className="text-[10px] font-semibold text-amber-400">
                  {overall.completed > 0 ? formatStudyTime(Math.round(studyMinutes / overall.completed)) : '—'}
                </span>
              </div>
            </div>
          );

          if (id === 'progresso') return (
            <div key="progresso" className={baseClass}
              draggable onDragStart={() => handleDragStart('progresso')}
              onDragOver={(e) => handleDragOver(e, 'progresso')} onDrop={handleDrop}
            >
              <GripVertical className="w-3 h-3 text-muted-foreground/40 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <Zap className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Progresso</span>
              </div>
              <div>
                <p className="text-2xl font-bold leading-none text-emerald-400">{overall.percentage}<span className="text-sm font-normal text-muted-foreground">%</span></p>
                <p className="text-[11px] text-muted-foreground mt-1">{modulesCompleted} módulo{modulesCompleted !== 1 ? 's' : ''} completo{modulesCompleted !== 1 ? 's' : ''}</p>
              </div>
              <div className="mt-auto">
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${overall.percentage}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>{overall.completed} feitas</span>
                  <span>{overall.total - overall.completed} restantes</span>
                </div>
              </div>
            </div>
          );
          return null;
        })}
      </div>

      {/* Weekly Activity (collapsible) */}
      <div className="mb-6">
        <button
          onClick={() => setShowActivity((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-card border border-border rounded-xl text-sm font-medium hover:border-primary/40 transition-colors group"
        >
          <span className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
            <span>📊</span>
            Ver atividade semanal
          </span>
          <span className={`text-muted-foreground transition-transform duration-200 ${showActivity ? 'rotate-180' : ''}`}>
            ▾
          </span>
        </button>
        {showActivity && (
          <div className="mt-2">
            <WeeklyChart />
          </div>
        )}
      </div>

      {/* Daily Goal Card */}
      <div className="bg-card border border-border rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold">Meta de hoje</h3>
          </div>
          {isGoalMet ? (
            <span className="text-sm font-semibold text-emerald-400">🎉 Meta atingida!</span>
          ) : (
            <span className="text-sm text-muted-foreground font-medium">
              {todayCount}/{target} {target === 1 ? 'lição' : 'lições'}
            </span>
          )}
        </div>
        <div className="mb-3">
          <ProgressBar value={goalPct} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground mr-1">Meta diária:</span>
          {[1, 2, 3, 5].map((n) => (
            <button
              key={n}
              onClick={() => setTarget(n)}
              className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                target === n
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Conquistas Summary */}
      <Link
        href="/conquistas"
        className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary/40 transition-all mb-6 group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <Award className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="text-sm font-semibold">Conquistas</p>
            <p className="text-xs text-muted-foreground">{earnedCount}/{totalCount} desbloqueadas</p>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
      </Link>

      {/* Progress Overview Card */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-bold flex items-center gap-2">
            <span className="text-base">📈</span> Visão Geral do Progresso
          </h2>
          <Link href="/progresso" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
            Ver detalhes <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Top stats row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="flex flex-col items-center justify-center bg-primary/5 border border-primary/20 rounded-xl py-3">
            <p className="text-2xl font-bold text-primary">{overall.percentage}%</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Concluído</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-emerald-500/5 border border-emerald-500/20 rounded-xl py-3">
            <p className="text-2xl font-bold text-emerald-400">{overall.completed}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Lições</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-orange-500/5 border border-orange-500/20 rounded-xl py-3">
            <p className="text-2xl font-bold text-orange-400">{dailyStreak}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">🔥 Streak</p>
          </div>
        </div>

        {/* Overall bar */}
        <div className="mb-5">
          <div className="flex justify-between text-[11px] text-muted-foreground mb-1.5">
            <span>Progresso total</span>
            <span>{overall.completed}/{overall.total} lições</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${overall.percentage}%` }}
            />
          </div>
        </div>

        {/* Per-module breakdown */}
        <div className="space-y-2">
          {[...modules].sort((a, b) => a.order - b.order).map((mod) => {
            const stats = getModuleStats(mod.id, mod.lessons);
            const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
            const color = MODULE_COLORS[mod.id] ?? '#6366f1';
            if (pct === 0) return null;
            return (
              <div key={mod.id}>
                <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                  <span className="truncate">{mod.title}</span>
                  <span className="shrink-0 ml-2 font-medium" style={{ color }}>{pct}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            );
          })}
          {overall.completed === 0 && (
            <p className="text-xs text-muted-foreground text-center py-2">
              Complete sua primeira lição para ver o progresso aqui!
            </p>
          )}
        </div>
      </div>

      {/* Favorites section — only shown when user has favorites */}
      {favoriteLessons.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400 fill-red-400" />
              Favoritos
            </h2>
            <Link
              href="/progresso"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Ver todos
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {favoriteLessons.map((lesson) => {
              const mod = modules.find((m) => m.id === lesson.moduleId);
              if (!mod) return null;
              return (
                <Link
                  key={lesson.id}
                  href={`/licao/${lesson.moduleId}/${lesson.id}`}
                  className="flex items-center justify-between px-4 py-3 bg-card border border-border rounded-xl hover:border-primary/50 transition-all hover:shadow-sm group"
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
        </div>
      )}

      {/* Module Cards */}
      <h2 className="text-xl font-semibold mb-4">Módulos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((mod) => {
          const Icon = iconMap[mod.icon] || BookOpen;
          const stats = getModuleStats(mod.id, mod.lessons);
          const percentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

          return (
            <Link
              key={mod.id}
              href={`/modulo/${mod.id}`}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all hover:shadow-sm group"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-muted ${mod.color} flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                      {mod.title}
                    </h3>
                    {percentage === 100 && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 bg-emerald-500/15 text-emerald-400 rounded-full flex-shrink-0">
                        ✓ Completo
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {mod.description}
                  </p>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{stats.completed}/{stats.total} lições</span>
                      <span>{percentage}%</span>
                    </div>
                    <ProgressBar value={percentage} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
