'use client';

import { Trophy, RotateCcw } from 'lucide-react';

interface QuizResultProps {
  score: number;
  total: number;
  passed: boolean;
  passingScore: number;
  onRetry: () => void;
}

export default function QuizResult({ score, total, passed, passingScore, onRetry }: QuizResultProps) {
  return (
    <div className={`rounded-xl p-8 text-center ${passed ? 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800' : 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800'}`}>
      <div className="flex justify-center mb-4">
        {passed ? (
          <Trophy className="w-16 h-16 text-emerald-500" />
        ) : (
          <RotateCcw className="w-16 h-16 text-amber-500" />
        )}
      </div>

      <div className="text-5xl font-bold mb-2">
        {score}/{total}
      </div>

      <p className={`text-lg font-semibold mb-2 ${passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
        {passed ? 'Parabens! Voce passou!' : 'Quase la! Tente novamente.'}
      </p>

      <p className="text-sm text-muted-foreground mb-6">
        Minimo para passar: {passingScore} de {total}
      </p>

      {!passed && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition inline-flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Tentar Novamente
        </button>
      )}
    </div>
  );
}
