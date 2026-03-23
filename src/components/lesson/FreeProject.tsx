'use client';

import { useState } from 'react';
import { FreeProjectData, CodeChallenge } from '@/types/lesson';
import CodeEditor from './CodeEditor';
import CodeBlock from './CodeBlock';
import { Briefcase, CheckSquare, Trophy, Eye, EyeOff, ChevronDown } from 'lucide-react';

interface FreeProjectProps {
  project: FreeProjectData;
  onCompleted?: () => void;
}

// Wrap FreeProject into CodeChallenge shape for CodeEditor
function projectToChallenge(project: FreeProjectData): CodeChallenge {
  return {
    id: project.id,
    title: project.title,
    description: project.objective,
    language: project.language,
    starterCode: project.starterCode,
    solution: project.solution,
    hints: project.hints,
    testCases: project.testCases,
  };
}

export default function FreeProject({ project, onCompleted }: FreeProjectProps) {
  const [done, setDone] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [revealedHints, setRevealedHints] = useState(0);

  const challenge = projectToChallenge(project);

  const handleAllPassed = () => {
    if (!done) {
      setDone(true);
      onCompleted?.();
    }
  };

  return (
    <div className="space-y-6">
      {/* Scenario card */}
      <div className="p-5 bg-purple-500/5 border border-purple-500/20 rounded-xl">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg shrink-0">
            <Briefcase className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold text-purple-400 mb-1">Contexto do projeto</h3>
            <p className="text-sm text-foreground/80 leading-relaxed">{project.scenario}</p>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              <span className="font-medium text-foreground">Objetivo:</span> {project.objective}
            </p>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="p-4 bg-card border border-border rounded-xl">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-primary" />
          Requisitos do projeto
        </h4>
        <ul className="space-y-2">
          {project.requirements.map((req, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                {i + 1}
              </span>
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* Completion banner */}
      {done && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3">
          <Trophy className="w-7 h-7 text-emerald-400 shrink-0" />
          <div>
            <p className="font-bold text-emerald-400 text-lg">Projeto entregue!</p>
            <p className="text-sm text-muted-foreground">
              Todos os requisitos foram atendidos. A licao foi marcada como concluida.
            </p>
          </div>
        </div>
      )}

      {/* Editor */}
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Sua solucao — sem passo a passo, use o que voce aprendeu!
        </p>
        <CodeEditor challenge={challenge} onAllTestsPassed={handleAllPassed} />
      </div>

      {/* Hints */}
      {project.hints.length > 0 && (
        <div>
          <button
            onClick={() => {
              setShowHints(!showHints);
              if (!showHints && revealedHints === 0) setRevealedHints(1);
            }}
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${showHints ? 'rotate-180' : ''}`} />
            {showHints ? 'Esconder dicas' : 'Travado? Veja uma dica'}
          </button>
          {showHints && (
            <div className="mt-2 space-y-2">
              {project.hints.slice(0, revealedHints).map((hint, i) => (
                <div key={i} className="text-sm bg-amber-500/5 border-l-2 border-amber-500 pl-3 py-1 text-foreground/80">
                  <span className="font-medium text-amber-600 dark:text-amber-400">Dica {i + 1}:</span>{' '}{hint}
                </div>
              ))}
              {revealedHints < project.hints.length && (
                <button
                  onClick={() => setRevealedHints((p) => p + 1)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Revelar mais uma dica ({revealedHints}/{project.hints.length})
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
          className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
        >
          {showSolution ? <><EyeOff className="w-4 h-4" /> Esconder solucao</> : <><Eye className="w-4 h-4" /> Ver solucao de referencia</>}
        </button>
        {showSolution && (
          <div className="mt-3">
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1 uppercase tracking-wide">
              Solucao de referencia
            </p>
            <CodeBlock code={project.solution} language={project.language} />
          </div>
        )}
      </div>
    </div>
  );
}
