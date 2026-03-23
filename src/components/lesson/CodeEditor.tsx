'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { usePyodide } from '@/hooks/usePyodide';
import { usePowerUps } from '@/hooks/usePowerUps';
import { CodeChallenge } from '@/types/lesson';
import { launchConfetti } from '@/lib/confetti';
import { playSound } from '@/lib/sounds';
import { Play, RotateCcw, CheckCircle2, XCircle, Loader2, ChevronDown, Maximize2, X, Lightbulb } from 'lucide-react';

interface TestResult {
  description: string;
  passed: boolean;
  expected: string;
  got: string;
}

interface CodeEditorProps {
  challenge: CodeChallenge;
  onAllTestsPassed?: () => void;
}

function detectInputCalls(code: string): boolean {
  return /\binput\s*\(/.test(code);
}

function normalizeOutput(s: string): string {
  return s
    .split('\n')
    .map((l) => l.trimEnd())
    .join('\n')
    .trim();
}

export default function CodeEditor({ challenge, onAllTestsPassed }: CodeEditorProps) {
  const { isLoading, isReady, runPython } = usePyodide();
  const { useHint: useHintFn, getHintsUsed } = usePowerUps();
  const storageKey = `codlearn_code_${challenge.id}`;
  const isPython = challenge.language === 'python';

  const [code, setCode] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved !== null) return saved;
    }
    return challenge.starterCode;
  });

  const [output, setOutput] = useState('');
  const [runError, setRunError] = useState<string | null>(null);
  const [fullTraceback, setFullTraceback] = useState<string | null>(null);
  const [showTraceback, setShowTraceback] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [allPassed, setAllPassed] = useState<boolean | null>(null);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [inputNeeded, setInputNeeded] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [showHintPanel, setShowHintPanel] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset when challenge changes
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;
    setCode(saved !== null ? saved : challenge.starterCode);
    setOutput('');
    setRunError(null);
    setFullTraceback(null);
    setShowTraceback(false);
    setTestResults(null);
    setAllPassed(null);
    setInputValues([]);
    setInputNeeded(false);
  }, [challenge.id, challenge.starterCode, storageKey]);

  // Save code to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(storageKey, code);
    setShowSaved(true);
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => setShowSaved(false), 1000);
    return () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current); };
  }, [code, storageKey]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [code]);

  const handleRun = useCallback(async () => {
    if (!isPython) return;
    if (!isReady || isRunning) return;

    if (detectInputCalls(code) && inputValues.length === 0) {
      setInputNeeded(true);
      return;
    }

    setIsRunning(true);
    setRunError(null);
    setFullTraceback(null);
    setShowTraceback(false);
    setOutput('');
    setTestResults(null);
    setAllPassed(null);

    const result = await runPython(code, inputValues);

    if (result.error) {
      setRunError(result.friendlyError ?? result.error);
      setFullTraceback(result.rawError ?? null);
    } else {
      setOutput(result.output);
    }

    // Run test cases
    if (challenge.testCases && challenge.testCases.length > 0 && !result.error) {
      const results: TestResult[] = [];
      for (const tc of challenge.testCases) {
        const tcResult = await runPython(code, tc.inputs ?? []);
        const got = normalizeOutput(tcResult.output);
        const expected = normalizeOutput(tc.expectedOutput);
        results.push({
          description: tc.description,
          passed: got === expected,
          expected,
          got: tcResult.error ? `Erro: ${tcResult.friendlyError ?? tcResult.error}` : got,
        });
      }
      setTestResults(results);
      const passed = results.every((r) => r.passed);
      setAllPassed(passed);
      if (passed) {
        launchConfetti();
        playSound('success');
        onAllTestsPassed?.();
      }
    }

    setIsRunning(false);
    setInputNeeded(false);
  }, [isPython, isReady, isRunning, code, inputValues, runPython, challenge.testCases, onAllTestsPassed]);

  // Ctrl+Enter / Cmd+Enter + Escape for focus mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleRun();
      }
      if (e.key === 'Escape' && isFocusMode) {
        setIsFocusMode(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleRun, isFocusMode]);

  const handleReset = () => {
    setCode(challenge.starterCode);
    if (typeof window !== 'undefined') localStorage.removeItem(storageKey);
    setOutput('');
    setRunError(null);
    setFullTraceback(null);
    setShowTraceback(false);
    setTestResults(null);
    setAllPassed(null);
    setInputValues([]);
    setInputNeeded(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const handleHint = () => {
    useHintFn(challenge.id);
    setShowHintPanel(true);
  };

  const hintsUsedCount = getHintsUsed(challenge.id);
  const hints = challenge.hints ?? [];
  // Which hint to show: the next one (0-indexed), capped to last
  const currentHintIdx = Math.min(hintsUsedCount - 1, hints.length - 1);
  const currentHintText = hints.length > 0 && hintsUsedCount > 0
    ? hints[currentHintIdx]
    : null;
  const noMoreHints = hintsUsedCount >= hints.length && hints.length > 0;

  const handleTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + 4;
          textareaRef.current.selectionEnd = start + 4;
        }
      });
    }
  };

  const lineCount = code.split('\n').length;

  // Prism language map
  const prismLang = isPython ? 'python' : (challenge.language as string);

  return (
    <div
      className={`rounded-xl border border-border overflow-hidden bg-[#1e1e2e] ${
        isFocusMode
          ? 'fixed inset-0 z-[100] rounded-none border-0 flex flex-col'
          : ''
      }`}
      style={isFocusMode ? { background: '#1e1e2e', padding: 0 } : undefined}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#181825] border-b border-border/50 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground">
            {isPython ? '🐍 Python' : challenge.language}
          </span>
          {isPython && isLoading && (
            <span className="flex items-center gap-1 text-xs text-amber-400">
              <Loader2 className="w-3 h-3 animate-spin" />
              Carregando...
            </span>
          )}
          {isPython && isReady && (
            <span className="w-2 h-2 rounded-full bg-emerald-500" title="Python pronto" />
          )}
          <span
            className={`text-xs text-emerald-400 transition-opacity duration-300 ${showSaved ? 'opacity-100' : 'opacity-0'}`}
          >
            💾 Salvo
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            title="Resetar código"
          >
            <RotateCcw className="w-3 h-3" />
            Resetar
          </button>
          {isFocusMode ? (
            <button
              onClick={() => setIsFocusMode(false)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              title="Sair do modo foco (Esc)"
            >
              <X className="w-3.5 h-3.5" />
              Sair
            </button>
          ) : (
            <button
              onClick={() => setIsFocusMode(true)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              title="Modo foco (tela cheia)"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Foco
            </button>
          )}
        </div>
      </div>

      {/* Code area: line numbers + highlighted editor */}
      <div className={`flex text-sm font-mono ${isFocusMode ? 'flex-1 overflow-auto' : ''}`}>
        {/* Line numbers */}
        <div
          className="select-none text-right pr-3 pt-3 pb-3 pl-3 text-muted-foreground/40 bg-[#1e1e2e] min-w-[2.5rem] leading-[1.6] shrink-0"
          aria-hidden
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1} className="text-xs">{i + 1}</div>
          ))}
        </div>

        {/* Syntax highlight + textarea overlay */}
        <div
          className="relative flex-1 overflow-hidden"
          style={{ minHeight: isFocusMode ? '100%' : '120px' }}
        >
          {/* Highlighted code — rendered behind textarea */}
          <Highlight
            code={code}
            language={prismLang}
            theme={themes.nightOwl}
          >
            {({ tokens, getLineProps, getTokenProps }) => (
              <pre
                aria-hidden
                className="absolute inset-0 pt-3 pb-3 pr-4 leading-[1.6] text-sm pointer-events-none overflow-hidden whitespace-pre-wrap break-words"
                style={{ background: 'transparent', margin: 0, fontFamily: 'var(--editor-font, monospace)', fontSize: 'var(--editor-font-size, 14px)' }}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>

          {/* Transparent textarea on top */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleTabKey}
            spellCheck={false}
            className="relative z-10 w-full h-full bg-transparent text-transparent caret-white outline-none resize-none pt-3 pb-3 pr-4 leading-[1.6] text-sm"
            style={{ minHeight: isFocusMode ? '100%' : '120px', tabSize: 4, fontFamily: 'var(--editor-font, monospace)', fontSize: 'var(--editor-font-size, 14px)' }}
          />
        </div>
      </div>

      {/* Input section */}
      {isPython && inputNeeded && (
        <div className="border-t border-border/50 px-4 py-3 bg-amber-500/5">
          <p className="text-xs text-amber-400 mb-2 font-medium">
            ⌨️ Seu código usa <code>input()</code>. Informe os valores (um por linha):
          </p>
          <textarea
            className="w-full bg-[#181825] border border-border/50 rounded-lg p-2 text-sm font-mono text-foreground outline-none resize-none"
            rows={3}
            placeholder="valor1&#10;valor2&#10;..."
            value={inputValues.join('\n')}
            onChange={(e) =>
              setInputValues(e.target.value === '' ? [] : e.target.value.split('\n'))
            }
          />
          <button
            onClick={handleRun}
            className="mt-2 px-4 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Confirmar e Executar
          </button>
        </div>
      )}

      {/* Non-Python: copy + IDE message */}
      {!isPython && (
        <div className="border-t border-border/50 px-4 py-3 bg-blue-500/5 flex items-center justify-between">
          <p className="text-xs text-blue-400">
            Execute este código no seu IDE ou terminal.
          </p>
          <button
            onClick={handleCopy}
            className="text-xs px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-colors"
          >
            {copied ? '✓ Copiado' : 'Copiar código'}
          </button>
        </div>
      )}

      {/* Run bar (Python only) */}
      {isPython && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#181825] border-t border-border/50">
          <div className="flex items-center gap-2">
            <button
              onClick={handleRun}
              disabled={!isReady || isRunning}
              className="flex items-center gap-2 px-4 py-1.5 text-sm bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
              title="Executar (Ctrl+Enter)"
            >
              {isRunning ? (
                <><Loader2 className="w-4 h-4 animate-spin" />Executando...</>
              ) : (
                <><Play className="w-4 h-4" />Executar</>
              )}
            </button>
            {hints.length > 0 && (
              <button
                onClick={handleHint}
                disabled={noMoreHints}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors font-medium"
                title="Ver próxima dica (-10 XP)"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                {noMoreHints ? 'Sem mais dicas' : '💡 Dica (-10 XP)'}
              </button>
            )}
          </div>

          {testResults && testResults.length > 0 && (
            <span className={`flex items-center gap-1.5 text-sm font-medium ${allPassed ? 'text-emerald-400' : 'text-red-400'}`}>
              {allPassed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              {testResults.filter((r) => r.passed).length}/{testResults.length} testes
              {allPassed ? ' — tudo certo! 🎉' : ' passaram'}
            </span>
          )}
        </div>
      )}

      {/* Hint panel */}
      {isPython && showHintPanel && (
        <div className="border-t border-amber-500/20 bg-amber-500/5 px-4 py-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              {noMoreHints && !currentHintText ? (
                <p className="text-sm text-amber-400 font-medium">
                  💡 Sem mais dicas disponíveis
                </p>
              ) : currentHintText ? (
                <>
                  <p className="text-xs text-amber-400/70 font-medium mb-1">
                    💡 Dica {currentHintIdx + 1}/{hints.length}:
                  </p>
                  <p className="text-sm text-amber-200 leading-relaxed">{currentHintText}</p>
                </>
              ) : null}
            </div>
            <button
              onClick={() => setShowHintPanel(false)}
              className="shrink-0 p-1 text-amber-400/60 hover:text-amber-400 transition-colors"
              title="Fechar dica"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Output */}
      {isPython && (output || runError) && (
        <div className="border-t border-border/50">
          <div className="px-4 py-2 bg-[#181825] border-b border-border/50">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {runError ? '❌ Erro' : '📤 Saída'}
            </span>
          </div>
          <div style={{ background: '#11111b' }}>
            <pre
              className={`px-4 py-3 text-sm font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap ${
                runError ? 'text-red-400' : 'text-[#a6e3a1]'
              }`}
              style={{ fontFamily: 'var(--editor-font, monospace)', fontSize: 'var(--editor-font-size, 14px)' }}
            >
              {runError || output || <span className="text-muted-foreground/50">(sem saída)</span>}
            </pre>

            {/* Traceback details toggle */}
            {runError && fullTraceback && fullTraceback !== runError && (
              <div className="px-4 pb-3">
                <button
                  onClick={() => setShowTraceback((v) => !v)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showTraceback ? 'rotate-180' : ''}`} />
                  {showTraceback ? 'Esconder traceback' : 'Ver traceback completo'}
                </button>
                {showTraceback && (
                  <pre className="mt-2 text-xs text-muted-foreground font-mono whitespace-pre-wrap leading-relaxed border border-border/30 rounded-lg p-3">
                    {fullTraceback}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Test Results */}
      {isPython && testResults && testResults.length > 0 && (
        <div className="border-t border-border/50">
          <div className="px-4 py-2 bg-[#181825] border-b border-border/50">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              🧪 Testes automáticos
            </span>
          </div>
          <div className="divide-y divide-border/30" style={{ background: '#11111b' }}>
            {testResults.map((tr, i) => (
              <div key={i} className="px-4 py-3 flex items-start gap-3">
                {tr.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                )}
                <div className="text-sm min-w-0">
                  <p className={`font-medium ${tr.passed ? 'text-emerald-400' : 'text-red-400'}`}>
                    {tr.description}
                  </p>
                  {!tr.passed && (
                    <div className="mt-1 space-y-0.5 text-xs font-mono">
                      <p className="text-muted-foreground">
                        Esperado: <span className="text-emerald-400">{tr.expected || '(vazio)'}</span>
                      </p>
                      <p className="text-muted-foreground">
                        Obtido: <span className="text-red-400">{tr.got || '(vazio)'}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
