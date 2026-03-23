'use client';

import { useState, useCallback } from 'react';
import { CodeChallenge as ChallengeType } from '@/types/lesson';
import CodeBlock from './CodeBlock';
import CodeEditor from './CodeEditor';
import { Lightbulb, Eye, EyeOff, ChevronDown, CheckCircle2, Trophy } from 'lucide-react';

interface CodeChallengeProps {
  challenges: ChallengeType[];
  lessonId: string;
  moduleId: string;
  onLessonCompleted?: () => void;
}

function ChallengeCard({
  challenge,
  isCompleted,
  onAllTestsPassed,
}: {
  challenge: ChallengeType;
  isCompleted: boolean;
  onAllTestsPassed: () => void;
}) {
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [revealedHints, setRevealedHints] = useState(0);

  const revealNextHint = () => {
    if (revealedHints < challenge.hints.length) {
      setRevealedHints((prev) => prev + 1);
    }
  };

  const isPython = challenge.language === 'python';

  return (
    <div className={`border rounded-xl p-5 bg-card transition-colors ${isCompleted ? 'border-emerald-500/50' : 'border-border'}`}>
      <div className="flex items-start gap-3 mb-4">
        <div className={`p-2 rounded-lg shrink-0 ${isCompleted ? 'bg-emerald-500/10' : 'bg-purple-500/10'}`}>
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          ) : (
            <Lightbulb className="w-5 h-5 text-purple-500" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-foreground">{challenge.title}</h4>
            {isCompleted && (
              <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded-full font-medium">
                Concluido
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
        </div>
      </div>

      {/* Interactive editor for Python, read-only block for others */}
      {isPython ? (
        <div className="mb-4">
          <CodeEditor challenge={challenge} onAllTestsPassed={onAllTestsPassed} />
        </div>
      ) : (
        <div className="mb-4">
          <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">
            Codigo inicial
          </p>
          <CodeBlock code={challenge.starterCode} language={challenge.language} />
        </div>
      )}

      {/* Hints */}
      {challenge.hints.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => {
              setShowHints(!showHints);
              if (!showHints && revealedHints === 0) revealNextHint();
            }}
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${showHints ? 'rotate-180' : ''}`} />
            {showHints ? 'Esconder dicas' : 'Precisa de uma dica?'}
          </button>

          {showHints && (
            <div className="mt-2 space-y-2">
              {challenge.hints.slice(0, revealedHints).map((hint, i) => (
                <div
                  key={i}
                  className="text-sm bg-amber-500/5 border-l-2 border-amber-500 pl-3 py-1 text-foreground/80"
                >
                  <span className="font-medium text-amber-600 dark:text-amber-400">
                    Dica {i + 1}:
                  </span>{' '}
                  {hint}
                </div>
              ))}
              {revealedHints < challenge.hints.length && (
                <button
                  onClick={revealNextHint}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Revelar mais uma dica ({revealedHints}/{challenge.hints.length})
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Solution Toggle */}
      <button
        onClick={() => setShowSolution(!showSolution)}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
      >
        {showSolution ? (
          <>
            <EyeOff className="w-4 h-4" /> Esconder solucao
          </>
        ) : (
          <>
            <Eye className="w-4 h-4" /> Ver solucao
          </>
        )}
      </button>

      {showSolution && (
        <div className="mt-3">
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1 uppercase tracking-wide">
            Solucao
          </p>
          <CodeBlock code={challenge.solution} language={challenge.language} />
        </div>
      )}
    </div>
  );
}

export default function CodeChallenges({ challenges, onLessonCompleted }: CodeChallengeProps) {
  if (!challenges || challenges.length === 0) return null;

  // Track which challenge IDs have all tests passing
  const [passedChallenges, setPassedChallenges] = useState<Set<string>>(new Set());
  const [lessonJustCompleted, setLessonJustCompleted] = useState(false);

  // Challenges that have test cases (can be auto-evaluated)
  const evaluatableChallenges = challenges.filter(
    (c) => c.testCases && c.testCases.length > 0
  );

  const handleChallengePassed = useCallback(
    (challengeId: string) => {
      setPassedChallenges((prev) => {
        const next = new Set(prev);
        next.add(challengeId);

        // Check if ALL evaluatable challenges are now complete
        const allDone =
          evaluatableChallenges.length > 0 &&
          evaluatableChallenges.every((c) => next.has(c.id));

        if (allDone && !lessonJustCompleted) {
          setLessonJustCompleted(true);
          onLessonCompleted?.();
        }

        return next;
      });
    },
    [evaluatableChallenges, lessonJustCompleted, onLessonCompleted]
  );

  const completedCount = passedChallenges.size;
  const totalEvaluatable = evaluatableChallenges.length;

  return (
    <div className="mt-10 border-t border-border pt-8">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <h2 className="text-2xl font-bold">Desafios de Codigo</h2>
        {totalEvaluatable > 0 && (
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${
            completedCount === totalEvaluatable
              ? 'bg-emerald-500/10 text-emerald-500'
              : 'bg-muted text-muted-foreground'
          }`}>
            {completedCount}/{totalEvaluatable} concluidos
          </span>
        )}
      </div>
      <p className="text-muted-foreground mb-6 text-sm">
        Pratique o que aprendeu! Escreva seu codigo e clique em Executar para testar.
      </p>

      {/* Celebration banner */}
      {lessonJustCompleted && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3">
          <Trophy className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <p className="font-semibold text-emerald-400">Licao concluida!</p>
            <p className="text-sm text-muted-foreground">
              Voce passou em todos os desafios. A licao foi marcada como concluida automaticamente.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            isCompleted={passedChallenges.has(challenge.id)}
            onAllTestsPassed={() => handleChallengePassed(challenge.id)}
          />
        ))}
      </div>
    </div>
  );
}
