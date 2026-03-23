'use client';

import { useEffect } from 'react';
import { Quiz as QuizType } from '@/types/quiz';
import { useQuiz } from '@/hooks/useQuiz';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';

interface QuizProps {
  quiz: QuizType;
  lessonId: string;
  moduleId: string;
  onComplete: (score: number, total: number) => void;
}

export default function Quiz({ quiz, lessonId, moduleId, onComplete }: QuizProps) {
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    selectedOptionId,
    phase,
    score,
    isCorrect,
    isLastQuestion,
    passed,
    passingScore,
    selectOption,
    nextQuestion,
    restart,
  } = useQuiz(quiz);

  useEffect(() => {
    if (phase === 'finished') {
      onComplete(score, totalQuestions);
    }
  }, [phase, score, totalQuestions, onComplete]);

  return (
    <div className="mt-12 border-t border-border pt-8">
      <h2 className="text-2xl font-bold mb-6">Quiz</h2>

      {phase !== 'finished' ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              Pergunta {currentQuestionIndex + 1} de {totalQuestions}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: totalQuestions }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < currentQuestionIndex
                      ? 'bg-primary'
                      : i === currentQuestionIndex
                      ? 'bg-primary/50'
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>

          <QuizQuestion
            question={currentQuestion}
            selectedOptionId={selectedOptionId}
            phase={phase}
            onSelect={selectOption}
          />

          {phase === 'showingAnswer' && (
            <button
              onClick={nextQuestion}
              className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
            >
              {isLastQuestion ? 'Ver Resultado' : 'Proxima'}
            </button>
          )}
        </div>
      ) : (
        <QuizResult
          score={score}
          total={totalQuestions}
          passed={passed}
          passingScore={passingScore}
          onRetry={restart}
        />
      )}
    </div>
  );
}
