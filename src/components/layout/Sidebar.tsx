'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Lightbulb,
  Code,
  Cpu,
  Database,
  Boxes,
  GitBranch,
  GitMerge,
  ChevronDown,
  CheckCircle2,
  X,
  Coffee,
  Globe,
  Server,
  Layout,
  Brain,
  Terminal,
  Hammer,
  Zap,
  BookOpen,
} from 'lucide-react';
import { modules } from '@/data/modules';
import { getAllLessons } from '@/data/lessons';
import { useProgress } from '@/hooks/useProgress';
import Logo from '@/components/ui/Logo';

const iconMap: Record<string, any> = {
  Lightbulb, Code, Cpu, Database, Boxes, GitBranch, GitMerge,
  Coffee, Globe, Server, Layout, Brain, Terminal,
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { isLessonCompleted } = useProgress();
  const allLessons = useMemo(() => getAllLessons(), []);

  // Detect active module from URL: /licao/[moduleId]/[lessonId]
  const activeModuleId = useMemo(() => {
    const match = pathname.match(/^\/licao\/([^/]+)/);
    return match ? match[1] : null;
  }, [pathname]);

  // Start with only the active module expanded; others collapsed
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    modules.forEach((mod) => {
      initial[mod.id] = false;
    });
    return initial;
  });

  // When the active module changes (navigation), auto-expand it
  useEffect(() => {
    if (activeModuleId) {
      setExpandedModules((prev) => ({
        ...prev,
        [activeModuleId]: true,
      }));
    }
  }, [activeModuleId]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const getLessonsByModule = (moduleId: string) => {
    return allLessons
      .filter((lesson) => lesson.moduleId === moduleId)
      .sort((a, b) => a.order - b.order);
  };

  const sortedModules = useMemo(
    () => [...modules].sort((a, b) => a.order - b.order),
    []
  );

  // Count completed lessons per module for the badge
  const moduleCompletedCount = (moduleId: string) => {
    const lessons = getLessonsByModule(moduleId);
    return lessons.filter((l) => isLessonCompleted(l.id)).length;
  };

  const sidebarContent = (
    <div className="h-full flex flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo area */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={onClose}
        >
          <Logo size={26} />
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            CodLearn
          </span>
        </Link>
        <button
          onClick={onClose}
          className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Module list */}
      <nav className="flex-1 overflow-y-auto py-4">
        {/* Top nav links */}
        <div className="px-2 mb-2 space-y-0.5">
          <Link
            href="/habilidades"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
              pathname === '/habilidades' ? 'bg-accent/60 text-foreground' : 'text-muted-foreground'
            }`}
          >
            <span className="text-base">🌳</span>
            <span>Habilidades</span>
          </Link>
          <Link
            href="/quiz-rapido"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
              pathname === '/quiz-rapido' ? 'bg-accent/60 text-foreground' : 'text-muted-foreground'
            }`}
          >
            <span className="text-base">⚡</span>
            <span>Quiz Relâmpago</span>
          </Link>
          <Link
            href="/comparativo"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
              pathname === '/comparativo' ? 'bg-accent/60 text-foreground' : 'text-muted-foreground'
            }`}
          >
            <span className="text-base">🔄</span>
            <span>Comparativo</span>
          </Link>
          <Link
            href="/guia-rapido"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
              pathname === '/guia-rapido' ? 'bg-accent/60 text-foreground' : 'text-muted-foreground'
            }`}
          >
            <span className="text-base">📖</span>
            <span>Guia Rápido</span>
          </Link>
          <Link
            href="/exercicios"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
              pathname === '/exercicios' ? 'bg-accent/60 text-foreground' : 'text-muted-foreground'
            }`}
          >
            <span className="text-base">🏋️</span>
            <span>Exercícios</span>
          </Link>
          <Link
            href="/desafio-diario"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
              pathname === '/desafio-diario' ? 'bg-accent/60 text-foreground' : 'text-muted-foreground'
            }`}
          >
            <span className="text-base">🔥</span>
            <span>Desafio Diário</span>
          </Link>
          <Link
            href="/roadmap"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
              pathname === '/roadmap' ? 'bg-accent/60 text-foreground' : 'text-muted-foreground'
            }`}
          >
            <span className="text-base">🗺️</span>
            <span>Roadmap</span>
          </Link>
          <Link
            href="/projetos"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
              pathname === '/projetos' ? 'bg-accent/60 text-foreground' : 'text-muted-foreground'
            }`}
          >
            <span className="text-base">🚀</span>
            <span>Projetos Guiados</span>
          </Link>
          <Link
            href="/projetos-reais"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
              pathname === '/projetos-reais' ? 'bg-accent/60 text-foreground' : 'text-muted-foreground'
            }`}
          >
            <span className="text-base">🏢</span>
            <span>Projetos Reais</span>
          </Link>
          <Link
            href="/construindo"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
              pathname === '/construindo' ? 'bg-accent/60 text-foreground' : 'text-muted-foreground'
            }`}
          >
            <Hammer className="h-4 w-4" />
            <span>Construindo Projetos</span>
          </Link>
          <Link
            href="/recursos"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
              pathname === '/recursos' ? 'bg-accent/60 text-foreground' : 'text-muted-foreground'
            }`}
          >
            <span className="text-base">📚</span>
            <span>Recursos</span>
          </Link>
          <Link
            href="/comunidade"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
              pathname === '/comunidade' ? 'bg-accent/60 text-foreground' : 'text-muted-foreground'
            }`}
          >
            <span className="text-base">🤝</span>
            <span>Comunidade</span>
          </Link>
          <Link
            href="/glossario"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
              pathname === '/glossario' ? 'bg-accent/60 text-foreground' : 'text-muted-foreground'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Glossário</span>
          </Link>
          <Link
            href="/entrevistas"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
              pathname === '/entrevistas' ? 'bg-accent/60 text-foreground' : 'text-muted-foreground'
            }`}
          >
            <span className="text-base">💼</span>
            <span>Entrevistas</span>
          </Link>
          <Link
            href="/revisao"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
              pathname === '/revisao' ? 'bg-accent/60 text-foreground' : 'text-muted-foreground'
            }`}
          >
            <span className="text-base">🧠</span>
            <span>Revisão Espaçada</span>
          </Link>
          <Link
            href="/digitacao"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
              pathname === '/digitacao' ? 'bg-accent/60 text-foreground' : 'text-muted-foreground'
            }`}
          >
            <span className="text-base">⌨️</span>
            <span>Jogo de Digitação</span>
          </Link>
          <Link
            href="/code-runner"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
              pathname === '/code-runner' ? 'bg-accent/60 text-foreground' : 'text-muted-foreground'
            }`}
          >
            <span className="text-base">🏃</span>
            <span>Code Runner</span>
          </Link>
          <Link
            href="/cacador-de-bugs"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
              pathname === '/cacador-de-bugs' ? 'bg-accent/60 text-foreground' : 'text-muted-foreground'
            }`}
          >
            <span className="text-base">🐛</span>
            <span>Caça ao Bug</span>
          </Link>
          <Link
            href="/snippets"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
              pathname === '/snippets' ? 'bg-accent/60 text-foreground' : 'text-muted-foreground'
            }`}
          >
            <span className="text-base">📋</span>
            <span>Snippets</span>
          </Link>
        </div>
        <div className="border-b border-border mx-3 mb-2" />

        {sortedModules.map((mod) => {
          const IconComponent = iconMap[mod.icon] || Code;
          const moduleLessons = getLessonsByModule(mod.id);
          const isExpanded = expandedModules[mod.id] ?? false;
          const isActiveModule = mod.id === activeModuleId;
          const completed = moduleCompletedCount(mod.id);
          const total = moduleLessons.length;

          return (
            <div key={mod.id} className="mb-0.5">
              {/* Module header */}
              <button
                onClick={() => toggleModule(mod.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 hover:bg-accent transition-colors rounded-lg mx-1 text-left ${
                  isActiveModule ? 'bg-accent/60' : ''
                }`}
                style={{ width: 'calc(100% - 0.5rem)' }}
              >
                <IconComponent className={`h-4 w-4 shrink-0 ${mod.color}`} />
                <span className={`font-medium text-sm flex-1 truncate ${isActiveModule ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {mod.title}
                </span>
                {/* Progress badge */}
                {completed > 0 && (
                  <span className="text-[10px] font-medium text-muted-foreground/70 shrink-0">
                    {completed}/{total}
                  </span>
                )}
                <ChevronDown
                  className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    isExpanded ? 'rotate-0' : '-rotate-90'
                  }`}
                />
              </button>

              {/* Lesson list */}
              {isExpanded && (
                <div className="mt-0.5 space-y-0.5 pb-1">
                  {moduleLessons.map((lesson) => {
                    const lessonPath = `/licao/${mod.id}/${lesson.id}`;
                    const isActive = pathname === lessonPath;
                    const done = isLessonCompleted(lesson.id);
                    const isGuidedProject = lesson.type === 'guided-project';
                    const isFreeProject = lesson.type === 'free-project';

                    return (
                      <Link
                        key={lesson.id}
                        href={lessonPath}
                        onClick={onClose}
                        className={`flex items-center gap-2 pl-9 pr-3 py-1.5 text-sm rounded-lg mx-1 transition-colors ${
                          isActive
                            ? 'bg-primary/15 text-primary font-medium'
                            : done
                            ? 'text-muted-foreground hover:bg-accent hover:text-foreground'
                            : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                        }`}
                        style={{ width: 'calc(100% - 0.5rem)' }}
                      >
                        {done ? (
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                        ) : isGuidedProject ? (
                          <Hammer className="h-3.5 w-3.5 shrink-0 text-blue-400/70" />
                        ) : isFreeProject ? (
                          <Zap className="h-3.5 w-3.5 shrink-0 text-purple-400/70" />
                        ) : (
                          <span className="h-3.5 w-3.5 shrink-0 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                          </span>
                        )}
                        <span className="truncate">{lesson.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block fixed top-0 left-0 h-screen w-64 z-40 border-r border-border">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <aside className="absolute top-0 left-0 h-full w-64 shadow-xl animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
