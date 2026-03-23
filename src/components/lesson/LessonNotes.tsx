'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface LessonNotesProps {
  lessonId: string;
}

export default function LessonNotes({ lessonId }: LessonNotesProps) {
  const storageKey = `codlearn_notes_${lessonId}`;
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [savedIndicator, setSavedIndicator] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indicatorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load notes on mount / lessonId change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(storageKey) ?? '';
    setNotes(stored);
    setSavedIndicator(false);
  }, [storageKey]);

  const saveNotes = useCallback(
    (value: string) => {
      if (typeof window === 'undefined') return;
      localStorage.setItem(storageKey, value);
      setSavedIndicator(true);
      if (indicatorTimerRef.current) clearTimeout(indicatorTimerRef.current);
      indicatorTimerRef.current = setTimeout(() => setSavedIndicator(false), 2000);
    },
    [storageKey]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNotes(value);
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => saveNotes(value), 800);
  };

  const handleClear = () => {
    if (!confirm('Tem certeza que deseja apagar todas as notas desta lição?')) return;
    setNotes('');
    if (typeof window !== 'undefined') localStorage.removeItem(storageKey);
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    setSavedIndicator(false);
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      if (indicatorTimerRef.current) clearTimeout(indicatorTimerRef.current);
    };
  }, []);

  const wordCount = notes.trim() === '' ? 0 : notes.trim().split(/\s+/).length;
  const hasNotes = notes.trim().length > 0;

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors text-sm font-medium ${
          hasNotes
            ? 'border-primary/50 bg-primary/10 text-primary hover:bg-primary/15'
            : 'border-border bg-card text-muted-foreground hover:text-foreground hover:border-border/80'
        }`}
      >
        <span>{hasNotes ? '📝' : '📄'} Minhas Notas</span>
        {hasNotes && (
          <span className="text-xs px-1.5 py-0.5 bg-primary/20 text-primary rounded-full">
            {wordCount} {wordCount === 1 ? 'palavra' : 'palavras'}
          </span>
        )}
        <ChevronDown
          className={`w-4 h-4 transition-transform ml-auto ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="mt-2 border border-border rounded-xl bg-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {wordCount} {wordCount === 1 ? 'palavra' : 'palavras'}
              </span>
              <span
                className={`text-xs text-emerald-400 transition-opacity duration-300 ${
                  savedIndicator ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Salvo ✓
              </span>
            </div>
            {hasNotes && (
              <button
                onClick={handleClear}
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
                title="Apagar notas"
              >
                <X className="w-3 h-3" />
                Apagar
              </button>
            )}
          </div>
          <textarea
            value={notes}
            onChange={handleChange}
            placeholder="Escreva suas notas sobre esta lição aqui..."
            className="w-full bg-transparent text-sm text-foreground p-4 resize-none outline-none leading-relaxed placeholder:text-muted-foreground/50"
            rows={6}
          />
        </div>
      )}
    </div>
  );
}
