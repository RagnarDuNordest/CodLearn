'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getRandomFact, TechFact } from '@/data/techFacts';

const STORAGE_KEY = 'codlearn_seen_facts';

const CATEGORY_LABELS: Record<TechFact['category'], string> = {
  história: '📜 História',
  curiosidade: '💡 Curiosidade',
  linguagem: '💬 Linguagem',
  internet: '🌐 Internet',
  hardware: '🔧 Hardware',
};

const CATEGORY_COLORS: Record<TechFact['category'], string> = {
  história: 'bg-amber-500/10 text-amber-400',
  curiosidade: 'bg-blue-500/10 text-blue-400',
  linguagem: 'bg-purple-500/10 text-purple-400',
  internet: 'bg-cyan-500/10 text-cyan-400',
  hardware: 'bg-emerald-500/10 text-emerald-400',
};

interface TechFactCardProps {
  onClose?: () => void;
}

export default function TechFactCard({ onClose }: TechFactCardProps) {
  const [fact, setFact] = useState<TechFact | null>(null);
  const [seenIds, setSeenIds] = useState<string[]>([]);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let ids: string[] = [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        ids = JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    setSeenIds(ids);
    const initialFact = getRandomFact(ids);
    setFact(initialFact);
  }, []);

  function markSeen(id: string) {
    const next = [...seenIds, id];
    setSeenIds(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }

  function handleNext() {
    if (!fact) return;
    markSeen(fact.id);
    const nextFact = getRandomFact([...seenIds, fact.id]);
    setFact(nextFact);
  }

  function handleClose() {
    if (fact) markSeen(fact.id);
    setDismissed(true);
    onClose?.();
  }

  if (!mounted || dismissed || !fact) return null;

  return (
    <div className="my-6 p-4 bg-primary/5 border border-primary/20 rounded-2xl relative">
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 p-1 rounded-lg hover:bg-accent transition-colors"
        aria-label="Fechar"
      >
        <X className="w-4 h-4 text-muted-foreground" />
      </button>

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base font-semibold text-primary">Sabia? 🤔</span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[fact.category]}`}>
          {CATEGORY_LABELS[fact.category]}
        </span>
      </div>

      {/* Fact content */}
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl shrink-0 mt-0.5">{fact.emoji}</span>
        <p className="text-sm text-foreground leading-relaxed">{fact.fact}</p>
      </div>

      {/* Action button */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="text-xs font-semibold px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
        >
          Legal! Próximo 👉
        </button>
      </div>
    </div>
  );
}
