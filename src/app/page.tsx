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
import ProgressBar from '@/components/ui/ProgressBar';
import WeeklyChart from '@/components/ui/WeeklyChart';
import OnboardingQuiz from '@/components/onboarding/OnboardingQuiz';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import DashboardBanners from '@/components/dashboard/DashboardBanners';
import StatsCards from '@/components/dashboard/StatsCards';
import ProgressOverview from '@/components/dashboard/ProgressOverview';
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Lightbulb, Code, Cpu, Database, Boxes, GitBranch, GitMerge,
  Coffee, Globe, Server, Layout, Brain, Terminal,
  BookOpen, ArrowRight, Heart, Target, Award, CheckCircle2,
} from 'lucide-react';
import { playSound } from '@/lib/sounds';

const MODULE_DIFFICULTY: Record<string, { label: string; color: string }> = {
  'estrutura-pensamento': { label: 'Iniciante', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  'pensamento-sistemas':  { label: 'Iniciante', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  'resolucao-problemas':  { label: 'Iniciante', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  'leitura-codigo':       { label: 'Iniciante', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  intro:                  { label: 'Iniciante', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  logica:                 { label: 'Iniciante', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  linux:                  { label: 'Iniciante', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  git:                    { label: 'Iniciante', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  python:                 { label: 'Iniciante', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  sql:                    { label: 'Intermediário', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  'html-css':             { label: 'Intermediário', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  c:                      { label: 'Intermediário', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  java:                   { label: 'Intermediário', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  estruturas:             { label: 'Intermediário', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  algoritmos:             { label: 'Intermediário', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  frontend:               { label: 'Intermediário', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  backend:                { label: 'Intermediário', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  redes:                  { label: 'Avançado', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  docker:                 { label: 'Avançado', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  'debugging-testes':     { label: 'Avançado', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  'boas-praticas':        { label: 'Avançado', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  cicd:                   { label: 'Avançado', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  concorrencia:           { label: 'Avançado', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  'arquitetura-software': { label: 'Avançado', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  seguranca:              { label: 'Avançado', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  react:                  { label: 'Avançado', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  'python-avancado':      { label: 'Avançado', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
};

const MODULE_ACCENT: Record<string, string> = {
  'estrutura-pensamento': 'border-l-violet-500',
  'pensamento-sistemas':  'border-l-indigo-500',
  'resolucao-problemas':  'border-l-orange-500',
  'leitura-codigo':       'border-l-cyan-500',
  intro:                  'border-l-amber-500',
  logica:                 'border-l-pink-500',
  linux:                  'border-l-green-500',
  git:                    'border-l-orange-600',
  python:                 'border-l-blue-500',
  c:                      'border-l-gray-500',
  java:                   'border-l-red-500',
  estruturas:             'border-l-emerald-500',
  algoritmos:             'border-l-purple-500',
  sql:                    'border-l-cyan-600',
  'html-css':             'border-l-orange-400',
  frontend:               'border-l-yellow-500',
  backend:                'border-l-blue-700',
  redes:                  'border-l-teal-500',
  docker:                 'border-l-sky-500',
  'debugging-testes':     'border-l-rose-500',
  'boas-praticas':        'border-l-lime-500',
  cicd:                   'border-l-violet-600',
  concorrencia:           'border-l-fuchsia-500',
  'arquitetura-software': 'border-l-slate-400',
  seguranca:              'border-l-red-600',
  react:                  'border-l-cyan-400',
  'python-avancado':      'border-l-blue-400',
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Lightbulb, Code, Cpu, Database, Boxes, GitBranch, GitMerge,
  Coffee, Globe, Server, Layout, Brain, Terminal,
};

const DEFAULT_CARD_ORDER = ['licoes', 'streak', 'tempo', 'progresso'];
const CARD_ORDER_KEY = 'codlearn_card_order';

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

  const [cardOrder, setCardOrder] = useState<string[]>(() => DEFAULT_CARD_ORDER);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [showActivity, setShowActivity] = useState(false);

  useEffect(() => {
    setStudyMinutes(getTotalStudyMinutes());
    try {
      setDailyStreak(Number(localStorage.getItem('daily_streak') ?? 0));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CARD_ORDER_KEY);
      if (raw) {
        const parsed: string[] = JSON.parse(raw);
        if (DEFAULT_CARD_ORDER.every((id) => parsed.includes(id))) {
          setCardOrder(parsed);
        }
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const handler = () => playSound('success');
    window.addEventListener('codlearn:lesson-completed', handler);
    return () => window.removeEventListener('codlearn:lesson-completed', handler);
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
    } catch { /* ignore */ }
  }

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

  const favoriteLessons = useMemo(
    () =>
      favorites
        .map((id) => allLessons.find((l) => l.id === id))
        .filter(Boolean)
        .slice(0, 4) as typeof allLessons,
    [favorites, allLessons]
  );

  const hasStarted = overall.completed > 0;

  const modulesStarted = useMemo(
    () => [...modules].filter((mod) => getModuleStats(mod.id, mod.lessons).completed > 0).length,
    [getModuleStats]
  );

  const modulesCompleted = useMemo(
    () => [...modules].filter((mod) => {
      const s = getModuleStats(mod.id, mod.lessons);
      return s.total > 0 && s.completed === s.total;
    }).length,
    [getModuleStats]
  );

  // Suppress unused warning — progress is used by favoriteLessons/nextLesson via isLessonCompleted
  void progress;

  return (
    <div>
      <OnboardingQuiz />

      <WelcomeSection profile={profile} hasStarted={hasStarted} />

      <DashboardBanners nextLesson={nextLesson} hasStarted={hasStarted} />

      <StatsCards
        cardOrder={cardOrder}
        draggingId={draggingId}
        overall={overall}
        streakDays={streakDays}
        studyMinutes={studyMinutes}
        modulesStarted={modulesStarted}
        modulesCompleted={modulesCompleted}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />

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

      <ProgressOverview overall={overall} dailyStreak={dailyStreak} getModuleStats={getModuleStats} />

      {/* Favorites */}
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
              Ver todos <ArrowRight className="w-3.5 h-3.5" />
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
        {modules.map((mod, idx) => {
          const Icon = iconMap[mod.icon] || BookOpen;
          const stats = getModuleStats(mod.id, mod.lessons);
          const percentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
          const difficulty = MODULE_DIFFICULTY[mod.id];
          const accent = MODULE_ACCENT[mod.id] ?? 'border-l-primary';
          const isComplete = percentage === 100;
          const inProgress = percentage > 0 && !isComplete;

          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.04, ease: 'easeOut' }}
            >
              <Link
                href={`/modulo/${mod.id}`}
                className={`flex bg-card border border-border border-l-4 ${accent} rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition-all group ${isComplete ? 'opacity-80' : ''}`}
              >
                <div className="flex items-start gap-4 w-full">
                  <div className={`p-3 rounded-lg bg-muted ${mod.color} flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors leading-snug">
                        {mod.title}
                      </h3>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {difficulty && (
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${difficulty.color}`}>
                            {difficulty.label}
                          </span>
                        )}
                        {isComplete && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                      {mod.description}
                    </p>
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>{stats.completed}/{stats.total} lições</span>
                        <span className={isComplete ? 'text-emerald-400 font-medium' : inProgress ? 'text-primary font-medium' : ''}>
                          {percentage}%
                        </span>
                      </div>
                      <ProgressBar value={percentage} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
