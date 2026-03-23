'use client';

import { CheckCircle2, XCircle } from 'lucide-react';
import type { QuizQuestion as QuizQuestionType } from '@/types/quiz';

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedOptionId: string | null;
  phase: 'answering' | 'showingAnswer';
  onSelect: (id: string) => void;
}

export default function QuizQuestion({ question, selectedOptionId, phase, onSelect }: QuizQuestionProps) {
  function getOptionClasses(optionId: string): string {
    const base = 'w-full text-left border rounded-lg p-3 transition-all duration-200 flex items-center gap-3';

    if (phase === 'answering') {
      if (selectedOptionId === optionId) {
        return `${base} border-primary bg-primary/5 ring-2 ring-primary/20`;
      }
      return `${base} border-border hover:border-primary/50 hover:bg-muted/50 cursor-pointer`;
    }

    // showingAnswer phase
    const isCorrect = optionId === question.correctOptionId;
    const isSelected = optionId === selectedOptionId;

    if (isCorrect) {
      return `${base} border-green-500 bg-green-500/10 text-green-700 dark:text-green-300`;
    }
    if (isSelected && !isCorrect) {
      return `${base} border-red-500 bg-red-500/10 text-red-700 dark:text-red-300`;
    }
    return `${base} border-border opacity-50`;
  }

  function getOptionIcon(optionId: string) {
    if (phase !== 'showingAnswer') return null;

    const isCorrect = optionId === question.correctOptionId;
    const isSelected = optionId === selectedOptionId;

    if (isCorrect) {
      return <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />;
    }
    if (isSelected && !isCorrect) {
      return <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />;
    }
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-foreground mb-4">
        {question.question}
      </h3>

      <div className="space-y-2">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => phase === 'answering' && onSelect(option.id)}
            disabled={phase === 'showingAnswer'}
            className={getOptionClasses(option.id)}
          >
            {getOptionIcon(option.id)}
            <span className="flex-1">{option.text}</span>
          </button>
        ))}
      </div>

      {phase === 'showingAnswer' && question.explanation && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Explicacao: </span>
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
