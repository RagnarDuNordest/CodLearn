'use client';

import { useState, useMemo } from 'react';
import {
  Building2,
  Clock,
  ChevronDown,
  ChevronUp,
  Github,
  CheckCircle2,
  Zap,
  Send,
} from 'lucide-react';
import realProjects, { RealProject, ProjectArea, ProjectLevel } from '@/data/real-projects';

const AREA_LABELS: Record<ProjectArea, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  fullstack: 'Fullstack',
  mobile: 'Mobile',
  dados: 'Dados',
  devops: 'DevOps',
};

const LEVEL_CONFIG: Record<ProjectLevel, { label: string; badgeClass: string }> = {
  junior: { label: 'Júnior', badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  pleno: { label: 'Pleno', badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  senior: { label: 'Sênior', badgeClass: 'bg-red-500/15 text-red-400 border-red-500/30' },
};

function AreaBadge({ area }: { area: ProjectArea }) {
  const label = AREA_LABELS[area];
  return (
    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold border bg-accent/40 text-muted-foreground border-border/60">
      {label}
    </span>
  );
}

function ProjectCard({ project }: { project: RealProject }) {
  const [expanded, setExpanded] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [githubUrl, setGithubUrl] = useState('');
  const level = LEVEL_CONFIG[project.level];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUrl.trim()) return;
    alert(`Projeto "${project.title}" enviado com sucesso!\nURL: ${githubUrl}`);
    setGithubUrl('');
    setShowSubmit(false);
  };

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all duration-200">
      {/* Color bar */}
      <div className="h-1.5 shrink-0" style={{ backgroundColor: project.color }} />

      {/* Card header */}
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <span className="text-3xl shrink-0">{project.emoji}</span>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-foreground text-[15px] leading-snug">{project.title}</h3>
            <div className="flex items-center gap-1.5 mt-0.5 text-[12px] text-muted-foreground">
              <Building2 className="w-3 h-3 shrink-0" />
              <span className="truncate">{project.client}</span>
            </div>
          </div>
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${level.badgeClass}`}>
            {level.label}
          </span>
          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border bg-accent/30 text-muted-foreground border-border/60">
            <Clock className="w-3 h-3" />
            {project.duration}
          </span>
          {project.area.map((a) => (
            <AreaBadge key={a} area={a} />
          ))}
        </div>

        {/* Client bio */}
        <p className="text-xs text-muted-foreground leading-relaxed">{project.clientBio}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-muted/60 text-foreground/70 border border-border/40"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Brief toggle */}
      <div className="border-t border-border/50">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-3 text-xs text-muted-foreground hover:text-foreground hover:bg-accent/20 transition-colors"
        >
          <span className="flex items-center gap-1.5 font-medium">
            <Building2 className="w-3.5 h-3.5" />
            {expanded ? 'Ocultar brief completo' : 'Ver brief completo'}
          </span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {expanded && (
          <div className="px-5 pb-5 space-y-4 border-t border-border/30">
            {/* Problem */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                Problema do cliente
              </p>
              <p className="text-xs text-foreground/85 leading-relaxed">{project.problem}</p>
            </div>

            {/* Requirements */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Requisitos funcionais
              </p>
              <ul className="space-y-1.5">
                {project.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-foreground/80 leading-relaxed">
                    <span className="shrink-0 w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[9px] font-bold mt-0.5">
                      {i + 1}
                    </span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Non-functional */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2 flex items-center gap-1">
                <Zap className="w-3 h-3" /> Requisitos não-funcionais
              </p>
              <ul className="space-y-1.5">
                {project.nonFunctional.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                    <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400/60" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Acceptance Criteria */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Critérios de aceitação
              </p>
              <ul className="space-y-1.5">
                {project.acceptanceCriteria.map((crit, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-foreground/80 leading-relaxed">
                    <CheckCircle2 className="w-3 h-3 shrink-0 text-emerald-400/70 mt-0.5" />
                    {crit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bonus */}
            {project.bonus && project.bonus.length > 0 && (
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3">
                <p className="text-[10px] uppercase tracking-wider text-amber-400/80 font-semibold mb-2 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Bônus (opcional)
                </p>
                <ul className="space-y-1.5">
                  {project.bonus.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-amber-200/70 leading-relaxed">
                      <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400/60" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Submit section */}
      <div className="border-t border-border/50 p-4">
        {!showSubmit ? (
          <button
            onClick={() => setShowSubmit(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary/10 text-primary border border-primary/20 rounded-xl text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            Submeter projeto
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="relative">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="url"
                placeholder="https://github.com/seu-usuario/repositorio"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                autoFocus
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={!githubUrl.trim()}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-3 h-3" />
                Enviar
              </button>
              <button
                type="button"
                onClick={() => { setShowSubmit(false); setGithubUrl(''); }}
                className="px-4 py-2 bg-accent/50 text-muted-foreground rounded-xl text-xs font-medium hover:bg-accent transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const ALL_AREAS: (ProjectArea | 'todos')[] = ['todos', 'frontend', 'backend', 'fullstack', 'mobile', 'dados', 'devops'];
const ALL_LEVELS: (ProjectLevel | 'todos')[] = ['todos', 'junior', 'pleno', 'senior'];

export default function ProjetosReaisPage() {
  const [activeArea, setActiveArea] = useState<ProjectArea | 'todos'>('todos');
  const [activeLevel, setActiveLevel] = useState<ProjectLevel | 'todos'>('todos');

  const filtered = useMemo(() => {
    return realProjects.filter((p) => {
      const matchArea = activeArea === 'todos' || p.area.includes(activeArea);
      const matchLevel = activeLevel === 'todos' || p.level === activeLevel;
      return matchArea && matchLevel;
    });
  }, [activeArea, activeLevel]);

  const availableAreas = useMemo(() => {
    const set = new Set<ProjectArea>();
    realProjects.forEach((p) => p.area.forEach((a) => set.add(a)));
    return set.size;
  }, []);

  return (
    <div className="w-full pb-16">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🏢</span>
          <h1 className="text-3xl font-bold">Projetos Reais</h1>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Briefs escritos como pedidos reais de clientes. Leia, interprete e construa — sem tutorial, sem passo a passo.
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 rounded-2xl border border-border bg-card">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">{realProjects.length}</span>
          <span className="text-sm text-muted-foreground">projetos disponíveis</span>
        </div>
        <div className="w-px bg-border hidden sm:block" />
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">{availableAreas}</span>
          <span className="text-sm text-muted-foreground">áreas cobertas</span>
        </div>
        <div className="w-px bg-border hidden sm:block" />
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-amber-400">{realProjects.filter((p) => p.bonus).length}</span>
          <span className="text-sm text-muted-foreground">com desafios bônus</span>
        </div>
      </div>

      {/* Area filter */}
      <div className="mb-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Área</p>
        <div className="flex flex-wrap gap-2">
          {ALL_AREAS.map((area) => (
            <button
              key={area}
              onClick={() => setActiveArea(area)}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-medium border transition-all ${
                activeArea === area
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {area === 'todos' ? 'Todos' : AREA_LABELS[area]}
            </button>
          ))}
        </div>
      </div>

      {/* Level filter */}
      <div className="mb-8">
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Nível</p>
        <div className="flex flex-wrap gap-2">
          {ALL_LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => setActiveLevel(level)}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-medium border transition-all ${
                activeLevel === level
                  ? level === 'todos'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : level === 'junior'
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    : level === 'pleno'
                    ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                    : 'bg-red-500/15 text-red-400 border-red-500/30'
                  : 'bg-card border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {level === 'todos' ? 'Todos os níveis' : LEVEL_CONFIG[level].label}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      {(activeArea !== 'todos' || activeLevel !== 'todos') && (
        <p className="text-sm text-muted-foreground mb-4">
          {filtered.length} projeto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-lg font-semibold mb-2">Nenhum projeto encontrado</p>
          <p className="text-sm text-muted-foreground mb-4">Tente outros filtros.</p>
          <button
            onClick={() => { setActiveArea('todos'); setActiveLevel('todos'); }}
            className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
