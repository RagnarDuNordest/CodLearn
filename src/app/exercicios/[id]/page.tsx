'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeft, Play, Lightbulb, RotateCcw, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import exerciseData from '@/data/exercises';
import { notFound } from 'next/navigation';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const LANG_MAP: Record<string, string> = {
  intro: 'python', logica: 'python', python: 'python', backend: 'python',
  estruturas: 'python', algoritmos: 'python', frontend: 'javascript', c: 'c',
  java: 'java', sql: 'sql', linux: 'shell', git: 'shell', 'html-css': 'html',
};

const PISTON_LANG: Record<string, { language: string; version: string }> = {
  python:     { language: 'python',     version: '3.10.0' },
  javascript: { language: 'javascript', version: '18.15.0' },
  c:          { language: 'c',          version: '10.2.0' },
  java:       { language: 'java',       version: '15.0.2' },
  shell:      { language: 'bash',       version: '5.2.0' },
};

const STARTER: Record<string, string> = {
  python:     '# Escreva sua solução aqui\n\n',
  javascript: '// Escreva sua solução aqui\n\n',
  c:          '#include <stdio.h>\n\nint main() {\n    // Escreva sua solução aqui\n    return 0;\n}\n',
  java:       'public class Solucao {\n    public static void main(String[] args) {\n        // Escreva sua solução aqui\n    }\n}\n',
  shell:      '#!/bin/bash\n# Escreva sua solução aqui\n\n',
  sql:        '-- Escreva sua query aqui\n\n',
  html:       '<!DOCTYPE html>\n<html>\n<body>\n  <!-- Escreva sua solução aqui -->\n</body>\n</html>\n',
};

function getExercise(id: string) {
  for (const subject of exerciseData) {
    const ex = subject.exercises.find(e => e.id === id);
    if (ex) return { exercise: ex, subject };
  }
  return null;
}

