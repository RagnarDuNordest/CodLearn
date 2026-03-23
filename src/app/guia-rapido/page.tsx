'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import cheatsheets, { Cheatsheet } from '@/data/cheatsheets';

const TOPIC_META: Record<string, { emoji: string; bg: string; label: string }> = {
  python:               { emoji: '🐍', bg: '#3572A5', label: 'Python' },
  frontend:             { emoji: '⚡', bg: '#c9a800', label: 'JavaScript' },
  'html-css':           { emoji: '🌐', bg: '#E44D26', label: 'HTML & CSS' },
  sql:                  { emoji: '🗄️', bg: '#336791', label: 'SQL' },
  git:                  { emoji: '🌿', bg: '#F05032', label: 'Git' },
  linux:                { emoji: '🐧', bg: '#4B5563', label: 'Linux' },
  logica:               { emoji: '🧠', bg: '#7C3AED', label: 'Lógica' },
  intro:                { emoji: '📘', bg: '#0891B2', label: 'Fundamentos' },
  c:                    { emoji: '⚙️', bg: '#555555', label: 'Linguagem C' },
  java:                 { emoji: '☕', bg: '#B07219', label: 'Java' },
  'estruturas-de-dados':{ emoji: '🏗️', bg: '#059669', label: 'Estruturas de Dados' },
  algoritmos:           { emoji: '🔢', bg: '#D97706', label: 'Algoritmos' },
  backend:              { emoji: '🖥️', bg: '#1D4ED8', label: 'Backend' },
};

const GROUPS: { label: string; ids: string[] }[] = [
  { label: 'Web',         ids: ['python', 'frontend', 'html-css', 'sql', 'backend'] },
  { label: 'Linguagens',  ids: ['c', 'java'] },
  { label: 'Ferramentas', ids: ['git', 'linux'] },
  { label: 'CS',          ids: ['estruturas-de-dados', 'algoritmos', 'logica', 'intro'] },
];

function TopicCard({ sheet }: { sheet: Cheatsheet }) {
  const meta = TOPIC_META[sheet.moduleId] ?? { emoji: '📄', bg: '#374151', label: sheet.title };
  const totalExemplos = sheet.entries.filter(e => e.example).length;
  const totalRefs     = sheet.entries.filter(e => e.items).length;

  return (
    <Link
      href={`/guia-rapido/${sheet.moduleId}`}
      style={{ backgroundColor: meta.bg }}
      className="group flex items-center gap-3 px-5 py-4 rounded-xl text-white font-semibold hover:brightness-110 hover:scale-[1.03] active:scale-[0.98] transition-all duration-150 shadow-md hover:shadow-lg"
    >
      <span className="text-2xl leading-none">{meta.emoji}</span>
      <div className="min-w-0">
        <div className="text-base font-semibold">{meta.label}</div>
        <div className="text-[11px] opacity-70 font-normal">
          {sheet.entries.length} cards
          {totalExemplos > 0 && ` · ${totalExemplos} exemplos`}
          {totalRefs > 0 && ` · ${totalRefs} tabelas`}
        </div>
      </div>
    </Link>
  );
}

export default function GuiaRapidoPage() {
  const [search, setSearch] = useState('');

  const filteredSheets = useMemo(() => {
    if (!search.trim()) return cheatsheets;
    const q = search.toLowerCase();
    return cheatsheets.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.moduleId.toLowerCase().includes(q) ||
        (TOPIC_META[s.moduleId]?.label ?? '').toLowerCase().includes(q) ||
        s.entries.some((e) => e.category.toLowerCase().includes(q))
    );
  }, [search]);

  const getSheet = (id: string) => filteredSheets.find((s) => s.moduleId === id);
  const isFiltering = search.trim().length > 0;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">📖</span>
          <h1 className="text-3xl font-bold">Guia Rápido</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Referência de sintaxe e comandos.{' '}
          <span className="text-foreground font-medium">{cheatsheets.length} tópicos</span> ·{' '}
          <span className="text-foreground font-medium">
            {cheatsheets.reduce((s, c) => s + c.entries.length, 0)} cards
          </span>
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-10">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar... ex: loops, SELECT, branch, git"
          className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground">
            limpar
          </button>
        )}
      </div>

      {/* Content */}
      {isFiltering ? (
        filteredSheets.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filteredSheets.map((sheet) => <TopicCard key={sheet.moduleId} sheet={sheet} />)}
          </div>
        ) : (
          <p className="text-center py-16 text-muted-foreground text-sm">Nenhum tópico encontrado para "{search}"</p>
        )
      ) : (
        <div className="space-y-10">
          {GROUPS.map((group) => {
            const sheets = group.ids.map(getSheet).filter(Boolean) as Cheatsheet[];
            if (sheets.length === 0) return null;
            return (
              <div key={group.label}>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  {group.label}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {sheets.map((sheet) => <TopicCard key={sheet.moduleId} sheet={sheet} />)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
