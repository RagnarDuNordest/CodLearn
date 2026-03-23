'use client';

import { useState, useMemo } from 'react';
import { Briefcase, ChevronDown, ChevronUp, Star, Search, Filter } from 'lucide-react';
import { interviewQuestions, categories, difficulties } from '@/data/interviewQuestions';

const difficultyColor: Record<string, string> = {
  'Fácil': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  'Médio': 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  'Difícil': 'text-red-400 bg-red-500/10 border-red-500/30',
};

export default function EntrevistasPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todas');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    const stored = localStorage.getItem('codlearn_saved_interviews');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  const filtered = useMemo(() => {
    return interviewQuestions.filter((q) => {
      const matchesSearch =
        !search ||
        q.question.toLowerCase().includes(search.toLowerCase()) ||
        q.answer.toLowerCase().includes(search.toLowerCase()) ||
        q.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCat = selectedCategory === 'Todas' || q.category === selectedCategory;
      const matchesDiff = selectedDifficulty === 'Todas' || q.difficulty === selectedDifficulty;
      return matchesSearch && matchesCat && matchesDiff;
    });
  }, [search, selectedCategory, selectedDifficulty]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem('codlearn_saved_interviews', JSON.stringify([...next]));
      return next;
    });
  };

  const stats = {
    total: interviewQuestions.length,
    easy: interviewQuestions.filter((q) => q.difficulty === 'Fácil').length,
    medium: interviewQuestions.filter((q) => q.difficulty === 'Médio').length,
    hard: interviewQuestions.filter((q) => q.difficulty === 'Difícil').length,
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Briefcase className="w-7 h-7 text-primary" />
          <h1 className="text-3xl font-bold">Prep de Entrevistas</h1>
        </div>
        <p className="text-muted-foreground">
          Perguntas reais de entrevistas técnicas para programadores. Estude, marque favoritas e veja as respostas.
        </p>

        {/* Stats */}
        <div className="flex gap-3 mt-4 flex-wrap">
          <div className="px-3 py-1.5 bg-card border border-border rounded-full text-sm">
            📚 {stats.total} perguntas
          </div>
          <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-sm">
            {stats.easy} Fácil
          </div>
          <div className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-sm">
            {stats.medium} Médio
          </div>
          <div className="px-3 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-full text-sm">
            {stats.hard} Difícil
          </div>
          {savedIds.size > 0 && (
            <div className="px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-full text-sm">
              ⭐ {savedIds.size} salvas
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar pergunta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 text-sm bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="Todas">Todas as categorias</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="px-3 py-2 text-sm bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="Todas">Todas as dificuldades</option>
          {difficulties.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-4xl mb-3">🔍</p>
            <p>Nenhuma pergunta encontrada</p>
          </div>
        )}

        {filtered.map((q) => {
          const isExpanded = expandedId === q.id;
          const isSaved = savedIds.has(q.id);

          return (
            <div
              key={q.id}
              className={`border rounded-xl overflow-hidden transition-all ${
                isExpanded ? 'border-primary/40 shadow-md' : 'border-border hover:border-primary/20'
              }`}
            >
              {/* Question header */}
              <div
                className="flex items-start gap-3 p-4 cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${difficultyColor[q.difficulty]}`}>
                      {q.difficulty}
                    </span>
                    <span className="text-xs text-muted-foreground">{q.category}</span>
                  </div>
                  <p className="font-medium text-sm leading-relaxed">{q.question}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleSave(q.id); }}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isSaved ? 'text-yellow-400' : 'text-muted-foreground hover:text-yellow-400'
                    }`}
                    title="Salvar pergunta"
                  >
                    <Star className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </div>

              {/* Answer */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-border/50 pt-4">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="text-sm leading-relaxed text-foreground whitespace-pre-line">
                      {q.answer.replace(/\*\*(.*?)\*\*/g, '$1')}
                    </p>
                  </div>
                  {q.tip && (
                    <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-xs text-primary">
                        💡 <strong>Dica:</strong> {q.tip}
                      </p>
                    </div>
                  )}
                  <div className="flex gap-1.5 mt-3 flex-wrap">
                    {q.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-muted/50 text-muted-foreground rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
