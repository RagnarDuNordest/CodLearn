'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { launchConfetti } from '@/lib/confetti';
import { playSound } from '@/lib/sounds';

// ── Types ──────────────────────────────────────────────────────────────────────
interface BugQuestion {
  id: string;
  title: string;
  lines: string[];
  bugLine: number;
  explanation: string;
  difficulty: 'fácil' | 'médio' | 'difícil';
}

// ── Questions ──────────────────────────────────────────────────────────────────
const ALL_QUESTIONS: BugQuestion[] = [
  {
    id: 'q1',
    title: 'Imprimir resultado',
    lines: [
      'def saudar(nome):',
      '    mensagem = "Olá, " + nome',
      '    prit(mensagem)',
    ],
    bugLine: 2,
    explanation: '`prit` não existe em Python. A função correta para imprimir é `print`.',
    difficulty: 'fácil',
  },
  {
    id: 'q2',
    title: 'Verificar senha',
    lines: [
      'senha = "python123"',
      'if senha = "python123":',
      '    print("Acesso permitido!")',
    ],
    bugLine: 1,
    explanation: 'Para comparar valores usa-se `==`. O operador `=` é de atribuição e causa SyntaxError dentro de `if`.',
    difficulty: 'fácil',
  },
  {
    id: 'q3',
    title: 'Acessar elemento da lista',
    lines: [
      'notas = [8.5, 7.0, 9.5, 6.0]',
      'media = sum(notas) / len(notas)',
      'print("Última nota:", notas[4])',
    ],
    bugLine: 2,
    explanation: 'A lista tem 4 elementos nos índices 0, 1, 2 e 3. `notas[4]` causaria IndexError. O correto é `notas[3]`.',
    difficulty: 'fácil',
  },
  {
    id: 'q4',
    title: 'Definir função',
    lines: [
      'def calcular_area(base, altura)',
      '    area = base * altura / 2',
      '    return area',
    ],
    bugLine: 0,
    explanation: 'Falta `:` ao final da linha `def`. Toda definição de função precisa terminar com dois pontos.',
    difficulty: 'fácil',
  },
  {
    id: 'q5',
    title: 'Adicionar à lista',
    lines: [
      'compras = ["leite", "pão"]',
      'compras.push("queijo")',
      'print(compras)',
    ],
    bugLine: 1,
    explanation: 'Em Python não existe `.push()`. Para adicionar ao final de uma lista usa-se `.append()`.',
    difficulty: 'fácil',
  },
  {
    id: 'q6',
    title: 'Concatenar tipos diferentes',
    lines: [
      'nome = "Maria"',
      'pontos = 150',
      'print("Jogadora: " + nome + " — Pontos: " + pontos)',
    ],
    bugLine: 2,
    explanation: 'Não é possível concatenar `str` com `int` usando `+`. Use `str(pontos)` ou f-string: `f"...{pontos}"`.',
    difficulty: 'médio',
  },
  {
    id: 'q7',
    title: 'Somar 1 a 10',
    lines: [
      '# Somar os números de 1 a 10',
      'total = 0',
      'for i in range(10):',
      '    total = total + i',
      'print("Total:", total)',
    ],
    bugLine: 2,
    explanation: '`range(10)` gera 0 a 9, somando 45. Para incluir o 10 use `range(1, 11)`, que soma 55.',
    difficulty: 'médio',
  },
  {
    id: 'q8',
    title: 'Calcular IMC',
    lines: [
      'def calcular_imc(peso, altura):',
      '    imc = peso / (alura ** 2)',
      '    return imc',
    ],
    bugLine: 1,
    explanation: 'O parâmetro se chama `altura`, mas foi usado `alura` (typo). Isso causaria NameError ao executar.',
    difficulty: 'médio',
  },
  {
    id: 'q9',
    title: 'Retornar valor',
    lines: [
      'def dobrar(numero):',
      '    resultado = numero * 2',
      '    resultado',
      '',
      'print(dobrar(5))',
    ],
    bugLine: 2,
    explanation: 'A linha `resultado` apenas referencia o valor sem retorná-lo — a função retorna `None`. Deve ser `return resultado`.',
    difficulty: 'médio',
  },
  {
    id: 'q10',
    title: 'Comparar strings',
    lines: [
      'cor = input("Qual sua cor favorita? ")',
      'if cor is "azul":',
      '    print("Cor do mar!")',
      'else:',
      '    print("Outra cor.")',
    ],
    bugLine: 1,
    explanation: '`is` verifica identidade de objetos na memória, não igualdade de valor. Para comparar strings use `==`.',
    difficulty: 'médio',
  },
  {
    id: 'q11',
    title: 'Tamanho do texto',
    lines: [
      'texto = "Programação"',
      'tamanho = texto.lenght()',
      'print("Tamanho:", tamanho)',
    ],
    bugLine: 1,
    explanation: '`lenght` é um typo. Em Python, o tamanho de uma string é obtido com a função `len(texto)`, não um método.',
    difficulty: 'fácil',
  },
  {
    id: 'q12',
    title: 'Calcular nota média',
    lines: [
      '# Média com casas decimais',
      'nota1, nota2 = 7, 8',
      'media = (nota1 + nota2) // 2',
      'print("Média:", media)',
    ],
    bugLine: 2,
    explanation: '`//` é divisão inteira (retorna 7, não 7.5). Use `/` para obter resultado com casas decimais.',
    difficulty: 'médio',
  },
  {
    id: 'q13',
    title: 'Método de instância',
    lines: [
      'class Carro:',
      '    def __init__(self, marca):',
      '        self.marca = marca',
      '',
      '    def acelerar(velocidade):',
      '        print(f"A {velocidade} km/h")',
    ],
    bugLine: 4,
    explanation: 'Todo método de instância precisa de `self` como primeiro parâmetro. Deve ser `def acelerar(self, velocidade):`.',
    difficulty: 'difícil',
  },
  {
    id: 'q14',
    title: 'Tamanho da lista',
    lines: [
      'animais = ["gato", "cachorro", "peixe"]',
      'total = animais.len()',
      'print("Total:", total)',
    ],
    bugLine: 1,
    explanation: 'Listas não têm método `.len()`. O correto é usar a função embutida `len(animais)`.',
    difficulty: 'fácil',
  },
  {
    id: 'q15',
    title: 'Loop com contador',
    lines: [
      'contador = 5',
      'while contador > 0:',
      '    print(contador)',
      '    contador = contador + 1',
    ],
    bugLine: 3,
    explanation: 'O contador está sendo incrementado (+1) em vez de decrementado (-1), criando um loop infinito.',
    difficulty: 'difícil',
  },
  {
    id: 'q16',
    title: 'Dicionário — acessar chave',
    lines: [
      'usuario = {"nome": "Ana", "idade": 30}',
      'print("Nome:", usuario["nomes"])',
    ],
    bugLine: 1,
    explanation: 'A chave correta é `"nome"` (sem o `s`). Acessar `"nomes"` causaria KeyError.',
    difficulty: 'fácil',
  },
  {
    id: 'q17',
    title: 'Verificar divisibilidade',
    lines: [
      'def e_par(n):',
      '    return n / 2 == 0',
      '',
      'print(e_par(4))',
    ],
    bugLine: 1,
    explanation: 'Para verificar divisibilidade usa-se o operador de módulo `%`, não `/`. O correto é `n % 2 == 0`.',
    difficulty: 'médio',
  },
  {
    id: 'q18',
    title: 'Converter para inteiro',
    lines: [
      'valor = "42"',
      'resultado = valor + 8',
      'print(resultado)',
    ],
    bugLine: 1,
    explanation: '`valor` é uma string. Não é possível somar `str` com `int`. O correto é `int(valor) + 8`.',
    difficulty: 'fácil',
  },
  {
    id: 'q19',
    title: 'Condição no while',
    lines: [
      'numeros = [3, 7, 1, 9, 4]',
      'i = 0',
      'while i < len(numeros):',
      '    print(numeros[i])',
    ],
    bugLine: 3,
    explanation: 'Falta incrementar `i` dentro do loop (`i += 1`). Sem isso, o loop imprime o primeiro elemento infinitamente.',
    difficulty: 'difícil',
  },
  {
    id: 'q20',
    title: 'Herança de classe',
    lines: [
      'class Animal:',
      '    def __init__(self, nome):',
      '        self.nome = nome',
      '',
      'class Cachorro(Animal):',
      '    def __init__(self, nome, raca):',
      '        Animal.__init__(nome, raca)',
    ],
    bugLine: 6,
    explanation: 'Ao chamar o `__init__` da classe pai, deve-se passar `self` como primeiro argumento: `Animal.__init__(self, nome)`.',
    difficulty: 'difícil',
  },
];