export default function ResolverExercicioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const result = getExercise(id);
  if (!result) notFound();
  const { exercise: ex, subject } = result;

  const lang = LANG_MAP[subject.moduleId] ?? 'python';
  const [code, setCode] = useState(STARTER[lang] ?? '');
  const [output, setOutput] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const runCode = async () => {
    const pistonLang = PISTON_LANG[lang];
    if (!pistonLang) {
      setOutput('Execução não disponível para esta linguagem no ambiente web.');
      setError(false);
      return;
    }
    setRunning(true);
    setOutput(null);
    try {
      const res = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: pistonLang.language,
          version: pistonLang.version,
          files: [{ content: code }],
        }),
      });
      const data = await res.json();
      const out = data.run?.stdout || '';
      const err = data.run?.stderr || '';
      if (err) { setOutput(err); setError(true); }
      else if (out) { setOutput(out); setError(false); }
      else { setOutput('(sem saída)'); setError(false); }
    } catch {
      setOutput('Erro de conexão. Verifique sua internet e tente novamente.');
      setError(true);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="w-full pb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/exercicios" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Exercícios
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-sm font-medium truncate">{ex.title}</span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">
        {/* Painel esquerdo — Enunciado */}
        <div className="space-y-4">
          {/* Título + badges */}
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border"
                style={{ backgroundColor: subject.color + '20', color: subject.color, borderColor: subject.color + '40' }}>
                {subject.emoji} {subject.label}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                ex.difficulty === 'iniciante' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                : ex.difficulty === 'intermediario' ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                : 'bg-red-500/15 text-red-400 border-red-500/30'
              }`}>
                {ex.difficulty === 'iniciante' ? 'Iniciante' : ex.difficulty === 'intermediario' ? 'Intermediário' : 'Avançado'}
              </span>
            </div>
            <h1 className="text-xl font-bold text-foreground">{ex.title}</h1>
          </div>

          {/* Descrição */}
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-foreground/90 leading-relaxed">{ex.description}</p>
          </div>

          {/* Exemplos */}
          <div className="space-y-2">
            {ex.examples.map((example, i) => (
              <div key={i} className="rounded-xl border border-border overflow-hidden">
                <div className="bg-muted/30 px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Exemplo {i + 1}
                </div>
                <div className="p-3 space-y-2 text-xs font-mono bg-background/30">
                  <div className="flex gap-2">
                    <span className="text-muted-foreground w-14 shrink-0">Entrada:</span>
                    <pre className="text-foreground whitespace-pre-wrap">{example.input}</pre>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground w-14 shrink-0">Saída:</span>
                    <pre className="text-emerald-400 whitespace-pre-wrap">{example.output}</pre>
                  </div>
                  {example.explanation && (
                    <div className="flex gap-2 pt-1 border-t border-border/30">
                      <span className="text-muted-foreground w-14 shrink-0 font-sans">Exp.:</span>
                      <span className="text-muted-foreground font-sans">{example.explanation}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Detalhes expansíveis */}
          {(ex.constraints || ex.inputFormat || ex.notes) && (
            <div className="border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setShowDetails(v => !v)}
                className="w-full flex items-center justify-between px-4 py-3 text-xs text-muted-foreground hover:bg-accent/20 transition-colors"
              >
                <span className="flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5" />Restrições e detalhes</span>
                {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              {showDetails && (
                <div className="px-4 pb-4 space-y-3 border-t border-border/30">
                  {ex.inputFormat && (
                    <div><p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Entrada</p>
                    <p className="text-xs text-foreground/80">{ex.inputFormat}</p></div>
                  )}
                  {ex.outputFormat && (
                    <div><p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Saída</p>
                    <p className="text-xs text-foreground/80">{ex.outputFormat}</p></div>
                  )}
                  {ex.constraints && (
                    <div><p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Restrições</p>
                    <ul className="space-y-0.5">{ex.constraints.map((c, i) => (
                      <li key={i} className="text-xs text-foreground/70 font-mono flex gap-2"><span className="text-muted-foreground">•</span>{c}</li>
                    ))}</ul></div>
                  )}
                  {ex.notes && <p className="text-xs bg-blue-500/5 border border-blue-500/20 rounded-lg px-3 py-2 text-blue-300/80">📌 {ex.notes}</p>}
                </div>
              )}
            </div>
          )}

          {/* Dica */}
          {ex.hint && (
            <div>
              {!showHint ? (
                <button onClick={() => setShowHint(true)} className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 transition-colors">
                  <Lightbulb className="w-3.5 h-3.5" /> Ver dica
                </button>
              ) : (
                <div className="flex items-start gap-2 bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-200/70 font-mono whitespace-pre-wrap leading-relaxed">{ex.hint}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Painel direito — Editor */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{lang}</span>
            <button onClick={() => setCode(STARTER[lang] ?? '')} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <RotateCcw className="w-3 h-3" /> Resetar
            </button>
          </div>

          <div className="rounded-xl overflow-hidden border border-border" style={{ height: 380 }}>
            <MonacoEditor
              height="380px"
              language={lang === 'shell' ? 'shell' : lang}
              theme="vs-dark"
              value={code}
              onChange={v => setCode(v ?? '')}
              options={{
                fontSize: 14,
                fontFamily: 'var(--font-geist-mono)',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                padding: { top: 12 },
                automaticLayout: true,
              }}
            />
          </div>

          <button
            onClick={runCode}
            disabled={running || !code.trim()}
            className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4" />
            {running ? 'Executando...' : '▶ Executar código'}
          </button>

          {/* Output */}
          {output !== null && (
            <div className={`rounded-xl border overflow-hidden ${error ? 'border-red-500/30' : 'border-emerald-500/20'}`}>
              <div className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide ${error ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                {error ? '✗ Erro' : '✓ Saída'}
              </div>
              <pre className={`px-4 py-3 text-xs font-mono whitespace-pre-wrap leading-relaxed bg-background/50 ${error ? 'text-red-300/80' : 'text-foreground/90'}`}>
                {output}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
