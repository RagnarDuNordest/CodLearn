'use client';

import { useState } from 'react';
import { ExternalLink, BookOpen, Video, FileText, Wrench, GraduationCap, Book } from 'lucide-react';
import resourcesData, { ResourceType } from '@/data/resources';

const TYPE_CONFIG: Record<ResourceType, { label: string; icon: React.ReactNode; badge: string }> = {
  video:        { label: 'Vídeo',          icon: <Video className="w-3 h-3" />,         badge: 'bg-red-500/15 text-red-400 border-red-500/30' },
  artigo:       { label: 'Artigo',         icon: <FileText className="w-3 h-3" />,       badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  documentacao: { label: 'Documentação',   icon: <BookOpen className="w-3 h-3" />,       badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
  curso:        { label: 'Curso',          icon: <GraduationCap className="w-3 h-3" />,  badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  ferramenta:   { label: 'Ferramenta',     icon: <Wrench className="w-3 h-3" />,         badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  livro:        { label: 'Livro',          icon: <Book className="w-3 h-3" />,           badge: 'bg-pink-500/15 text-pink-400 border-pink-500/30' },
};

const totalRecursos = resourcesData.reduce((s, m) => s + m.resources.length, 0);

export default function RecursosPage() {
  const [activeModule, setActiveModule] = useState<string>('todos');
  const [activeType, setActiveType] = useState<ResourceType | 'todos'>('todos');

  const modulesToShow = activeModule === 'todos' ? resourcesData : resourcesData.filter(m => m.moduleId === activeModule);

  const filtered = modulesToShow.map(m => ({
    ...m,
    resources: activeType === 'todos' ? m.resources : m.resources.filter(r => r.type === activeType),
  })).filter(m => m.resources.length > 0);

  return (
    <div className="w-full pb-16">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">📚</span>
          <h1 className="text-3xl font-bold">Recursos</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Os melhores materiais da internet, organizados por módulo.{' '}
          <span className="text-foreground font-medium">{totalRecursos} recursos</span> curados.
        </p>
      </div>

      {/* Filtro de tipo */}
      <div className="flex gap-2 flex-wrap mb-4">
        {(['todos', ...Object.keys(TYPE_CONFIG)] as const).map(t => {
          const cfg = t !== 'todos' ? TYPE_CONFIG[t as ResourceType] : null;
          return (
            <button
              key={t}
              onClick={() => setActiveType(t as ResourceType | 'todos')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                activeType === t
                  ? t === 'todos' ? 'bg-primary text-primary-foreground border-primary' : `${cfg?.badge}`
                  : 'bg-card border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {cfg?.icon}
              {t === 'todos' ? 'Todos os tipos' : cfg?.label}
            </button>
          );
        })}
      </div>

      {/* Pills de módulo */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveModule('todos')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
            activeModule === 'todos' ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-muted-foreground hover:text-foreground'
          }`}
        >
          Todos os módulos
        </button>
        {resourcesData.map(m => (
          <button
            key={m.moduleId}
            onClick={() => setActiveModule(m.moduleId)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              activeModule === m.moduleId ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>{m.emoji}</span>
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      {/* Recursos por módulo */}
      <div className="space-y-10">
        {filtered.map(mod => (
          <div key={mod.moduleId}>
            <h2 className="flex items-center gap-2 text-base font-bold mb-4">
              <span className="text-xl">{mod.emoji}</span>
              {mod.label}
              <span className="text-xs font-normal text-muted-foreground">({mod.resources.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {mod.resources.map((r, i) => {
                const cfg = TYPE_CONFIG[r.type];
                return (
                  <a
                    key={i}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex flex-wrap gap-1.5">
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${cfg.badge}`}>
                          {cfg.icon} {cfg.label}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent/50 border border-border text-muted-foreground">
                          {r.language === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}
                        </span>
                        {!r.free && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 border border-amber-500/20 text-amber-400">
                            💳 Pago
                          </span>
                        )}
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                    </div>

                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1 leading-snug">
                      {r.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">{r.description}</p>
                    {r.author && (
                      <p className="text-[10px] text-muted-foreground/60 mt-2 italic">por {r.author}</p>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
