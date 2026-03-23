'use client';

import { use, useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Copy, Check } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';
import { getCheatsheetByModuleId, CheatsheetEntry } from '@/data/cheatsheets';
import { notFound } from 'next/navigation';

const TOPIC_META: Record<string, { emoji: string; bg: string; label: string; prismLang: string }> = {
  python:               { emoji: '🐍', bg: '#3572A5', label: 'Python',              prismLang: 'python' },
  frontend:             { emoji: '⚡', bg: '#c9a800', label: 'JavaScript',          prismLang: 'javascript' },
  'html-css':           { emoji: '🌐', bg: '#E44D26', label: 'HTML & CSS',          prismLang: 'css' },
  sql:                  { emoji: '🗄️', bg: '#336791', label: 'SQL',                 prismLang: 'sql' },
  git:                  { emoji: '🌿', bg: '#F05032', label: 'Git',                 prismLang: 'bash' },
  linux:                { emoji: '🐧', bg: '#4B5563', label: 'Linux',               prismLang: 'bash' },
  logica:               { emoji: '🧠', bg: '#7C3AED', label: 'Lógica',              prismLang: 'plain' },
  intro:                { emoji: '📘', bg: '#0891B2', label: 'Fundamentos',         prismLang: 'plain' },
  c:                    { emoji: '⚙️', bg: '#555555', label: 'Linguagem C',         prismLang: 'c' },
  java:                 { emoji: '☕', bg: '#B07219', label: 'Java',                prismLang: 'java' },
  'estruturas-de-dados':{ emoji: '🏗️', bg: '#059669', label: 'Estruturas de Dados', prismLang: 'python' },
  algoritmos:           { emoji: '🔢', bg: '#D97706', label: 'Algoritmos',          prismLang: 'python' },
  backend:              { emoji: '🖥️', bg: '#1D4ED8', label: 'Backend',             prismLang: 'python' },
};

const BADGE_COLORS = [
  '#10B981','#3B82F6','#8B5CF6','#F59E0B',
  '#EF4444','#06B6D4','#F97316','#14B8A6',
  '#EC4899','#6366F1','#84CC16','#0EA5E9',
];

function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); }}
      className="p-1 rounded hover:bg-white/10 transition-opacity"
      title="Copiar"
    >
      {ok ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-white/30 hover:text-white/60" />}
    </button>
  );
}

function CodeHighlight({ code, lang }: { code: string; lang: string }) {
  /* plain = sem highlight, só formatado */
  if (lang === 'plain') {
    return (
      <pre className="text-[17px] font-mono text-slate-300 leading-relaxed whitespace-pre overflow-x-auto">
        {code}
      </pre>
    );
  }

  return (
    <Highlight theme={themes.nightOwl} code={code.trimEnd()} language={lang}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className="text-[17px] font-mono leading-relaxed whitespace-pre overflow-x-auto" style={{ background: 'transparent' }}>
          {tokens.map((line, i) => {
            const { key: _k, ...lineRest } = getLineProps({ line });
            return (
              <div key={i} {...lineRest}>
                {line.map((token, j) => {
                  const { key: _tk, ...tokenRest } = getTokenProps({ token });
                  return <span key={j} {...tokenRest} />;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
}

function RefCard({ entry, colorHex, lang }: { entry: CheatsheetEntry; colorHex: string; lang: string }) {
  return (
    <div className="bg-[#1a2030] rounded-2xl overflow-hidden border border-white/5 break-inside-avoid mb-6">
      {/* Badge */}
      <div className="flex justify-end px-5 py-3 bg-[#141824]">
        <span className="text-[13px] font-bold text-white px-3 py-1 rounded-full" style={{ backgroundColor: colorHex }}>
          {entry.category}
        </span>
      </div>

      {/* Code example + output */}
      {entry.example && (
        <div className="px-5 pb-4">
          {/* Code block */}
          <div className="group relative bg-[#011627] rounded-xl p-4 mb-3 text-[17px]">
            <CodeHighlight code={entry.example.code} lang={lang} />
            <div className="absolute top-3 right-3">
              <CopyBtn text={entry.example.code} />
            </div>
          </div>

          {/* Output */}
          {entry.example.output && (
            <div className="bg-[#0a0e14] border-l-2 border-white/10 rounded-r-xl px-4 py-3 mb-3">
              <p className="text-[12px] text-white/25 uppercase tracking-wider mb-2 font-semibold">output</p>
              <pre className="text-[16px] font-mono text-white/65 leading-relaxed whitespace-pre overflow-x-auto">
                {entry.example.output}
              </pre>
            </div>
          )}

          {/* Note */}
          {entry.example.note && (
            <p className="text-[14px] text-white/35 leading-relaxed mt-1">{entry.example.note}</p>
          )}
        </div>
      )}

      {/* Table items */}
      {entry.items && entry.items.length > 0 && (
        <div className="px-5 pb-4">
          {entry.items.map((item, i) => (
            <div key={i} className="group flex items-start justify-between gap-4 py-2 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-1 min-w-0">
                <code className="text-[15px] font-mono text-emerald-300 truncate">{item.code}</code>
                <CopyBtn text={item.code} />
              </div>
              <span className="text-[14px] text-white/50 text-right shrink-0 max-w-[48%] leading-relaxed">{item.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function GuiaRapidoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const sheet = getCheatsheetByModuleId(id);
  if (!sheet) notFound();

  const meta = TOPIC_META[id] ?? { emoji: '📄', bg: '#374151', label: sheet.title, prismLang: 'plain' };
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return sheet.entries;
    const q = search.toLowerCase();
    return sheet.entries.filter((e) =>
      e.category.toLowerCase().includes(q) ||
      e.example?.code.toLowerCase().includes(q) ||
      e.example?.output?.toLowerCase().includes(q) ||
      e.items?.some((i) => i.code.toLowerCase().includes(q) || i.description.toLowerCase().includes(q))
    );
  }, [search, sheet]);

  return (
    <div className="w-full pb-16">
      <div className="mb-8">
        <Link href="/guia-rapido" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5">
          <ArrowLeft className="w-4 h-4" />
          Guia Rápido
        </Link>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">{meta.emoji}</span>
          <h1 className="text-3xl font-bold">{meta.label}</h1>
        </div>
        <p className="text-muted-foreground text-sm ml-[3.25rem]">
          {sheet.entries.length} seções · {sheet.entries.reduce((s, e) => s + (e.items?.length ?? 0) + (e.example ? 1 : 0), 0)} referências
        </p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Buscar em ${meta.label}...`}
          className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground">
            limpar
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="columns-1 sm:columns-2 xl:columns-3 gap-6">
          {filtered.map((entry, idx) => (
            <RefCard key={entry.category} entry={entry} colorHex={BADGE_COLORS[idx % BADGE_COLORS.length]} lang={meta.prismLang} />
          ))}
        </div>
      ) : (
        <p className="text-center py-16 text-muted-foreground text-sm">Nenhum resultado para "{search}"</p>
      )}
    </div>
  );
}
