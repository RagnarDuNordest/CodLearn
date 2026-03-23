'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLessonById, getAdjacentLessons, getLessonsByModule } from '@/data/lessons';
import { getModuleById } from '@/data/modules';
import LessonContent from '@/components/lesson/LessonContent';
import LessonNavigation from '@/components/lesson/LessonNavigation';
import CodeChallenges from '@/components/lesson/CodeChallenge';
import GuidedProject from '@/components/lesson/GuidedProject';
import FreeProject from '@/components/lesson/FreeProject';
import ModuleCertificate from '@/components/lesson/ModuleCertificate';
import LessonNotes from '@/components/lesson/LessonNotes';
import FavoriteButton from '@/components/lesson/FavoriteButton';
import LessonQuiz from '@/components/lesson/LessonQuiz';
import ModuleCheatsheet from '@/components/lesson/ModuleCheatsheet';
import LessonRating from '@/components/lesson/LessonRating';
import CommunityTips from '@/components/lesson/CommunityTips';
import { getQuizByLessonId } from '@/data/quizzes';
import { useProgress } from '@/hooks/useProgress';
import { launchConfetti } from '@/lib/confetti';
import { Clock, BookOpen, Hammer, Zap, Lock } from 'lucide-react';
import TechFactCard from '@/components/lesson/TechFactCard';

export default function LessonPage({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>;
}) {
  const { moduleId, lessonId } = use(params);
  const lesson = getLessonById(lessonId);
  const mod = getModuleById(moduleId);

  const { markCompleted, isLessonCompleted } = useProgress();
  const [showCertificate, setShowCertificate] = useState(false);

  if (!lesson || !mod || lesson.moduleId !== moduleId) {
    notFound();
  }

  const { prev, next } = getAdjacentLessons(moduleId, lessonId);
  const completed = isLessonCompleted(lessonId);

  // Sequential unlock: check if previous lesson is completed
  const moduleLessons = getLessonsByModule(moduleId);
  const lessonIndex = moduleLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = lessonIndex > 0 ? moduleLessons[lessonIndex - 1] : null;
  const isLocked = prevLesson !== null && !isLessonCompleted(prevLesson.id);

  const handleMarkCompleted = () => {
    markCompleted(lesson.id, lesson.moduleId);
    launchConfetti();

    // Show certificate if this is the last lesson of the module
    const isLastLesson = next === null || next.moduleId !== moduleId;
    if (isLastLesson) {
      setShowCertificate(true);
    }
  };

  const isGuidedProject = lesson.type === 'guided-project';
  const isFreeProject = lesson.type === 'free-project';
  const isProject = isGuidedProject || isFreeProject;

  const lessonQuiz = !isProject ? getQuizByLessonId(lessonId) : undefined;

  return (
    <div>
      {/* Certificate modal */}
      {showCertificate && (
        <ModuleCertificate
          moduleTitle={mod.title}
          onClose={() => setShowCertificate(false)}
        />
      )}

      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-4">
        <span>{mod.title}</span>
        <span className="mx-2">/</span>
        <span className="text-foreground">{lesson.title}</span>
      </div>

      {/* Sequential unlock warning */}
      {isLocked && prevLesson && (
        <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center gap-3">
          <Lock className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <div>
            <p className="font-medium text-amber-400">Lição bloqueada</p>
            <p className="text-sm text-muted-foreground">
              Complete &quot;{prevLesson.title}&quot; primeiro para desbloquear esta lição.
            </p>
            <Link
              href={`/licao/${moduleId}/${prevLesson.id}`}
              className="text-sm text-primary hover:underline"
            >
              Ir para lição anterior →
            </Link>
          </div>
        </div>
      )}

      {/* Lesson Header */}
      <div className="mb-8">
        {/* Project type badge */}
        {isGuidedProject && (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-full mb-3">
            <Hammer className="w-3.5 h-3.5" />
            Projeto guiado
          </span>
        )}
        {isFreeProject && (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-full mb-3">
            <Zap className="w-3.5 h-3.5" />
            Projeto livre
          </span>
        )}

        <h1 className="text-3xl font-bold mb-3">{lesson.title}</h1>
        <p className="text-muted-foreground mb-3">{lesson.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{lesson.estimatedMinutes} min</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{isProject ? 'Projeto' : `Licao ${lesson.order + 1}`}</span>
          </div>
          {completed && (
            <span className="text-emerald-500 font-medium">Concluida</span>
          )}
          <FavoriteButton lessonId={lessonId} />
        </div>
      </div>

      {/* Regular lesson: sections + challenges */}
      {!isProject && (
        <>
          <LessonContent sections={lesson.sections} />

          {/* Tech fact card — shown 1 in 3 lessons */}
          {lessonIndex % 3 === 0 && <TechFactCard />}

          {lesson.challenges && lesson.challenges.length > 0 && (
            <CodeChallenges
              challenges={lesson.challenges}
              lessonId={lessonId}
              moduleId={moduleId}
              onLessonCompleted={handleMarkCompleted}
            />
          )}

          {!completed && (
            <div className="mt-8 text-center">
              <button
                onClick={handleMarkCompleted}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
              >
                Marcar como concluida
              </button>
            </div>
          )}

          {/* Quiz de revisão */}
          {lessonQuiz && (
            <LessonQuiz
              quiz={lessonQuiz}
              onComplete={(score, total) => {
                console.log(`Quiz concluido: ${score}/${total}`);
              }}
            />
          )}
        </>
      )}

      {/* Guided project */}
      {isGuidedProject && lesson.guidedProject && (
        <GuidedProject
          project={lesson.guidedProject}
          onCompleted={handleMarkCompleted}
        />
      )}

      {/* Free project */}
      {isFreeProject && lesson.freeProject && (
        <FreeProject
          project={lesson.freeProject}
          onCompleted={handleMarkCompleted}
        />
      )}

      {/* Module cheatsheet */}
      <ModuleCheatsheet moduleId={moduleId} />

      {/* Community tips & rating */}
      <CommunityTips tags={[moduleId]} />
      <LessonRating lessonId={lessonId} />

      {/* Navigation */}
      <LessonNavigation
        prevLesson={prev ? { id: prev.id, moduleId: prev.moduleId, title: prev.title } : null}
        nextLesson={next ? { id: next.id, moduleId: next.moduleId, title: next.title } : null}
      />

      {/* Personal notes */}
      <LessonNotes lessonId={lessonId} />
    </div>
  );
}
