'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Tag, CheckCircle2, Circle } from 'lucide-react';
import projects, { Project, ProjectDifficulty } from '@/data/projects';

const DIFF_CONFIG: Record<ProjectDifficulty, { label: string; badge: string }> = {
  iniciante:     { label: 'Iniciante',     badge: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' },
  intermediario: { label: 'Intermediário', badge: 'bg-amber-500/15 text-amber-400 border border-amber-500/30' },
  avancado:      { label: 'Avançado',      badge: 'bg-red-500/15 text-red-400 border border-red-500/30' },
};

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState<Set<number>>(new Set());
  const d = DIFF_CONFIG[project.difficulty];

  const toggleStep = (i: number) => {
    setDone(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const progress = done.size / project.steps.length;

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all duration-200">
      {/* Color bar */}
      <div className="h-1.5" style={{ backgroundColor: project.color }} />

      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">{project.emoji}</span>
            <div>
              <h3 className="font-bold text-foreground text-[15px] leading-snug">{project.title}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${d.badge}`}>{d.label}</span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {project.duration}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs text-muted-foreground mb-1">{done.size}/{project.steps.length} etapas</div>
            <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress * 100}%`, backgroundColor: project.color }} />
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{project.description}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {project.skills.map(skill => (
            <span key={skill} className="flex items-center gap-1 px-2 py-0.5 bg-accent/40 rounded text-[10px] text-muted-foreground border border-border/50">
              <Tag className="w-2.5 h-2.5" />
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Toggle etapas */}
      <div className="border-t border-border/50">
        <button
          onClick={() => setOpen(v => !v)}
          className="w-full flex items-center justify-between px-5 py-3 text-xs text-muted-foreground hover:text-foreground hover:bg-accent/20 transition-colors"
        >
          <span>{open ? 'Ocultar etapas' : `Ver ${project.steps.length} etapas do projeto`}</span>
          {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {open && (
          <div className="px-5 pb-5 space-y-3 border-t border-border/30">
            {project.steps.map((step, i) => (
              <div
                key={i}
                className={`rounded-xl border p-4 transition-all cursor-pointer ${done.has(i) ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-border/50 hover:border-border'}`}
                onClick={() => toggleStep(i)}
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">
                    {done.has(i)
                      ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      : <Circle className="w-4 h-4 text-muted-foreground" />
                    }
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] text-muted-foreground font-mono">Etapa {i + 1}</span>
                      <h4 className={`text-sm font-semibold ${done.has(i) ? 'text-emerald-400 line-through' : 'text-foreground'}`}>
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                    {step.code && (
                      <pre className="mt-2 text-[11px] font-mono bg-background/60 rounded-lg p-3 overflow-x-auto text-slate-300 border border-border/30">
                        {step.code}
                      </pre>
                    )}
                    {step.tip && (
                      <p className="mt-2 text-[11px] text-amber-300/70 bg-amber-500/5 border border-amber-500/20 rounded px-2.5 py-1.5">
                        💡 {step.tip}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {done.size === project.steps.length && (
              <div className="text-center py-3 text-emerald-400 text-sm font-semibold">
                🎉 Projeto concluído! Adicione ao seu portfólio.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjetosPage() {
  const [filter, setFilter] = useState<ProjectDifficulty | 'todos'>('todos');

  const filtered = filter === 'todos' ? projects : projects.filter(p => p.difficulty === filter);

  return (
    <div className="w-full pb-16">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🚀</span>
          <h1 className="text-3xl font-bold">Projetos Guiados</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Construa projetos reais passo a passo e monte seu portfólio.{' '}
          <span className="text-foreground font-medium">{projects.length} projetos</span> disponíveis.
        </p>
      </div>

      {/* Filtro */}
      <div className="flex gap-2 flex-wrap mb-8">
        {(['todos', 'iniciante', 'intermediario', 'avancado'] as const).map(d => (
          <button
            key={d}
            onClick={() => setFilter(d)}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium border transition-all ${
              filter === d
                ? d === 'todos' ? 'bg-primary text-primary-foreground border-primary'
                  : d === 'iniciante' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  : d === 'intermediario' ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                  : 'bg-red-500/15 text-red-400 border-red-500/30'
                : 'bg-card border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {d === 'todos' ? 'Todos' : DIFF_CONFIG[d].label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
    </div>
  );
}
