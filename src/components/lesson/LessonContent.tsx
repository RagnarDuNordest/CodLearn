'use client';

import { Lightbulb, AlertTriangle, Info } from 'lucide-react';
import CodeBlock from './CodeBlock';
import type { LessonSection } from '@/types/lesson';

interface LessonContentProps {
  sections: LessonSection[];
}

const calloutConfig = {
  tip: {
    icon: Lightbulb,
    borderColor: 'border-green-500',
    bgColor: 'bg-green-500/5',
    iconColor: 'text-green-500',
    titleColor: 'text-green-600 dark:text-green-400',
    title: 'Dica',
  },
  warning: {
    icon: AlertTriangle,
    borderColor: 'border-amber-500',
    bgColor: 'bg-amber-500/5',
    iconColor: 'text-amber-500',
    titleColor: 'text-amber-600 dark:text-amber-400',
    title: 'Atenção',
  },
  info: {
    icon: Info,
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-500/5',
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-600 dark:text-blue-400',
    title: 'Informação',
  },
};

function formatInline(text: string): string {
  let result = text;
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');
  return result;
}

// ── Token types ──────────────────────────────────────────────────────────────

type Token =
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'code'; lang: string; code: string }
  | { kind: 'list'; items: string[]; ordered: boolean }
  | { kind: 'para'; text: string };

function tokenize(content: string): Token[] {
  const tokens: Token[] = [];
  const lines = content.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip blank lines
    if (line.trim() === '') { i++; continue; }

    // ## Heading
    if (line.startsWith('## ')) {
      tokens.push({ kind: 'h2', text: line.slice(3) });
      i++; continue;
    }

    // ### Heading
    if (line.startsWith('### ')) {
      tokens.push({ kind: 'h3', text: line.slice(4) });
      i++; continue;
    }

    // Code fence
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim() || 'python';
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // consume closing ```
      tokens.push({ kind: 'code', lang, code: codeLines.join('\n') });
      continue;
    }

    // Unordered list
    if (/^[-*]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s/, ''));
        i++;
      }
      tokens.push({ kind: 'list', items, ordered: false });
      continue;
    }

    // Ordered list
    if (/^\d+[.)]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+[.)]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+[.)]\s/, ''));
        i++;
      }
      tokens.push({ kind: 'list', items, ordered: true });
      continue;
    }

    // Paragraph — collect consecutive non-special lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('## ') &&
      !lines[i].startsWith('### ') &&
      !lines[i].startsWith('```') &&
      !/^[-*]\s/.test(lines[i]) &&
      !/^\d+[.)]\s/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      tokens.push({ kind: 'para', text: paraLines.join(' ') });
    }
  }

  return tokens;
}

// ── Token renderers ──────────────────────────────────────────────────────────

function RenderTokens({ tokens, small = false }: { tokens: Token[]; small?: boolean }) {
  return (
    <>
      {tokens.map((tok, idx) => {
        switch (tok.kind) {
          case 'h2':
            return (
              <h2
                key={idx}
                className="text-xl font-bold text-foreground mt-6 mb-3"
                dangerouslySetInnerHTML={{ __html: formatInline(tok.text) }}
              />
            );

          case 'h3':
            return (
              <h3
                key={idx}
                className="text-lg font-semibold text-foreground mt-4 mb-2"
                dangerouslySetInnerHTML={{ __html: formatInline(tok.text) }}
              />
            );

          case 'code':
            return (
              <div key={idx} className="my-3">
                <CodeBlock
                  code={tok.code}
                  language={tok.lang as Parameters<typeof CodeBlock>[0]['language']}
                />
              </div>
            );

          case 'list':
            return tok.ordered ? (
              <ol key={idx} className="list-decimal ml-5 space-y-1.5 mb-4">
                {tok.items.map((item, j) => (
                  <li
                    key={j}
                    className={`${small ? 'text-sm' : ''} text-foreground leading-relaxed`}
                    dangerouslySetInnerHTML={{ __html: formatInline(item) }}
                  />
                ))}
              </ol>
            ) : (
              <ul key={idx} className="list-disc ml-5 space-y-1.5 mb-4">
                {tok.items.map((item, j) => (
                  <li
                    key={j}
                    className={`${small ? 'text-sm' : ''} text-foreground leading-relaxed`}
                    dangerouslySetInnerHTML={{ __html: formatInline(item) }}
                  />
                ))}
              </ul>
            );

          case 'para':
            return (
              <p
                key={idx}
                className={`${small ? 'text-sm' : ''} text-foreground leading-relaxed mb-4`}
                style={small ? undefined : { fontSize: 'var(--content-font-size, 1rem)' }}
                dangerouslySetInnerHTML={{ __html: formatInline(tok.text) }}
              />
            );
        }
      })}
    </>
  );
}

// ── Section components ────────────────────────────────────────────────────────

function TextSection({ content }: { content: string }) {
  return <RenderTokens tokens={tokenize(content)} />;
}

function CalloutSection({
  content,
  calloutType,
}: {
  content: string;
  calloutType: 'tip' | 'warning' | 'info';
}) {
  const config = calloutConfig[calloutType];
  const Icon = config.icon;
  const tokens = tokenize(content);

  return (
    <div className={`border-l-4 ${config.borderColor} ${config.bgColor} rounded-r-lg p-4 my-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${config.iconColor}`} />
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-sm mb-2 ${config.titleColor}`}>{config.title}</p>
          <div className="text-sm text-foreground/80">
            <RenderTokens tokens={tokens} small />
          </div>
        </div>
      </div>
    </div>
  );
}

function ComparisonSection({
  comparison,
}: {
  comparison: {
    python: { language: 'python' | 'c' | 'java' | 'html' | 'css' | 'javascript' | 'sql' | 'bash'; code: string; filename?: string; description?: string };
    c: { language: 'python' | 'c' | 'java' | 'html' | 'css' | 'javascript' | 'sql' | 'bash'; code: string; filename?: string; description?: string };
    explanation: string;
  };
}) {
  return (
    <div className="my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CodeBlock
          code={comparison.python.code}
          language="python"
          filename={comparison.python.filename}
          description={comparison.python.description}
        />
        <CodeBlock
          code={comparison.c.code}
          language={comparison.c.language}
          filename={comparison.c.filename}
          description={comparison.c.description}
        />
      </div>
      {comparison.explanation && (
        <p
          className="mt-3 text-sm text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatInline(comparison.explanation) }}
        />
      )}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function LessonContent({ sections }: LessonContentProps) {
  return (
    <div className="prose-custom">
      {sections.map((section, index) => {
        switch (section.type) {
          case 'text':
            return section.content ? (
              <TextSection key={index} content={section.content} />
            ) : null;

          case 'code':
            return section.codeExample ? (
              <CodeBlock
                key={index}
                code={section.codeExample.code}
                language={section.codeExample.language}
                filename={section.codeExample.filename}
                description={section.codeExample.description}
              />
            ) : null;

          case 'callout':
            return section.content && section.calloutType ? (
              <CalloutSection
                key={index}
                content={section.content}
                calloutType={section.calloutType}
              />
            ) : null;

          case 'comparison':
            return section.comparison ? (
              <ComparisonSection key={index} comparison={section.comparison} />
            ) : null;

          default:
            return null;
        }
      })}
    </div>
  );
}
