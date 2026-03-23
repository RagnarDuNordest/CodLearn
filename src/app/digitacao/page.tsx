'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Keyboard, Play, RotateCcw, Trophy, Timer, Target } from 'lucide-react';

const codeSnippets = [
  { id: 's1', label: 'Hello World', code: 'print("Hello, World!")' },
  { id: 's2', label: 'Variável', code: 'nome = "Ana"\nidade = 20\nprint(f"Olá, {nome}!")' },
  { id: 's3', label: 'Loop for', code: 'for i in range(5):\n    print(i)' },
  { id: 's4', label: 'Função', code: 'def somar(a, b):\n    return a + b\n\nresultado = somar(3, 4)\nprint(resultado)' },
  { id: 's5', label: 'Lista', code: 'frutas = ["maçã", "banana", "uva"]\nfor fruta in frutas:\n    print(fruta)' },
  { id: 's6', label: 'Condição', code: 'nota = 7\nif nota >= 7:\n    print("Aprovado!")\nelse:\n    print("Reprovado.")' },
  { id: 's7', label: 'Dicionário', code: 'pessoa = {\n    "nome": "Carlos",\n    "idade": 25\n}\nprint(pessoa["nome"])' },
  { id: 's8', label: 'While', code: 'contador = 0\nwhile contador < 5:\n    print(contador)\n    contador += 1' },
  { id: 's9', label: 'Try/Except', code: 'try:\n    x = int(input("Número: "))\n    print(x * 2)\nexcept ValueError:\n    print("Inválido!")' },
  { id: 's10', label: 'Classe', code: 'class Animal:\n    def __init__(self, nome):\n        self.nome = nome\n\n    def falar(self):\n        print(f"{self.nome} faz barulho!")' },
];

function formatTime(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return m > 0 ? `${m}m ${rem}s` : `${s}s`;
}

export default function DigitacaoPage() {
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [errors, setErrors] = useState(0);
  const [bestWpm, setBestWpm] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    return parseInt(localStorage.getItem('codlearn_typing_best') ?? '0', 10);
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const snippet = codeSnippets[snippetIdx];
  const target = snippet.code;

  const reset = useCallback(() => {
    setTyped('');
    setStarted(false);
    setFinished(false);
    setStartTime(0);
    setEndTime(0);
    setErrors(0);
    setTimeout(() => textareaRef.current?.focus(), 100);
  }, []);

  useEffect(() => {
    reset();
  }, [snippetIdx, reset]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;

    if (!started && val.length > 0) {
      setStarted(true);
      setStartTime(Date.now());
    }

    // Count errors
    let errCount = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] !== target[i]) errCount++;
    }
    setErrors(errCount);
    setTyped(val);

    if (val === target) {
      const end = Date.now();
      setEndTime(end);
      setFinished(true);
      const wpm = Math.round((target.split(/\s+/).length / ((end - startTime) / 60000)));
      if (wpm > bestWpm) {
        setBestWpm(wpm);
        localStorage.setItem('codlearn_typing_best', String(wpm));
      }
    }
  };

  const elapsed = finished
    ? endTime - startTime
    : started
    ? Date.now() - startTime
    : 0;

  const wpm = finished && elapsed > 0
    ? Math.round((target.split(/\s+/).length / (elapsed / 60000)))
    : 0;

  const accuracy = typed.length > 0
    ? Math.round(((typed.length - errors) / typed.length) * 100)
    : 100;

  // Render the target code with coloring
  const renderTarget = () => {
    return target.split('').map((char, i) => {
      let className = 'text-muted-foreground/50';
      if (i < typed.length) {
        className = typed[i] === char ? 'text-emerald-400' : 'bg-red-500/30 text-red-400';
      } else if (i === typed.length) {
        className = 'border-l-2 border-primary animate-pulse text-foreground';
      }
      return (
        <span key={i} className={className}>
          {char === '\n' ? '↵\n' : char}
        </span>
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Keyboard className="w-7 h-7 text-primary" />
          <h1 className="text-3xl font-bold">Jogo de Digitação</h1>
        </div>
        <p className="text-muted-foreground">
          Pratique digitando código Python. Melhore sua velocidade e precisão!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-3 bg-card border border-border rounded-xl text-center">
          <p className="text-2xl font-bold">{started && !finished ? '...' : wpm}</p>
          <p className="text-xs text-muted-foreground">WPM</p>
        </div>
        <div className="p-3 bg-card border border-border rounded-xl text-center">
          <p className="text-2xl font-bold">{accuracy}%</p>
          <p className="text-xs text-muted-foreground">Precisão</p>
        </div>
        <div className="p-3 bg-card border border-border rounded-xl text-center">
          <p className="text-2xl font-bold text-yellow-400">{bestWpm}</p>
          <p className="text-xs text-muted-foreground">Recorde WPM</p>
        </div>
      </div>

      {/* Snippet selector */}
      <div className="flex gap-2 flex-wrap mb-4">
        {codeSnippets.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setSnippetIdx(i)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
              i === snippetIdx
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/50 text-muted-foreground hover:bg-accent'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Game area */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {/* Target code */}
        <div className="p-4 border-b border-border bg-muted/20">
          <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
            {renderTarget()}
          </pre>
        </div>

        {/* Input */}
        <div className="p-4">
          {finished ? (
            <div className="text-center py-4">
              <p className="text-2xl mb-2">🎉</p>
              <p className="font-bold text-lg">
                {wpm >= 40 ? 'Incrível!' : wpm >= 25 ? 'Muito bem!' : 'Bom trabalho!'}
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                {wpm} WPM · {accuracy}% precisão · {formatTime(elapsed)}
              </p>
              {wpm === bestWpm && wpm > 0 && (
                <p className="text-yellow-400 text-sm mb-4">🏆 Novo recorde!</p>
              )}
              <button
                onClick={reset}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90"
              >
                Tentar novamente
              </button>
            </div>
          ) : (
            <>
              <textarea
                ref={textareaRef}
                value={typed}
                onChange={handleChange}
                placeholder="Comece a digitar o código acima..."
                className="w-full h-32 font-mono text-sm p-3 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {started && (
                    <>
                      <span className="flex items-center gap-1">
                        <Timer className="w-3.5 h-3.5" />
                        {formatTime(elapsed)}
                      </span>
                      <span className={errors > 0 ? 'text-red-400' : 'text-emerald-400'}>
                        {errors} erro{errors !== 1 ? 's' : ''}
                      </span>
                      <span>{typed.length}/{target.length} chars</span>
                    </>
                  )}
                  {!started && (
                    <span>Clique na caixa de texto e comece a digitar!</span>
                  )}
                </div>
                <button
                  onClick={reset}
                  className="p-1.5 hover:bg-accent rounded-lg transition-colors text-muted-foreground"
                  title="Reiniciar"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
