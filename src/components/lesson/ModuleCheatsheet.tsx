'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { getCheatsheetByModuleId } from '@/data/cheatsheets';

interface ModuleCheatsheetProps {
  moduleId: string;
}

export default function ModuleCheatsheet({ moduleId }: ModuleCheatsheetProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const cheatsheet = getCheatsheetByModuleId(moduleId);
  if (!cheatsheet) return null;

  function handleCopyAll() {
    const lines: string[] = [`# ${cheatsheet!.title}\n`];
    for (const entry of cheatsheet!.entries) {
      lines.push(`## ${entry.category}`);
      for (const item of entry.items ?? []) {
        lines.push(`${item.code}  →  ${item.description}`);
      }
      lines.push('');
    }
    const text = lines.join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="mt-10 border border-border rounded-xl overflow-hidden">
      {/* Header toggle */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 bg-muted/40 hover:bg-muted/70 transition-colors text-left"
      >
        <span className="font-semibold text-sm flex items-center gap-2">
          📋 Cheatsheet do módulo
          <span className="text-xs font-normal text-muted-foreground">
            — {cheatsheet.title}
          </span>
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>

      {/* Content */}
      {open && (
        <div className="border-t border-border">
          {/* Copy button */}
          <div className="flex justify-end px-5 pt-3 pb-1">
            <button
              onClick={handleCopyAll}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copiar tudo
                </>
              )}
            </button>
          </div>

          {/* Entries */}
          <div className="px-5 pb-5 max-h-[500px] overflow-y-auto space-y-5">
            {cheatsheet.entries.map((entry) => (
              <div key={entry.category}>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  {entry.category}
                </h4>
                <div className="space-y-1.5">
                  {(entry.items ?? []).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-sm"
                    >
                      <code className="flex-shrink-0 whitespace-pre font-mono text-xs bg-muted dark:bg-neutral-800 px-2 py-1 rounded text-foreground min-w-0 max-w-[45%] overflow-x-auto">
                        {item.code}
                      </code>
                      <span className="text-muted-foreground leading-relaxed pt-0.5 flex-1">
                        {item.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
