'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Trophy } from 'lucide-react';
import type { LessonQuiz as LessonQuizType } from '@/types/quiz';

interface LessonQuizProps {
  quiz: LessonQuizType;
  onComplete: (score: number, total: number) => void;
}

type Phase = 'answering' | 'showingAnswer' | 'finished';

export default function LessonQuiz({ quiz, onComplete }: LessonQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>('answering');
  const [score, setScore] = useState(0);

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentIndex];
  const isLastQuestion = currentIndex === totalQuestions - 1;

  useEffect(() => {
    if (phase === 'finished') {
      onComplete(score, totalQuestions);
      try {
        localStorage.setItem(
          `codlearn_quiz_${quiz.lessonId}`,
          JSON.stringify({ score, total: totalQuestions, completedAt: new Date().toISOString() })
        );
      } catch {
        // ignore storage errors
      }
    }
  }, [phase, score, totalQuestions, quiz.lessonId, onComplete]);

  function handleSelect(idx: number) {
    if (phase !== 'answering') return;
    const isCorrect = idx === currentQuestion.correctIndex;
    setSelectedIndex(idx);
    setPhase('showingAnswer');
    if (isCorrect) setScore((s) => s + 1);
  }

  function handleNext() {
    if (isLastQuestion) {
      setPhase('finished');
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setPhase('answering');
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setPhase('answering');
    setScore(0);
  }

  function getRatingMessage(score: number, total: number): string {
    const ratio = score / total;
    if (score === total) return 'Perfeito! 🌟';
    if (ratio >= 0.7) return 'Muito bem! 👏';
    return 'Continue praticando! 💪';
  }

  function getOptionClasses(idx: number): string {
    const base =
      'w-full text-left border rounded-lg p-3 transition-all duration-200 flex items-center gap-3 text-sm';

    if (phase === 'answering') {
      if (selectedIndex === idx) {
        return `${base} border-primary bg-primary/5 ring-2 ring-primary/20 cursor-pointer`;
      }
      return `${base} border-border hover:border-primary/50 hover:bg-muted/50 cursor-pointer`;
    }

    // showingAnswer
    const isCorrect = idx === currentQuestion.correctIndex;
    const isSelected = idx === selectedIndex;

    if (isCorrect) {
      return `${base} border-green-500 bg-green-500/10 text-green-700 dark:text-green-300`;
    }
    if (isSelected && !isCorrect) {
      return `${base} border-red-500 bg-red-500/10 text-red-700 dark:text-red-300`;
    }
    return `${base} border-border opacity-50`;
  }

  function getOptionIcon(idx: number) {
    if (phase !== 'showingAnswer') return null;
    const isCorrect = idx === currentQuestion.correctIndex;
    const isSelected = idx === selectedIndex;
    if (isCorrect) return <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />;
    if (isSelected && !isCorrect) return <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />;
    return null;
  }

  if (phase === 'finished') {
    const message = getRatingMessage(score, totalQuestions);
    const passed = score / totalQuestions >= 0.7;
    return (
      <div className="mt-12 border-t border-border pt-8">
        <h2 className="text-2xl font-bold mb-6">Quiz de revisão</h2>
        <div
          className={`rounded-xl p-8 text-center ${
            passed
              ? 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800'
              : 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800'
          }`}
        >
          <div className="flex justify-center mb-4">
            <Trophy
              className={`w-16 h-16 ${passed ? 'text-emerald-500' : 'text-amber-500'}`}
            />
          </div>
          <div className="text-5xl font-bold mb-3">
            {score}/{totalQuestions}
          </div>
          <p
            className={`text-xl font-semibold mb-6 ${
              passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
            }`}
          >
            {message}
          </p>
          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            Refazer quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 border-t border-border pt-8">
      <h2 className="text-2xl font-bold mb-6">Quiz de revisão</h2>

      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          Pergunta {currentIndex + 1} de {totalQuestions}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i < currentIndex
                  ? 'bg-primary'
                  : i === currentIndex
                  ? 'bg-primary/50'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <h3 className="text-lg font-bold text-foreground mb-4">{currentQuestion.question}</h3>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            disabled={phase === 'showingAnswer'}
            className={getOptionClasses(idx)}
          >
            {getOptionIcon(idx)}
            <span className="flex-1">{option}</span>
          </button>
        ))}
      </div>

      {/* Explanation */}
      {phase === 'showingAnswer' && (
        <div className="mb-4 p-3 bg-muted/50 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Explicação: </span>
            {currentQuestion.explanation}
          </p>
        </div>
      )}

      {/* Next button */}
      {phase === 'showingAnswer' && (
        <button
          onClick={handleNext}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition text-sm font-medium"
        >
          {isLastQuestion ? 'Ver resultado' : 'Próxima pergunta'}
        </button>
      )}
    </div>
  );
}