// ── Constants ──────────────────────────────────────────────────────────────────
const TOTAL_QUESTIONS = 10;
const TIME_PER_Q = 20;
const BEST_KEY = 'codlearn_bug_hunt_best';
const SPEED_THRESHOLD = 13; // seconds remaining for +5 speed bonus

type Phase = 'start' | 'question' | 'feedback' | 'end';

function getStars(correct: number): number {
  if (correct >= 9) return 3;
  if (correct >= 6) return 2;
  if (correct >= 3) return 1;
  return 0;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const DIFF_STYLE: Record<string, string> = {
  fácil:   'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  médio:   'bg-amber-500/10  text-amber-400  border-amber-500/30',
  difícil: 'bg-red-500/10    text-red-400    border-red-500/30',
};

// ── Component ──────────────────────────────────────────────────────────────────
export default function CacadorDeBugsPage() {
  const [phase, setPhase]               = useState<Phase>('start');
  const [questions, setQuestions]       = useState<BugQuestion[]>([]);
  const [idx, setIdx]                   = useState(0);
  const [score, setScore]               = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft]         = useState(TIME_PER_Q);
  const [picked, setPicked]             = useState<number | null>(null); // null=unanswered, -1=timeout
  const [bestScore, setBestScore]       = useState(0);
  const [isNewRecord, setIsNewRecord]   = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const advRef   = useRef<ReturnType<typeof setTimeout>  | null>(null);

  // Always-fresh refs for use inside timer callbacks
  const scoreRef   = useRef(0);
  const correctRef = useRef(0);
  scoreRef.current   = score;
  correctRef.current = correctCount;

  useEffect(() => {
    const saved = localStorage.getItem(BEST_KEY);
    if (saved) setBestScore(parseInt(saved, 10) || 0);
  }, []);

  // ── Core: advance to next question or end ────────────────────────────────────
  const advanceToNext = useCallback((nextIdx: number, finalScore: number, finalCorrect: number) => {
    if (advRef.current) { clearTimeout(advRef.current); advRef.current = null; }

    if (nextIdx >= TOTAL_QUESTIONS) {
      const savedRaw  = localStorage.getItem(BEST_KEY);
      const savedBest = savedRaw ? parseInt(savedRaw, 10) || 0 : 0;
      if (finalScore > savedBest) {
        localStorage.setItem(BEST_KEY, String(finalScore));
        setBestScore(finalScore);
        setIsNewRecord(true);
      } else {
        setIsNewRecord(false);
      }
      if (finalCorrect >= 7) launchConfetti();
      setPhase('end');
    } else {
      setIdx(nextIdx);
      setPicked(null);
      setTimeLeft(TIME_PER_Q);
      setPhase('question');
    }
  }, []);

  // ── Per-question countdown ───────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'question') return;
    const capturedIdx = idx;

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setPicked(-1);
          setPhase('feedback');
          playSound('error');
          advRef.current = setTimeout(
            () => advanceToNext(capturedIdx + 1, scoreRef.current, correctRef.current),
            2500,
          );
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, idx, advanceToNext]);

  // ── User picks a line ────────────────────────────────────────────────────────
  const handleLineClick = useCallback((lineIdx: number) => {
    if (phase !== 'question' || picked !== null) return;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }

    const q       = questions[idx];
    const isRight = lineIdx === q.bugLine;
    const bonus   = timeLeft >= SPEED_THRESHOLD ? 5 : 0;

    setPicked(lineIdx);
    setPhase('feedback');

    if (isRight) {
      const newScore   = score + 10 + bonus;
      const newCorrect = correctCount + 1;
      setScore(newScore);
      setCorrectCount(newCorrect);
      playSound('success');
      advRef.current = setTimeout(() => advanceToNext(idx + 1, newScore, newCorrect), 2500);
    } else {
      playSound('error');
      advRef.current = setTimeout(() => advanceToNext(idx + 1, score, correctCount), 2500);
    }
  }, [phase, picked, questions, idx, timeLeft, score, correctCount, advanceToNext]);

  // ── Start / restart ──────────────────────────────────────────────────────────
  const startGame = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (advRef.current)   { clearTimeout(advRef.current);   advRef.current   = null; }
    setQuestions(shuffle(ALL_QUESTIONS).slice(0, TOTAL_QUESTIONS));
    setIdx(0);
    setScore(0);
    setCorrectCount(0);
    setPicked(null);
    setTimeLeft(TIME_PER_Q);
    setIsNewRecord(false);
    setPhase('question');
  }, []);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (advRef.current)   clearTimeout(advRef.current);
  }, []);

  // ── Derived values ───────────────────────────────────────────────────────────
  const q          = questions[idx];
  const stars      = getStars(correctCount);
  const timerPct   = (timeLeft / TIME_PER_Q) * 100;
  const isTimedOut = picked === -1;
  const answered   = picked !== null;
  const wasCorrect = answered && !isTimedOut && q != null && picked === q.bugLine;
  const speedBonus = timeLeft >= SPEED_THRESHOLD ? 5 : 0;

  // ════════════════════════════════════════════════════════════════════════════
  // Start screen
  // ════════════════════════════════════════════════════════════════════════════
  if (phase === 'start') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
          <div className="text-6xl mb-4">🐛</div>
          <h1 className="text-3xl font-bold mb-2">Caça ao Bug</h1>
          <p className="text-muted-foreground mb-6">
            Analise o código Python e clique na linha que contém o erro!
          </p>

          <div className="bg-muted/30 rounded-xl p-4 mb-6 text-left space-y-2">
            <p className="text-sm font-semibold text-foreground mb-2">Como jogar:</p>
            {[
              ['🔍', 'Leia o código e identifique o bug'],
              ['🖱️', 'Clique na linha que contém o erro'],
              ['⏱️', '20 segundos por questão'],
              ['✅', 'Acerto: +10 pts (+5 bônus se responder rápido)'],
              ['📖', 'Explicação educativa após cada resposta'],
            ].map(([icon, text]) => (
              <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>

          {bestScore > 0 && (
            <p className="text-sm text-muted-foreground mb-4">
              🏆 Melhor pontuação:{' '}
              <span className="font-bold text-primary">{bestScore} pts</span>
            </p>
          )}

          <button
            onClick={startGame}
            className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors"
          >
            Começar a Caçar 🐛
          </button>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // End screen
  // ════════════════════════════════════════════════════════════════════════════
  if (phase === 'end') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
          <div className="text-6xl mb-4">
            {stars === 3 ? '🏆' : stars === 2 ? '⭐' : stars === 1 ? '🎯' : '😅'}
          </div>
          <h2 className="text-2xl font-bold mb-1">Fim da Caçada!</h2>
          <p className="text-4xl font-bold text-primary my-3">{score} pts</p>
          <p className="text-muted-foreground mb-4">
            {correctCount}/{TOTAL_QUESTIONS} bugs encontrados
          </p>

          <div className="flex justify-center gap-2 mb-5">
            {[1, 2, 3].map((n) => (
              <span key={n} className={`text-3xl transition-all ${n <= stars ? 'opacity-100' : 'opacity-20'}`}>
                ⭐
              </span>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mb-3">
            {stars === 3
              ? 'Incrível! Você é um Exterminador de Bugs! 🔥'
              : stars === 2
              ? 'Muito bom! Continue treinando seu olho crítico.'
              : stars === 1
              ? 'Boa tentativa! Releia as explicações e tente de novo.'
              : 'Não desanime! Os bugs ficam mais fáceis com a prática.'}
          </p>

          {isNewRecord && score > 0 && (
            <p className="text-sm font-semibold text-emerald-400 mb-4">
              🎉 Novo recorde pessoal!
            </p>
          )}
          {!isNewRecord && bestScore > 0 && (
            <p className="text-sm text-muted-foreground mb-4">
              Melhor pontuação: <span className="font-bold">{bestScore} pts</span>
            </p>
          )}

          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={startGame}
              className="w-full py-2.5 px-6 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              🐛 Jogar novamente
            </button>
            <Link
              href="/"
              className="w-full py-2.5 px-6 bg-muted text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-colors text-center"
            >
              Voltar ao início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // Question / Feedback screen
  // ════════════════════════════════════════════════════════════════════════════
  if (!q) return null;

  return (
    <div className="max-w-2xl mx-auto">
      {/* ── Header row ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">
          {idx + 1}/{TOTAL_QUESTIONS}
        </span>
        <span
          className={`text-2xl font-bold tabular-nums ${
            timeLeft <= 5
              ? 'text-red-500 animate-pulse'
              : timeLeft <= 10
              ? 'text-amber-400'
              : 'text-foreground'
          }`}
        >
          {timeLeft}s
        </span>
        <span className="text-sm font-semibold text-primary">{score} pts</span>
      </div>

      {/* ── Timer bar ──────────────────────────────────────────────────────── */}
      <div className="h-1.5 bg-muted/40 rounded-full mb-5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            timeLeft <= 5
              ? 'bg-red-500'
              : timeLeft <= 10
              ? 'bg-amber-500'
              : 'bg-primary'
          }`}
          style={{ width: `${timerPct}%` }}
        />
      </div>

      {/* ── Question card ──────────────────────────────────────────────────── */}
      <div
        className={`bg-card border rounded-2xl overflow-hidden shadow-lg transition-colors duration-300 ${
          phase === 'feedback'
            ? wasCorrect
              ? 'border-emerald-500/50'
              : 'border-red-500/50'
            : 'border-border'
        }`}
      >
        {/* Card header */}
        <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
              Qual linha tem o bug?
            </p>
            <h3 className="font-semibold truncate">{q.title}</h3>
          </div>
          <span
            className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-medium border ${DIFF_STYLE[q.difficulty]}`}
          >
            {q.difficulty}
          </span>
        </div>

        {/* Code lines */}
        <div className="bg-[#1e1e2e] divide-y divide-white/[0.04]">
          {q.lines.map((line, lineIdx) => {
            const isBugLine  = lineIdx === q.bugLine;
            const isSelected = picked !== null && picked !== -1 && lineIdx === picked;
            const isEmpty    = line.trim() === '';
            const clickable  = phase === 'question' && !isEmpty;

            let rowBg = '';
            if (phase === 'feedback') {
              if (isBugLine)                        rowBg = 'bg-emerald-500/15';
              else if (isSelected && !isBugLine)    rowBg = 'bg-red-500/15';
            }

            return (
              <div
                key={lineIdx}
                onClick={() => clickable ? handleLineClick(lineIdx) : undefined}
                className={`flex items-center gap-3 px-4 py-2 font-mono text-sm transition-colors select-none ${
                  clickable ? 'cursor-pointer hover:bg-white/5' : 'cursor-default'
                } ${rowBg}`}
              >
                {/* Line number */}
                <span className="text-xs text-muted-foreground/40 w-5 text-right shrink-0">
                  {lineIdx + 1}
                </span>

                {/* Code text */}
                <span
                  className={`flex-1 leading-relaxed whitespace-pre ${
                    isEmpty ? 'opacity-0' : 'text-[#cdd6f4]'
                  }`}
                >
                  {line || ' '}
                </span>

                {/* Feedback badges */}
                {phase === 'feedback' && isBugLine && (
                  <span className="text-emerald-400 text-xs font-semibold shrink-0">
                    ← bug
                  </span>
                )}
                {phase === 'feedback' && isSelected && !isBugLine && (
                  <span className="text-red-400 text-xs shrink-0">✗</span>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Feedback explanation ─────────────────────────────────────────── */}
        {phase === 'feedback' && (
          <div
            className={`px-5 py-4 border-t ${
              wasCorrect
                ? 'border-emerald-500/20 bg-emerald-500/5'
                : 'border-red-500/20 bg-red-500/5'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl shrink-0">
                {wasCorrect ? '✅' : isTimedOut ? '⏰' : '❌'}
              </span>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-semibold mb-1 ${
                    wasCorrect ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {wasCorrect
                    ? `Correto!${speedBonus > 0 ? ' +5 bônus de velocidade! ⚡' : ''}`
                    : isTimedOut
                    ? 'Tempo esgotado!'
                    : 'Errado!'}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {q.explanation}
                </p>
              </div>
            </div>
            <button
              onClick={() => advanceToNext(idx + 1, score, correctCount)}
              className="mt-3 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Próxima questão →
            </button>
          </div>
        )}

        {/* ── Bottom hint (active question) ────────────────────────────────── */}
        {phase === 'question' && (
          <div className="px-5 py-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              🖱️ Clique na linha que contém o erro
              {timeLeft >= SPEED_THRESHOLD && (
                <span className="ml-2 text-amber-400">
                  ⚡ Responda rápido para +5 bônus!
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
