'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Search, Lightbulb, Tag, BookOpen, AlertCircle, Play } from 'lucide-react';
import exerciseData, { Exercise, Difficulty, ExampleCase } from '@/data/exercises';

const DIFF_CONFIG: Record<Difficulty, { label: string; badgeClass: string }> = {
  iniciante:     { label: 'Iniciante',     badgeClass: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' },
  intermediario: { label: 'Intermediário', badgeClass: 'bg-amber-500/15 text-amber-400 border border-amber-500/30' },
  avancado:      { label: 'Avançado',      badgeClass: 'bg-red-500/15 text-red-400 border border-red-500/30' },
};

const SORTED_SUBJECTS = [...exerciseData].sort((a, b) => a.order - b.order);

function ExampleBlock({ ex, index }: { ex: ExampleCase; index: number }) {
  return (
    <div className="rounded-lg overflow-hidden border border-border/50 text-xs font-mono">
      <div className="bg-muted/30 px-3 py-1.5 text-muted-foreground font-sans text-[11px] font-semibold tracking-wide">
        Exemplo {index + 1}
      </div>
      <div className="p-3 space-y-2 bg-background/40">
        <div className="flex gap-2">
          <span className="text-muted-foreground shrink-0 w-14">Entrada:</span>
          <pre className="text-foreground whitespace-pre-wrap">{ex.input}</pre>
        </div>
        <div className="flex gap-2">
          <span className="text-muted-foreground shrink-0 w-14">Saída:</span>
          <pre className="text-emerald-400 whitespace-pre-wrap">{ex.output}</pre>
        </div>
        {ex.explanation && (
          <div className="flex gap-2 pt-1 border-t border-border/30">
            <span className="text-muted-foreground shrink-0 w-14 font-sans">Exp.:</span>
            <span className="text-muted-foreground font-sans leading-relaxed">{ex.explanation}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ExerciseCard({ ex, subject }: { ex: Exercise; subject: typeof exerciseData[0] }) {
  const [open, setOpen] = useState(false);
  const d = DIFF_CONFIG[ex.difficulty];

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-200 overflow-hidden">
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-bold text-foreground leading-snug text-[15px]">{ex.title}</h3>
          <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${d.badgeClass}`}>
            {d.label}
          </span>
        </div>

        {/* Tags */}
        {ex.tags && ex.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {ex.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-accent/50 rounded text-[10px] text-muted-foreground border border-border/50">
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">{ex.description}</p>
      </div>

      {/* Quick example (primeiro exemplo sempre visível) */}
      {ex.examples.length > 0 && (
        <div className="px-5 pb-3">
          <ExampleBlock ex={ex.examples[0]} index={0} />
        </div>
      )}

      {/* Expandable details */}
      <div className="border-t border-border/50 mt-auto">
        <button
          onClick={() => setOpen(v => !v)}
          className="w-full flex items-center justify-between px-5 py-3 text-xs text-muted-foreground hover:text-foreground hover:bg-accent/20 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            {open ? 'Ocultar detalhes' : `Ver detalhes completos${ex.examples.length > 1 ? ` (+ ${ex.examples.length - 1} exemplos)` : ''}`}
          </span>
          {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {open && (
          <div className="px-5 pb-5 space-y-4 border-t border-border/30">
            {/* Formato de entrada/saída */}
            {(ex.inputFormat || ex.outputFormat) && (
              <div className="grid grid-cols-2 gap-3">
                {ex.inputFormat && (
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1.5">Formato de entrada</p>
                    <p className="text-xs text-foreground/80 leading-relaxed">{ex.inputFormat}</p>
                  </div>
                )}
                {ex.outputFormat && (
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1.5">Formato de saída</p>
                    <p className="text-xs text-foreground/80 leading-relaxed">{ex.outputFormat}</p>
                  </div>
                )}
              </div>
            )}

            {/* Constraints */}
            {ex.constraints && ex.constraints.length > 0 && (
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Restrições
                </p>
                <ul className="space-y-1">
                  {ex.constraints.map((c, i) => (
                    <li key={i} className="text-xs text-foreground/70 font-mono flex items-start gap-2">
                      <span className="text-muted-foreground shrink-0">•</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exemplos restantes */}
            {ex.examples.length > 1 && (
              <div className="space-y-2">
                {ex.examples.slice(1).map((e, i) => (
                  <ExampleBlock key={i} ex={e} index={i + 1} />
                ))}
              </div>
            )}

            {/* Notas */}
            {ex.notes && (
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg px-3 py-2.5 text-xs text-blue-300/80 leading-relaxed">
                📌 {ex.notes}
              </div>
            )}

            {/* Dica */}
            {ex.hint && (
              <div className="flex items-start gap-2 bg-amber-500/5 border border-amber-500/20 rounded-lg px-3 py-2.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-200/70 leading-relaxed font-mono whitespace-pre-wrap">{ex.hint}</p>
              </div>
            )}

            {/* Assunto + Resolver */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-border/20">
              <div className="flex items-center gap-2">
                <span className="text-lg">{subject.emoji}</span>
                <span className="text-xs text-muted-foreground">{subject.label}</span>
              </div>
              <Link
                href={`/exercicios/${ex.id}`}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors"
              >
                <Play className="w-3 h-3" />
                Resolver
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Botão Resolver sempre visível no bottom */}
      {!open && (
        <div className="px-5 pb-4">
          <Link
            href={`/exercicios/${ex.id}`}
            className="flex items-center justify-center gap-2 w-full py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Play className="w-3 h-3" />
            Resolver exercício
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ExerciciosPage() {
  const [search, setSearch] = useState('');
  const [activeDiff, setActiveDiff] = useState<Difficulty | 'todos'>('todos');
  const [activeModule, setActiveModule] = useState<string>('todos');

  const allExercises = useMemo(() =>
    SORTED_SUBJECTS.flatMap(s => s.exercises.map(ex => ({ ex, subject: s }))),
  []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return allExercises.filter(({ ex, subject }) => {
      const matchDiff   = activeDiff === 'todos' || ex.difficulty === activeDiff;
      const matchModule = activeModule === 'todos' || subject.moduleId === activeModule;
      const matchSearch = !q ||
        ex.title.toLowerCase().includes(q) ||
        ex.description.toLowerCase().includes(q) ||
        (ex.tags ?? []).some(t => t.toLowerCase().includes(q));
      return matchDiff && matchModule && matchSearch;
    });
  }, [search, activeDiff, activeModule, allExercises]);

  const countByDiff = useMemo(() => ({
    iniciante:     allExercises.filter(({ex}) => ex.difficulty === 'iniciante').length,
    intermediario: allExercises.filter(({ex}) => ex.difficulty === 'intermediario').length,
    avancado:      allExercises.filter(({ex}) => ex.difficulty === 'avancado').length,
  }), [allExercises]);

  return (
    <div className="w-full pb-16">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">💪</span>
          <h1 className="text-3xl font-bold">Exercícios</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          {SORTED_SUBJECTS.length} módulos ·{' '}
          <span className="text-emerald-400">{countByDiff.iniciante} iniciante</span> ·{' '}
          <span className="text-amber-400">{countByDiff.intermediario} intermediário</span> ·{' '}
          <span className="text-red-400">{countByDiff.avancado} avançado</span>
        </p>
      </div>

      {/* Busca */}
      <div className="relative mb-4">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar por título, descrição ou tag..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Filtro de dificuldade */}
      <div className="flex gap-2 flex-wrap mb-4">
        {(['todos', 'iniciante', 'intermediario', 'avancado'] as const).map(d => {
          const active = activeDiff === d;
          const cfg = d !== 'todos' ? DIFF_CONFIG[d] : null;
          return (
            <button
              key={d}
              onClick={() => setActiveDiff(d)}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium border transition-all ${
                active
                  ? cfg ? cfg.badgeClass : 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {d === 'todos' ? 'Todos os níveis' : DIFF_CONFIG[d].label}
            </button>
          );
        })}
      </div>

      {/* Pills de assunto em ordem de aprendizado */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveModule('todos')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
            activeModule === 'todos'
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-card border-border text-muted-foreground hover:text-foreground'
          }`}
        >
          Todos os temas
        </button>
        {SORTED_SUBJECTS.map(s => (
          <button
            key={s.moduleId}
            onClick={() => setActiveModule(s.moduleId)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              activeModule === s.moduleId
                ? 'text-white border-transparent'
                : 'bg-card border-border text-muted-foreground hover:text-foreground'
            }`}
            style={activeModule === s.moduleId ? { backgroundColor: s.color } : {}}
          >
            <span>{s.emoji}</span>
            <span>{s.label}</span>
            <span className="opacity-60 ml-0.5">({s.exercises.length})</span>
          </button>
        ))}
      </div>

      {/* Resultado da busca */}
      {search || activeDiff !== 'todos' || activeModule !== 'todos' ? (
        <p className="text-sm text-muted-foreground mb-4">
          {filtered.length} exercício{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
        </p>
      ) : null}

      {/* Grid de exercícios */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-lg font-semibold mb-2">Nenhum exercício encontrado</p>
          <p className="text-sm text-muted-foreground mb-4">Tente outros termos ou remova os filtros.</p>
          <button
            onClick={() => { setActiveDiff('todos'); setActiveModule('todos'); setSearch(''); }}
            className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(({ ex, subject }) => (
            <ExerciseCard key={ex.id} ex={ex} subject={subject} />
          ))}
        </div>
      )}
    </div>
  );
}
