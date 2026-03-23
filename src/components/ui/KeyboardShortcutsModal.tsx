'use client';

import { useEffect, useState } from 'react';
import { X, Keyboard } from 'lucide-react';

interface Shortcut {
  keys: string[];
  description: string;
  category: string;
}

const shortcuts: Shortcut[] = [
  // Navigation
  { keys: ['Ctrl', 'K'], description: 'Pesquisa global', category: 'Navegação' },
  { keys: ['?'], description: 'Mostrar atalhos', category: 'Navegação' },
  { keys: ['Esc'], description: 'Fechar modal/painel', category: 'Navegação' },

  // Editor
  { keys: ['Ctrl', 'Enter'], description: 'Executar código', category: 'Editor' },
  { keys: ['Ctrl', 'S'], description: 'Salvar código manualmente', category: 'Editor' },
  { keys: ['Tab'], description: 'Indentar código', category: 'Editor' },

  // Learning
  { keys: ['F'], description: 'Modo foco (tela cheia)', category: 'Aprendizado' },
  { keys: ['H'], description: 'Ver dica de poder', category: 'Aprendizado' },
  { keys: ['N'], description: 'Abrir anotações', category: 'Aprendizado' },

  // Accessibility
  { keys: ['Alt', '←'], description: 'Lição anterior', category: 'Acessibilidade' },
  { keys: ['Alt', '→'], description: 'Próxima lição', category: 'Acessibilidade' },
];

const categories = [...new Set(shortcuts.map((s) => s.category))];

export default function KeyboardShortcutsModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      const isInput = tag === 'INPUT' || tag === 'TEXTAREA';
      if (!isInput && e.key === '?') {
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">Atalhos de Teclado</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg hover:bg-accent transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcuts list */}
        <div className="overflow-y-auto p-6 space-y-6">
          {categories.map((cat) => (
            <div key={cat}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {cat}
              </h3>
              <div className="space-y-2">
                {shortcuts
                  .filter((s) => s.category === cat)
                  .map((s, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{s.description}</span>
                      <div className="flex items-center gap-1">
                        {s.keys.map((key, ki) => (
                          <span key={ki} className="flex items-center gap-1">
                            <kbd className="px-2 py-0.5 text-xs font-mono bg-muted border border-border rounded-md">
                              {key}
                            </kbd>
                            {ki < s.keys.length - 1 && (
                              <span className="text-xs text-muted-foreground">+</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-border bg-muted/30">
          <p className="text-xs text-muted-foreground text-center">
            Pressione <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted border border-border rounded">?</kbd> a qualquer momento para ver esta lista
          </p>
        </div>
      </div>
    </div>
  );
}
