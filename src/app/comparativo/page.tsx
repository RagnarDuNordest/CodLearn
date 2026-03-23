'use client';

import { useState } from 'react';
import { comparisons } from '@/data/languageComparisons';

const LANG_BADGES: Record<string, { emoji: string; color: string }> = {
  Python:     { emoji: '🐍', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
  JavaScript: { emoji: '⚡', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' },
  C:          { emoji: '⚙️', color: 'bg-slate-500/10 text-slate-400 border-slate-500/30' },
  Java:       { emoji: '☕', color: 'bg-orange-500/10 text-orange-400 border-orange-500/30' },
};

export default function ComparativoPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = comparisons[activeIdx];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Comparativo de Linguagens 🔄</h1>
        <p className="text-muted-foreground">
          Veja como o mesmo conceito é implementado em Python, JavaScript, C e Java.
        </p>
      </div>

      {/* Tab selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {comparisons.map((c, idx) => (
          <button
            key={c.concept}
            onClick={() => setActiveIdx(idx)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              activeIdx === idx
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
            }`}
          >
            {c.concept}
          </button>
        ))}
      </div>

      {/* Active concept info */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-1">{active.concept}</h2>
        <p className="text-muted-foreground text-sm">{active.description}</p>
      </div>

      {/* 2x2 grid of code blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {active.examples.map((ex) => {
          const badge = LANG_BADGES[ex.language] ?? { emoji: '💻', color: 'bg-muted text-foreground border-border' };
          return (
            <div
              key={ex.language}
              className="rounded-xl border border-border overflow-hidden bg-[#1e1e2e]"
            >
              {/* Language header */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#181825] border-b border-border/50">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-md border ${badge.color}`}
                >
                  <span>{badge.emoji}</span>
                  {ex.language}
                </span>
              </div>

              {/* Code block */}
              <div className="overflow-x-auto">
                <pre className="px-4 py-4 text-sm font-mono leading-relaxed text-[#cdd6f4] whitespace-pre">
                  <code>{ex.code}</code>
                </pre>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation between concepts */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
          disabled={activeIdx === 0}
          className="px-4 py-2 text-sm font-medium bg-card border border-border rounded-lg hover:border-primary/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← Anterior
        </button>
        <span className="text-sm text-muted-foreground">
          {activeIdx + 1} / {comparisons.length}
        </span>
        <button
          onClick={() => setActiveIdx((i) => Math.min(comparisons.length - 1, i + 1))}
          disabled={activeIdx === comparisons.length - 1}
          className="px-4 py-2 text-sm font-medium bg-card border border-border rounded-lg hover:border-primary/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Próximo →
        </button>
      </div>
    </div>
  );
}
