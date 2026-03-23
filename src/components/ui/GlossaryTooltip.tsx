'use client';

import { useState, useRef, useCallback } from 'react';
import { glossaryTerms, GlossaryTerm } from '@/data/glossary';

interface TooltipState {
  term: GlossaryTerm;
  x: number;
  y: number;
}

interface GlossaryTooltipProps {
  children: string;
}

// Build a sorted list of all aliases+term pairs for matching
const allMatches: { pattern: string; term: GlossaryTerm }[] = [];
glossaryTerms.forEach((t) => {
  allMatches.push({ pattern: t.term.toLowerCase(), term: t });
  t.aliases.forEach((a) => {
    allMatches.push({ pattern: a.toLowerCase(), term: t });
  });
});
// Sort longest first to match longest terms first
allMatches.sort((a, b) => b.pattern.length - a.pattern.length);

function parseText(text: string): { text: string; term?: GlossaryTerm }[] {
  const parts: { text: string; term?: GlossaryTerm }[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    let matched = false;

    for (const { pattern, term } of allMatches) {
      const idx = remaining.toLowerCase().indexOf(pattern);
      if (idx === -1) continue;

      // Only match whole words
      const before = remaining[idx - 1];
      const after = remaining[idx + pattern.length];
      const isWordBoundaryBefore = !before || /\W/.test(before);
      const isWordBoundaryAfter = !after || /\W/.test(after);
      if (!isWordBoundaryBefore || !isWordBoundaryAfter) continue;

      if (idx > 0) {
        parts.push({ text: remaining.slice(0, idx) });
      }
      parts.push({ text: remaining.slice(idx, idx + pattern.length), term });
      remaining = remaining.slice(idx + pattern.length);
      matched = true;
      break;
    }

    if (!matched) {
      parts.push({ text: remaining });
      remaining = '';
    }
  }

  return parts;
}

export default function GlossaryTooltip({ children }: GlossaryTooltipProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLSpanElement>, term: GlossaryTerm) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    const x = rect.left - (containerRect?.left ?? 0) + rect.width / 2;
    const y = rect.top - (containerRect?.top ?? 0);
    setTooltip({ term, x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  const parts = parseText(children);

  return (
    <span ref={containerRef} className="relative">
      {parts.map((part, i) =>
        part.term ? (
          <span
            key={i}
            className="text-primary cursor-help"
            style={{ textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: '3px' }}
            onMouseEnter={(e) => handleMouseEnter(e, part.term!)}
            onMouseLeave={handleMouseLeave}
          >
            {part.text}
          </span>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}

      {/* Tooltip */}
      {tooltip && (
        <span
          className="absolute z-50 pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%) translateY(-8px)',
          }}
        >
          <span
            className="block bg-popover border border-border rounded-xl shadow-xl p-3 text-left"
            style={{ maxWidth: 280, minWidth: 180 }}
          >
            {/* Term header */}
            <span className="flex items-center gap-2 mb-1.5">
              <span className="text-base">{tooltip.term.emoji}</span>
              <span className="font-semibold text-sm text-foreground">{tooltip.term.term}</span>
            </span>

            {/* Definition */}
            <span className="block text-xs text-muted-foreground leading-relaxed mb-2">
              {tooltip.term.definition}
            </span>

            {/* Code example */}
            {tooltip.term.example && (
              <span
                className="block text-xs bg-muted rounded-lg p-2 font-mono whitespace-pre text-foreground overflow-hidden"
                style={{ fontSize: '10px' }}
              >
                {tooltip.term.example}
              </span>
            )}

            {/* Arrow */}
            <span
              className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full"
              style={{
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid var(--border)',
              }}
            />
          </span>
        </span>
      )}
    </span>
  );
}
