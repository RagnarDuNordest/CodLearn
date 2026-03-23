'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getModuleById } from '@/data/modules';
import { getLessonsByModule } from '@/data/lessons';
import { useProgress } from '@/hooks/useProgress';
import {
  CheckCircle2,
  Circle,
  Lock,
  Hammer,
  Zap,
  BookOpen,
  ArrowLeft,
  Clock,
} from 'lucide-react';

export default function ModuleTrailPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = use(params);
  const mod = getModuleById(moduleId);

  if (!mod) notFound();

  const lessons = getLessonsByModule(moduleId);
  const allIds = lessons.map((l) => l.id);
  const { isLessonCompleted } = useProgress(allIds);

  const completedCount = lessons.filter((l) => isLessonCompleted(l.id)).length;
  const percentage =
    lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Todos os módulos
      </Link>

      {/* Module header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">{mod.title}</h1>
        <p className="text-muted-foreground text-sm">{mod.description}</p>
        <div className="mt-4 flex items-center gap-4 text-sm">
          <span className="font-medium">
            {completedCount}/{lessons.length} lições
          </span>
          <div className="flex-1 bg-border rounded-full h-2 overflow-hidden">
            <div
              className="h-2 rounded-full bg-primary transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-muted-foreground">{percentage}%</span>
        </div>
      </div>

      {/* Trail */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border" />

        <div className="space-y-3">
          {lessons.map((lesson, index) => {
            const completed = isLessonCompleted(lesson.id);
            const prevLesson = index > 0 ? lessons[index - 1] : null;
            const locked = prevLesson !== null && !isLessonCompleted(prevLesson.id);

            const isGuidedProject = lesson.type === 'guided-project';
            const isFreeProject = lesson.type === 'free-project';

            return (
              <div key={lesson.id} className="relative flex items-center gap-4">
                {/* Node */}
                <div
                  className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                    completed
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500'
                      : locked
                      ? 'bg-muted border-border text-muted-foreground'
                      : isGuidedProject || isFreeProject
                      ? 'bg-blue-500/10 border-blue-500/60 text-blue-400'
                      : 'bg-primary/10 border-primary/60 text-primary'
                  }`}
                >
                  {completed ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : locked ? (
                    <Lock className="w-4 h-4" />
                  ) : isGuidedProject ? (
                    <Hammer className="w-4 h-4" />
                  ) : isFreeProject ? (
                    <Zap className="w-4 h-4" />
                  ) : (
                    <BookOpen className="w-4 h-4" />
                  )}
                </div>

                {/* Card */}
                {locked ? (
                  <div className="flex-1 bg-card border border-border/50 rounded-xl p-4 opacity-60 cursor-not-allowed">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-sm line-clamp-1">{lesson.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {lesson.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                        <Clock className="w-3 h-3" />
                        {lesson.estimatedMinutes}m
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={`/licao/${moduleId}/${lesson.id}`}
                    className={`flex-1 bg-card border rounded-xl p-4 transition-all hover:shadow-md group ${
                      completed
                        ? 'border-emerald-500/30 hover:border-emerald-500/60'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                            {lesson.title}
                          </p>
                          {isGuidedProject && (
                            <span className="text-[10px] font-medium px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded-full flex-shrink-0">
                              Guiado
                            </span>
                          )}
                          {isFreeProject && (
                            <span className="text-[10px] font-medium px-1.5 py-0.5 bg-purple-500/10 text-purple-400 rounded-full flex-shrink-0">
                              Livre
                            </span>
                          )}
                          {completed && (
                            <span className="text-[10px] font-medium px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full flex-shrink-0">
                              Concluído
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {lesson.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                        <Clock className="w-3 h-3" />
                        {lesson.estimatedMinutes}m
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion message */}
      {percentage === 100 && (
        <div className="mt-8 p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
          <p className="text-2xl mb-2">🎉</p>
          <p className="font-bold text-emerald-400 text-lg">Módulo completo!</p>
          <p className="text-sm text-muted-foreground mt-1">
            Você concluiu todas as lições de <strong>{mod.title}</strong>.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Ver outros módulos
          </Link>
        </div>
      )}
    </div>
  );
}
