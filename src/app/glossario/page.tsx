'use client';

import { useState, useMemo } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { glossaryTerms, searchGlossary, GlossaryTerm } from '@/data/glossary';

export default function GlossarioPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => searchGlossary(query), [query]);

  // Group by first letter
  const grouped = useMemo(() => {
    const map: Record<string, GlossaryTerm[]> = {};
    filtered.forEach((term) => {
      const letter = term.term[0].toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(term);
    });
    // Sort letters
    const sorted: [string, GlossaryTerm[]][] = Object.entries(map).sort(([a], [b]) =>
      a.localeCompare(b, 'pt-BR')
    );
    return sorted;
  }, [filtered]);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-7 h-7 text-primary" />
          <h1 className="text-3xl font-bold">Glossário</h1>
        </div>
        <p className="text-muted-foreground">
          Termos e conceitos de programação explicados em português.
          {' '}<span className="text-foreground font-medium">{glossaryTerms.length} termos</span> disponíveis.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar termo..."
          className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            limpar
          </button>
        )}
      </div>

      {/* Results count when searching */}
      {query && (
        <p className="text-sm text-muted-foreground mb-4">
          {filtered.length === 0
            ? 'Nenhum termo encontrado.'
            : `${filtered.length} termo${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`}
        </p>
      )}

      {/* Terms grouped by letter */}
      {grouped.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <span className="text-4xl mb-4 block">🔍</span>
          <p className="text-lg font-medium mb-1">Nenhum termo encontrado</p>
          <p className="text-sm">Tente buscar por outro termo ou categoria.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map(([letter, terms]) => (
            <section key={letter}>
              {/* Letter header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="w-9 h-9 rounded-xl bg-primary/10 text-primary font-bold text-lg flex items-center justify-center shrink-0">
                  {letter}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Terms grid */}
              <div className="grid gap-3">
                {terms.map((term) => (
                  <div
                    key={term.term}
                    className="p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl shrink-0 mt-0.5">{term.emoji}</span>
                      <div className="flex-1 min-w-0">
                        {/* Term name */}
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-semibold text-sm text-foreground">{term.term}</h3>
                          {term.aliases.length > 0 && (
                            <span className="text-xs text-muted-foreground">
                              também: {term.aliases.slice(0, 3).join(', ')}
                            </span>
                          )}
                        </div>

                        {/* Definition */}
                        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                          {term.definition}
                        </p>

                        {/* Code example */}
                        {term.example && (
                          <pre className="text-xs bg-muted rounded-lg p-3 font-mono overflow-x-auto text-foreground">
                            <code>{term.example}</code>
                          </pre>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Footer padding */}
      <div className="h-12" />
    </div>
  );
}
