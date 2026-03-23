'use client';

import { useState } from 'react';
import { History, Clock, ChevronDown, RotateCcw, Trash2 } from 'lucide-react';
import type { CodeSnapshot } from '@/hooks/useCodeHistory';

interface CodeHistoryPanelProps {
  history: CodeSnapshot[];
  onRestore: (code: string) => void;
  onClear: () => void;
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function formatDate(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) return 'Hoje';
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return 'Ontem';
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

export default function CodeHistoryPanel({ history, onRestore, onClear }: CodeHistoryPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  if (history.length === 0) return null;

  return (
    <div className="mt-2 border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2 text-sm">
          <History className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">Histórico de código</span>
          <span className="text-xs text-muted-foreground">({history.length} versão{history.length > 1 ? 'ões' : ''})</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? '' : '-rotate-90'}`} />
      </button>

      {isOpen && (
        <div className="divide-y divide-border">
          {history.map((snap, idx) => (
            <div key={snap.timestamp} className="p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <div>
                    <span className="text-xs font-medium">{formatDate(snap.timestamp)}</span>
                    <span className="text-xs text-muted-foreground ml-1">{formatTime(snap.timestamp)}</span>
                    {snap.label && (
                      <span className="ml-2 text-xs text-primary">{snap.label}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                    className="p-1.5 hover:bg-accent rounded text-xs text-muted-foreground hover:text-foreground transition-colors"
                    title="Ver código"
                  >
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedIdx === idx ? '' : '-rotate-90'}`} />
                  </button>
                  <button
                    onClick={() => onRestore(snap.code)}
                    className="p-1.5 hover:bg-accent rounded text-xs text-emerald-500 hover:text-emerald-400 transition-colors"
                    title="Restaurar esta versão"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              {expandedIdx === idx && (
                <pre className="mt-2 p-2 bg-muted/40 rounded text-xs font-mono overflow-x-auto max-h-40 text-muted-foreground">
                  {snap.code}
                </pre>
              )}
            </div>
          ))}
          <div className="p-2 flex justify-end">
            <button
              onClick={onClear}
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 px-3 py-1.5 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Limpar histórico
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
