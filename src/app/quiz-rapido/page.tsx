'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import quizzes from '@/data/quizzes/index';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

function getAllQuestions(): Question[] {
  const all: Question[] = [];
  for (const quiz of quizzes) {
    for (const q of quiz.questions) {
      all.push(q);
    }
  }
  return all;
}

function pickRandom(arr: Question[], count: number): Question[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function getStars(score: number): number {
  if (score > 80) return 3;
  if (score > 50) return 2;
  if (score > 0) return 1;
  return 0;
}

const TOTAL_QUESTIONS = 10;
const TOTAL_TIME = 60;
const WRONG_SHOW_MS = 800;
const BEST_KEY = 'codlearn_quiz_flash_best';

type Phase = 'start' | 'quiz' | 'end';
type Flash = 'correct' | 'wrong' | null;

export default function QuizRapidoPage() {
  const [phase, setPhase] = useState<Phase>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [flash, setFlash] = useState<Flash>(null);
  const [revealCorrect, setRevealCorrect] = useState<number | null>(null);
  const [bestScore, setBestScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(BEST_KEY);
      if (saved) setBestScore(parseInt(saved, 10) || 0);
    }
  }, []);

  const endQuiz = useCallback((finalScore: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('end');
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(BEST_KEY);
      const prev = saved ? parseInt(saved, 10) || 0 : 0;
      if (finalScore > prev) {
        localStorage.setItem(BEST_KEY, String(finalScore));
        setBestScore(finalScore);
      }
    }
  }, []);

  const goNextQuestion = useCallback((nextIdx: number, currentScore: number) => {
    if (nextIdx >= TOTAL_QUESTIONS) {
      endQuiz(currentScore);
      return;
    }
    setCurrentIdx(nextIdx);
    setFlash(null);
    setRevealCorrect(null);
    setAnswered(false);
  }, [endQuiz]);

  const startQuiz = () => {
    const all = getAllQuestions();
    const picked = pickRandom(all, Math.min(TOTAL_QUESTIONS, all.length));
    setQuestions(picked);
    setCurrentIdx(0);
    setScore(0);
    setTimeLeft(TOTAL_TIME);
    setFlash(null);
    setRevealCorrect(null);
    setAnswered(false);
    setPhase('quiz');
  };

  // Timer countdown
  useEffect(() => {
    if (phase !== 'quiz') return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setPhase('end');
          // save best
          setScore((s) => {
            if (typeof window !== 'undefined') {
              const saved = localStorage.getItem(BEST_KEY);
              const prev = saved ? parseInt(saved, 10) || 0 : 0;
              if (s > prev) {
                localStorage.setItem(BEST_KEY, String(s));
                setBestScore(s);
              }
            }
            return s;
          });
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  const handleAnswer = (optionIdx: number) => {
    if (answered || phase !== 'quiz') return;
    setAnswered(true);

    const q = questions[currentIdx];
    const isCorrect = optionIdx === q.correctIndex;

    if (isCorrect) {
      setFlash('correct');
      setScore((s) => {
        const ns = s + 10;
        if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
        flashTimerRef.current = setTimeout(() => {
          goNextQuestion(currentIdx + 1, ns);
        }, 300);
        return ns;
      });
    } else {
      setFlash('wrong');
      setRevealCorrect(q.correctIndex);
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
      flashTimerRef.current = setTimeout(() => {
        setScore((s) => {
          goNextQuestion(currentIdx + 1, s);
          return s;
        });
      }, WRONG_SHOW_MS);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    };
  }, []);

  const stars = getStars(score);
  const currentQ = questions[currentIdx];

  // ── Start screen ────────────────────────────────────────────────────────────
  if (phase === 'start') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
          <div className="text-6xl mb-4">⚡</div>
          <h1 className="text-3xl font-bold mb-2">Quiz Relâmpago</h1>
          <p className="text-muted-foreground mb-6">
            Teste seus conhecimentos contra o relógio!
          </p>

          <div className="bg-muted/30 rounded-xl p-4 mb-6 text-left space-y-2">
            <p className="text-sm font-semibold text-foreground mb-2">Regras:</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>⏱️</span>
              <span>60 segundos para responder tudo</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>❓</span>
              <span>10 perguntas aleatórias</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>✅</span>
              <span>Acerto: +10 pontos, próxima pergunta imediatamente</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>❌</span>
              <span>Erro: mostra a resposta por 0.8s, depois avança</span>
            </div>
          </div>

          {bestScore > 0 && (
            <p className="text-sm text-muted-foreground mb-4">
              🏆 Melhor pontuação: <span className="font-bold text-primary">{bestScore}/100</span>
            </p>
          )}

          <button
            onClick={startQuiz}
            className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors"
          >
            Começar ⚡
          </button>
        </div>
      </div>
    );
  }

  // ── End screen ───────────────────────────────────────────────────────────────
  if (phase === 'end') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
          <div className="text-6xl mb-4">
            {stars === 3 ? '🏆' : stars === 2 ? '⭐' : stars === 1 ? '🎯' : '😅'}
          </div>
          <h2 className="text-2xl font-bold mb-1">Quiz Finalizado!</h2>
          <p className="text-4xl font-bold text-primary my-4">{score}/100 pontos</p>

          {/* Stars */}
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={`text-3xl transition-all ${n <= stars ? 'opacity-100' : 'opacity-20'}`}
              >
                ⭐
              </span>
            ))}
          </div>

          <p className="text-muted-foreground mb-2">
            {stars === 3
              ? 'Excelente! Você mandou muito bem! 🔥'
              : stars === 2
              ? 'Bom trabalho! Continue praticando!'
              : stars === 1
              ? 'Você conseguiu! Tente melhorar da próxima vez.'
              : 'Não desanime, tente de novo!'}
          </p>

          {score > bestScore && (
            <p className="text-sm font-semibold text-emerald-400 mb-4">
              🎉 Novo recorde pessoal!
            </p>
          )}
          {score <= bestScore && bestScore > 0 && (
            <p className="text-sm text-muted-foreground mb-4">
              Melhor pontuação: <span className="font-bold">{bestScore}/100</span>
            </p>
          )}

          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={startQuiz}
              className="w-full py-2.5 px-6 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              ⚡ Jogar novamente
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

  // ── Quiz screen ──────────────────────────────────────────────────────────────
  const timerColor =
    timeLeft < 10 ? 'text-red-500' : timeLeft < 20 ? 'text-amber-400' : 'text-foreground';

  const flashBg =
    flash === 'correct'
      ? 'bg-emerald-500/10 border-emerald-500/50'
      : flash === 'wrong'
      ? 'bg-red-500/10 border-red-500/50'
      : 'bg-card border-border';

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div
        className={`border rounded-2xl p-6 max-w-lg w-full shadow-lg transition-all duration-300 ${flashBg}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              {currentIdx + 1}/{questions.length}
            </span>
          </div>
          <div className={`text-4xl font-bold tabular-nums ${timerColor}`}>
            {timeLeft}s
          </div>
          <div className="text-sm font-semibold text-primary">
            {score} pontos
          </div>
        </div>

        {/* Timer bar */}
        <div className="w-full bg-muted/40 rounded-full h-1.5 mb-6 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              timeLeft < 10 ? 'bg-red-500' : 'bg-primary'
            }`}
            style={{ width: `${(timeLeft / TOTAL_TIME) * 100}%` }}
          />
        </div>

        {/* Question */}
        {currentQ && (
          <>
            <p className="text-xl font-semibold mb-6 leading-snug">{currentQ.question}</p>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                let btnClass =
                  'w-full text-left px-4 py-3 rounded-xl border font-medium text-sm transition-all ';

                if (answered) {
                  if (idx === currentQ.correctIndex) {
                    btnClass += 'bg-emerald-500/20 border-emerald-500 text-emerald-400';
                  } else if (flash === 'wrong' && revealCorrect !== null && idx !== currentQ.correctIndex) {
                    btnClass += 'bg-muted/30 border-border/40 text-muted-foreground opacity-50';
                  } else {
                    btnClass += 'bg-muted/30 border-border/40 text-muted-foreground opacity-50';
                  }
                } else {
                  btnClass +=
                    'bg-muted/30 border-border hover:bg-primary/10 hover:border-primary/50 hover:text-foreground text-foreground cursor-pointer';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={answered}
                    className={btnClass}
                  >
                    <span className="font-bold mr-2 text-muted-foreground">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
