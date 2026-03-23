'use client';

import { useState, useCallback } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Copy, Check, FileCode2, Terminal, Globe, Coffee, Braces, Database, TerminalSquare } from 'lucide-react';

type CodeLanguage = 'python' | 'c' | 'java' | 'html' | 'css' | 'javascript' | 'sql' | 'bash';

interface CodeBlockProps {
  code: string;
  language: CodeLanguage;
  filename?: string;
  description?: string;
}

const languageConfig: Record<CodeLanguage, { label: string; icon: typeof Terminal; badgeClass: string; prismLang: string }> = {
  python: {
    label: 'Python',
    icon: Terminal,
    badgeClass: 'bg-blue-500/20 text-blue-400',
    prismLang: 'python',
  },
  c: {
    label: 'C',
    icon: FileCode2,
    badgeClass: 'bg-orange-500/20 text-orange-400',
    prismLang: 'c',
  },
  java: {
    label: 'Java',
    icon: Coffee,
    badgeClass: 'bg-red-500/20 text-red-400',
    prismLang: 'java',
  },
  html: {
    label: 'HTML',
    icon: Globe,
    badgeClass: 'bg-orange-500/20 text-orange-300',
    prismLang: 'markup',
  },
  css: {
    label: 'CSS',
    icon: Braces,
    badgeClass: 'bg-purple-500/20 text-purple-400',
    prismLang: 'css',
  },
  javascript: {
    label: 'JavaScript',
    icon: Braces,
    badgeClass: 'bg-yellow-500/20 text-yellow-400',
    prismLang: 'javascript',
  },
  sql: {
    label: 'SQL',
    icon: Database,
    badgeClass: 'bg-cyan-500/20 text-cyan-400',
    prismLang: 'sql',
  },
  bash: {
    label: 'Terminal',
    icon: TerminalSquare,
    badgeClass: 'bg-green-500/20 text-green-400',
    prismLang: 'bash',
  },
};

export default function CodeBlock({ code, language, filename, description }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  const config = languageConfig[language];
  const LangIcon = config.icon;

  return (
    <div className="my-4">
      <div className="rounded-lg overflow-hidden border border-border">
        {/* Header bar */}
        <div className="flex items-center justify-between bg-[#011627] px-4 py-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-sm text-gray-400 font-mono">
                {filename}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Language badge */}
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${config.badgeClass}`}>
              <LangIcon className="h-3 w-3" />
              {config.label}
            </span>
            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Copiar codigo"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-green-400" />
                  <span className="text-green-400">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code content */}
        <Highlight theme={themes.nightOwl} code={code.trimEnd()} language={config.prismLang}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} overflow-x-auto p-4 text-sm leading-relaxed`}
              style={{ ...style, margin: 0 }}
            >
              {tokens.map((line, i) => {
                const { key: _lineKey, ...lineRest } = getLineProps({ line });
                return (
                  <div key={i} {...lineRest} className={`${lineRest.className ?? ''} table-row`}>
                    <span className="table-cell pr-4 text-right select-none text-gray-500/50 text-xs w-8">
                      {i + 1}
                    </span>
                    <span className="table-cell">
                      {line.map((token, j) => {
                        const { key: _tokenKey, ...tokenRest } = getTokenProps({ token });
                        return <span key={j} {...tokenRest} />;
                      })}
                    </span>
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>

      {/* Description */}
      {description && (
        <p className="mt-2 text-sm text-muted-foreground italic">
          {description}
        </p>
      )}
    </div>
  );
}
