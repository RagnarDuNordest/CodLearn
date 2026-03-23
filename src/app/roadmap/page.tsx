'use client';

import Link from 'next/link';
import { Lock, ChevronRight, Zap } from 'lucide-react';
import { modules } from '@/data/modules';
import { Module } from '@/types/module';
import { getLessonsByModule } from '@/data/lessons';

const MODULE_COLORS: Record<string, string> = {
  intro:      '#0891B2',
  logica:     '#7C3AED',
  linux:      '#4B5563',
  git:        '#F05032',
  python:     '#3572A5',
  c:          '#555555',
  java:       '#B07219',
  estruturas: '#059669',
  algoritmos: '#D97706',
  sql:        '#336791',
  'html-css': '#E44D26',
  frontend:   '#c9a800',
  backend:    '#1D4ED8',
};

const MODULE_SKILLS: Record<string, string[]> = {
  intro:      ['Lógica básica', 'Variáveis', 'Entrada/Saída'],
  logica:     ['Condicionais', 'Loops', 'Funções', 'Recursão'],
  linux:      ['Terminal', 'Shell Script', 'Automação'],
  git:        ['Versionamento', 'Branches', 'Colaboração'],
  python:     ['POO', 'Arquivos', 'Bibliotecas', 'APIs'],
  c:          ['Ponteiros', 'Memória', 'Structs'],
  java:       ['OOP', 'Collections', 'Exceções', 'Streams'],
  estruturas: ['Pilha', 'Fila', 'Árvores', 'Grafos'],
  algoritmos: ['Ordenação', 'Busca', 'DP', 'Grafos'],
  sql:        ['DDL/DML', 'JOINs', 'Índices', 'Transações'],
  'html-css': ['Semântica', 'Flexbox', 'Grid', 'Animações'],
  frontend:   ['DOM', 'Eventos', 'Fetch', 'Async/Await'],
  backend:    ['REST API', 'Banco de Dados', 'Autenticação'],
};

export default function RoadmapPage() {
  const sortedModules = [...modules].sort((a, b) => a.order - b.order);

  return (
    <div className="w-full pb-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🗺️</span>
          <h1 className="text-3xl font-bold">Roadmap</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Sua jornada completa de aprendizado — do zero ao desenvolvedor completo.
        </p>
      </div>

      {/* Trilha */}
      <div className="relative">
        {/* Linha central */}
        <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-border/50 hidden lg:block" />

        <div className="space-y-6">
          {sortedModules.map((mod: Module, idx: number) => {
            const lessons = getLessonsByModule(mod.id);
            const color = MODULE_COLORS[mod.id] ?? '#374151';
            const skills = MODULE_SKILLS[mod.id] ?? [];
            const isLeft = idx % 2 === 0;
            const isUnlocked = mod.order <= 3; // primeiros 4 são desbloqueados

            return (
              <div key={mod.id} className="relative">
                {/* Ponto na linha central */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-background z-10 hidden lg:block"
                  style={{ backgroundColor: color }}
                />

                <div className={`lg:w-[46%] ${isLeft ? 'lg:ml-0 lg:mr-auto' : 'lg:ml-auto lg:mr-0'}`}>
                  <div
                    className={`group rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-200 ${
                      isUnlocked ? 'border-border hover:border-primary/30' : 'border-border/40 opacity-70'
                    }`}
                  >
                    {/* Color bar */}
                    <div className="h-1" style={{ backgroundColor: color }} />

                    <div className="p-5 bg-card">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                            style={{ backgroundColor: `${color}20` }}
                          >
                            {isUnlocked ? '🔓' : <Lock className="w-5 h-5 text-muted-foreground" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-muted-foreground font-mono">#{String(mod.order + 1).padStart(2, '0')}</span>
                              {mod.order === 0 && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-primary/20 text-primary uppercase tracking-wider">Começo aqui</span>
                              )}
                            </div>
                            <h3 className="font-bold text-foreground text-[15px]">{mod.title}</h3>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-[10px] text-muted-foreground">{lessons.length} lições</div>
                          <div className="text-xs font-semibold text-muted-foreground">0%</div>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">{mod.description}</p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {skills.map(skill => (
                          <span key={skill} className="px-2 py-0.5 rounded text-[10px] text-muted-foreground bg-accent/40 border border-border/40">
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Progress bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                          <span>Progresso</span>
                          <span>0/{lessons.length} lições</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: '0%', backgroundColor: color }} />
                        </div>
                      </div>

                      <Link
                        href={isUnlocked ? `/modulo/${mod.id}` : '#'}
                        className={`flex items-center justify-center gap-2 w-full py-2 rounded-xl text-sm font-medium transition-all ${
                          isUnlocked
                            ? 'text-white hover:brightness-110'
                            : 'bg-muted text-muted-foreground cursor-not-allowed'
                        }`}
                        style={isUnlocked ? { backgroundColor: color } : {}}
                      >
                        {isUnlocked ? (
                          <>
                            <Zap className="w-3.5 h-3.5" />
                            Começar módulo
                            <ChevronRight className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <Lock className="w-3.5 h-3.5" />
                            Complete os anteriores
                          </>
                        )}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Connector arrow for mobile */}
                {idx < sortedModules.length - 1 && (
                  <div className="flex justify-center mt-3 lg:hidden">
                    <ChevronRight className="w-5 h-5 text-muted-foreground rotate-90" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Final */}
        <div className="flex flex-col items-center justify-center mt-10 gap-3">
          <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-3xl">
            🏆
          </div>
          <p className="text-center font-bold text-foreground">Desenvolvedor Full Stack</p>
          <p className="text-center text-xs text-muted-foreground max-w-xs">
            Complete todos os módulos e você terá as habilidades para criar aplicações completas do zero.
          </p>
        </div>
      </div>
    </div>
  );
}
