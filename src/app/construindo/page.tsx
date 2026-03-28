'use client';

import { useState } from 'react';
import {
  Hammer,
  Bug,
  RefreshCw,
  Layers,
  Plug,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import buildingProjects from '@/data/building-projects';
import type {
  BuildingProject,
  ProjectStep,
  StepType,
  ProjectDifficulty,
  CodeBlock,
} from '@/data/building-projects';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function difficultyLabel(d: ProjectDifficulty): string {
  const map: Record<ProjectDifficulty, string> = {
    iniciante: 'Iniciante',
    basico: 'Basico',
    intermediario: 'Intermediario',
    avancado: 'Avancado',
  };
  return map[d];
}

function difficultyClasses(d: ProjectDifficulty): string {
  const map: Record<ProjectDifficulty, string> = {
    iniciante: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    basico: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    intermediario: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    avancado: 'bg-red-500/15 text-red-400 border-red-500/30',
  };
  return map[d];
}

function stepTypeClasses(t: StepType): string {
  const map: Record<StepType, string> = {
    code: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    bug: 'bg-red-500/15 text-red-400 border-red-500/30',
    refactor: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    architecture: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    integration: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
  };
  return map[t];
}

function stepTypeLabel(t: StepType): string {
  const map: Record<StepType, string> = {
    code: 'Codigo',
    bug: 'Bug',
    refactor: 'Refatoracao',
    architecture: 'Arquitetura',
    integration: 'Integracao',
  };
  return map[t];
}

function StepIcon({ type }: { type: StepType }) {
  const cls = 'h-4 w-4';
  switch (type) {
    case 'code':
      return <Hammer className={cls} />;
    case 'bug':
      return <Bug className={cls} />;
    case 'refactor':
      return <RefreshCw className={cls} />;
    case 'architecture':
      return <Layers className={cls} />;
    case 'integration':
      return <Plug className={cls} />;
  }
}

function timelineLineColor(t: StepType): string {
  const map: Record<StepType, string> = {
    code: 'bg-blue-500',
    bug: 'bg-red-500',
    refactor: 'bg-purple-500',
    architecture: 'bg-orange-500',
    integration: 'bg-teal-500',
  };
  return map[t];
}

// ─────────────────────────────────────────────────────────────────────────────
// Code Block Component
// ─────────────────────────────────────────────────────────────────────────────

interface CodeDisplayProps {
  block: CodeBlock;
  headerLabel?: string;
  headerVariant?: 'default' | 'bug' | 'fix';
}

function CodeDisplay({ block, headerLabel, headerVariant = 'default' }: CodeDisplayProps) {
  const headerClasses: Record<NonNullable<CodeDisplayProps['headerVariant']>, string> = {
    default: 'bg-zinc-700 text-zinc-200',
    bug: 'bg-red-900/60 text-red-300',
    fix: 'bg-emerald-900/60 text-emerald-300',
  };

  return (
    <div className="rounded-lg overflow-hidden border border-border text-sm">
      <div className={`flex items-center justify-between px-4 py-2 ${headerClasses[headerVariant ?? 'default']}`}>
        <span className="font-mono text-xs">{block.filename}</span>
        {headerLabel && (
          <span className="text-xs font-medium uppercase tracking-wide">{headerLabel}</span>
        )}
      </div>
      <pre className="bg-zinc-900 text-zinc-100 p-4 overflow-x-auto leading-relaxed">
        <code className="font-mono text-xs">{block.code}</code>
      </pre>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step Component
// ─────────────────────────────────────────────────────────────────────────────

function ProjectStepCard({ step, isLast }: { step: ProjectStep; isLast: boolean }) {
  const dotColor = timelineLineColor(step.type);

  return (
    <div className="relative flex gap-4">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 z-10 border-2 border-background ${dotColor}`}
        >
          <span className="text-white text-xs font-bold">{step.order}</span>
        </div>
        {!isLast && <div className={`w-0.5 flex-1 mt-1 ${dotColor} opacity-30`} />}
      </div>

      {/* Step content */}
      <div className="flex-1 pb-8">
        {/* Step header */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-medium ${stepTypeClasses(step.type)}`}
          >
            <StepIcon type={step.type} />
            {stepTypeLabel(step.type)}
          </span>
          <h3 className="font-semibold text-foreground text-base">{step.title}</h3>
        </div>

        {/* Context */}
        <p className="text-muted-foreground text-sm mb-3 italic">{step.context}</p>

        {/* Objective */}
        <p className="text-sm text-foreground mb-4">
          <span className="font-medium text-muted-foreground">Objetivo: </span>
          {step.objective}
        </p>

        {/* Concepts */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {step.concepts.map((c) => (
            <span
              key={c}
              className="px-2 py-0.5 rounded-md bg-accent text-accent-foreground text-xs border border-border"
            >
              {c}
            </span>
          ))}
        </div>

        {/* Bug flow */}
        {step.type === 'bug' && (
          <div className="space-y-3">
            {step.bugCode && (
              <CodeDisplay
                block={step.bugCode}
                headerLabel="Codigo com Bug"
                headerVariant="bug"
              />
            )}
            {step.bugDescription && (
              <div className="flex gap-2 items-start p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm">
                <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span className="text-red-300 font-mono text-xs">{step.bugDescription}</span>
              </div>
            )}
            {step.fixedCode && (
              <CodeDisplay
                block={step.fixedCode}
                headerLabel="Correcao"
                headerVariant="fix"
              />
            )}
            {step.bugLesson && (
              <div className="flex gap-2 items-start p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm">
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-amber-300 font-semibold text-xs block mb-0.5">
                    Licao aprendida
                  </span>
                  <span className="text-amber-200 text-xs">{step.bugLesson}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Code/Refactor/Architecture/Integration flow */}
        {step.type !== 'bug' && step.code && (
          <CodeDisplay block={step.code} />
        )}

        {/* Checkpoint */}
        <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-emerald-400 font-semibold text-xs block mb-0.5">Checkpoint</span>
            <span className="text-emerald-300 text-sm">{step.checkpoint}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Project Card Component
// ─────────────────────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: BuildingProject }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden transition-all duration-200">
      {/* Card header — always visible */}
      <button
        className="w-full text-left p-6 hover:bg-accent/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Title row */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-foreground">{project.title}</h2>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-medium ${difficultyClasses(project.difficulty)}`}
              >
                {difficultyLabel(project.difficulty)}
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-muted-foreground text-sm mb-3">{project.subtitle}</p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {project.totalTime}
              </span>
              <span>{project.steps.length} etapas</span>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.techStack.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs border border-primary/20 font-mono"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* What you'll learn preview */}
            <div className="flex flex-wrap gap-1.5">
              {project.whatYoullLearn.slice(0, 4).map((item) => (
                <span
                  key={item}
                  className="px-2 py-0.5 rounded-md bg-accent text-accent-foreground text-xs border border-border"
                >
                  {item}
                </span>
              ))}
              {project.whatYoullLearn.length > 4 && (
                <span className="px-2 py-0.5 text-xs text-muted-foreground">
                  +{project.whatYoullLearn.length - 4} mais
                </span>
              )}
            </div>
          </div>

          {/* Expand toggle */}
          <div className="shrink-0 mt-1">
            {expanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </button>

      {/* Expanded: description + steps timeline */}
      {expanded && (
        <div className="border-t border-border px-6 pt-5 pb-6">
          {/* Description */}
          <p className="text-muted-foreground text-sm mb-6">{project.description}</p>

          {/* Steps timeline */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
              Etapas do Projeto
            </h3>
            <div className="space-y-0">
              {project.steps.map((step, idx) => (
                <ProjectStepCard
                  key={step.id}
                  step={step}
                  isLast={idx === project.steps.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function ConstruindoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <Hammer className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Construindo Projetos</h1>
          </div>
          <p className="text-muted-foreground text-base max-w-2xl">
            Aprenda programacao construindo projetos reais de forma progressiva — partindo de
            scripts minimos e evoluindo com bugs reais, decisoes de arquitetura, chamadas de API e
            uso de banco de dados.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-4 mt-5">
            {[
              { label: 'Projetos', value: buildingProjects.length.toString() },
              {
                label: 'Etapas no total',
                value: buildingProjects.reduce((acc, p) => acc + p.steps.length, 0).toString(),
              },
              {
                label: 'Bugs para corrigir',
                value: buildingProjects
                  .reduce(
                    (acc, p) => acc + p.steps.filter((s) => s.type === 'bug').length,
                    0
                  )
                  .toString(),
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="px-4 py-2 rounded-lg bg-card border border-border text-sm"
              >
                <span className="font-bold text-foreground">{stat.value}</span>
                <span className="text-muted-foreground ml-1.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Project cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {buildingProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
