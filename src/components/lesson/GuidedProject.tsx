'use client';

import { useState, useCallback } from 'react';
import { GuidedProjectData, ProjectStep, CodeChallenge } from '@/types/lesson';
import CodeEditor from './CodeEditor';
import CodeBlock from './CodeBlock';
import {
  CheckCircle2,
  Lock,
  Unlock,
  ChevronDown,
  Eye,
  EyeOff,
  Briefcase,
  Trophy,
  ArrowRight,
} from 'lucide-react';

interface GuidedProjectProps {
  project: GuidedProjectData;
  onCompleted?: () => void;
}

// Convert ProjectStep to CodeChallenge shape expected by CodeEditor
function stepToChallenge(step: ProjectStep, language: GuidedProjectData['language']): CodeChallenge {
  return {
    id: step.id,
    title: step.title,
    description: step.description,
    language,
    starterCode: step.starterCode,
    solution: step.solution,
    hints: step.hints,
    testCases: step.testCases,
  };
}

function StepCard({
  step,
  index,
  total,
  language,
  isLocked,
  isCompleted,
  isActive,
  onPassed,
  onActivate,
}: {
  step: ProjectStep;
  index: number;
  total: number;
  language: GuidedProjectData['language'];
  isLocked: boolean;
  isCompleted: boolean;
  isActive: boolean;
  onPassed: () => void;
  onActivate: () => void;
}) {
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [revealedHints, setRevealedHints] = useState(0);

  const challenge = stepToChallenge(step, language);

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-colors ${
        isCompleted
          ? 'border-emerald-500/50 bg-card'
          : isActive
          ? 'border-primary/50 bg-card'
          : isLocked
          ? 'border-border/40 bg-muted/30 opacity-70'
          : 'border-border bg-card'
      }`}
    >
      {/* Step header */}
      <button
        onClick={isLocked ? undefined : onActivate}
        disabled={isLocked}
        className={`w-full flex items-center gap-4 p-4 text-left ${isLocked ? 'cursor-not-allowed' : 'hover:bg-muted/30 transition-colors'}`}
      >
        {/* Step number / status icon */}
        <div
          className={`flex items-center justify-center w-9 h-9 rounded-full shrink-0 text-sm font-bold ${
            isCompleted
              ? 'bg-emerald-500/10 text-emerald-500'
              : isLocked
              ? 'bg-muted text-muted-foreground'
              : 'bg-primary/10 text-primary'
          }`}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : isLocked ? (
            <Lock className="w-4 h-4" />
          ) : (
            index + 1
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground font-medium">
              Etapa {index + 1} de {total}
            </span>
            {isCompleted && (
              <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded-full font-medium">
                Concluida
              </span>
            )}
            {isLocked && (
              <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full font-medium">
                Bloqueada
              </span>
            )}
          </div>
          <p className="font-semibold text-foreground mt-0.5">{step.title}</p>
        </div>

        {!isLocked && (
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${isActive ? 'rotate-180' : ''}`}
          />
        )}
      </button>

      {/* Step body */}
      {isActive && !isLocked && (
        <div className="px-4 pb-4 border-t border-border/50 pt-4 space-y-4">
          <p className="text-sm text-muted-foreground">{step.description}</p>

          {/* Editor */}
          <CodeEditor challenge={challenge} onAllTestsPassed={onPassed} />

          {/* Hints */}
          {step.hints.length > 0 && (
            <div>
              <button
                onClick={() => {
                  setShowHints(!showHints);
                  if (!showHints && revealedHints === 0) setRevealedHints(1);
                }}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${showHints ? 'rotate-180' : ''}`} />
                {showHints ? 'Esconder dicas' : 'Precisa de uma dica?'}
              </button>
              {showHints && (
                <div className="mt-2 space-y-2">
                  {step.hints.slice(0, revealedHints).map((hint, i) => (
                    <div key={i} className="text-sm bg-amber-500/5 border-l-2 border-amber-500 pl-3 py-1 text-foreground/80">
                      <span className="font-medium text-amber-600 dark:text-amber-400">Dica {i + 1}:</span>{' '}{hint}
                    </div>
                  ))}
                  {revealedHints < step.hints.length && (
                    <button
                      onClick={() => setRevealedHints((p) => p + 1)}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Revelar mais uma dica ({revealedHints}/{step.hints.length})
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Solution toggle */}
          <div>
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
            >
              {showSolution ? <><EyeOff className="w-4 h-4" /> Esconder solucao</> : <><Eye className="w-4 h-4" /> Ver solucao</>}
            </button>
            {showSolution && (
              <div className="mt-3">
                <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1 uppercase tracking-wide">Solucao</p>
                <CodeBlock code={step.solution} language={language} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Completed step: show unlock-next indicator */}
      {isCompleted && index < total - 1 && (
        <div className="px-4 pb-3 pt-0 flex items-center gap-2 text-xs text-emerald-500">
          <Unlock className="w-3 h-3" />
          Proxima etapa desbloqueada
          <ArrowRight className="w-3 h-3" />
        </div>
      )}
    </div>
  );
}

export default function GuidedProject({ project, onCompleted }: GuidedProjectProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [activeStep, setActiveStep] = useState<string>(project.steps[0]?.id ?? '');
  const [projectDone, setProjectDone] = useState(false);

  const handleStepPassed = useCallback(
    (stepId: string, stepIndex: number) => {
      setCompletedSteps((prev) => {
        const next = new Set(prev);
        next.add(stepId);

        const allDone = project.steps.every((s) => next.has(s.id));
        if (allDone && !projectDone) {
          setProjectDone(true);
          onCompleted?.();
        } else {
          // Auto-open next step
          const nextStep = project.steps[stepIndex + 1];
          if (nextStep) {
            setTimeout(() => setActiveStep(nextStep.id), 600);
          }
        }

        return next;
      });
    },
    [project.steps, projectDone, onCompleted]
  );

  const completedCount = completedSteps.size;
  const totalSteps = project.steps.length;
  const progressPct = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Project brief */}
      <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-xl">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg shrink-0">
            <Briefcase className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-400 mb-1">Contexto do projeto</h3>
            <p className="text-sm text-foreground/80 leading-relaxed">{project.scenario}</p>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              <span className="font-medium text-foreground">Objetivo:</span> {project.objective}
            </p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground font-medium">Progresso</span>
          <span className={`font-medium ${projectDone ? 'text-emerald-500' : 'text-foreground'}`}>
            {completedCount}/{totalSteps} etapas — {progressPct}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${projectDone ? 'bg-emerald-500' : 'bg-primary'}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Completion banner */}
      {projectDone && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3">
          <Trophy className="w-7 h-7 text-emerald-400 shrink-0" />
          <div>
            <p className="font-bold text-emerald-400 text-lg">Projeto concluido!</p>
            <p className="text-sm text-muted-foreground">
              Voce completou todas as etapas do projeto. A licao foi marcada como concluida.
            </p>
          </div>
        </div>
      )}

      {/* Steps */}
      <div className="space-y-3">
        {project.steps.map((step, i) => {
          const isCompleted = completedSteps.has(step.id);
          const prevCompleted = i === 0 || completedSteps.has(project.steps[i - 1].id);
          const isLocked = !prevCompleted && !isCompleted;
          const isActive = activeStep === step.id;

          return (
            <StepCard
              key={step.id}
              step={step}
              index={i}
              total={totalSteps}
              language={project.language}
              isLocked={isLocked}
              isCompleted={isCompleted}
              isActive={isActive}
              onPassed={() => handleStepPassed(step.id, i)}
              onActivate={() => setActiveStep(isActive ? '' : step.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
