'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

interface OnboardingQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number | null; // null = no wrong answer (opinion)
  explanation?: string;
}

const questions: OnboardingQuestion[] = [
  {
    id: 'q1',
    question: 'Você já programou antes?',
    options: [
      'Nunca',
      'Um pouco',
      'Sim, tenho experiência',
      'Sou desenvolvedor',
    ],
    correctIndex: null, // opinion question
  },
  {
    id: 'q2',
    question: 'O que é uma variável?',
    options: [
      'Um tipo de loop que se repete várias vezes',
      'Um espaço na memória que armazena um valor com um nome',
      'Uma função que retorna um resultado',
      'Um arquivo de configuração do sistema',
    ],
    correctIndex: 1,
    explanation:
      'Uma variável é um espaço nomeado na memória do computador que armazena um valor. Esse valor pode ser alterado ao longo do programa.',
  },
  {
    id: 'q3',
    question: 'O que este código faz? print(\'Olá\')',
    options: [
      'Salva a palavra "Olá" em um arquivo',
      'Cria uma variável chamada Olá',
      'Exibe a mensagem "Olá" na tela',
      'Apaga a tela do computador',
    ],
    correctIndex: 2,
    explanation:
      'A função print() exibe uma mensagem na tela (saída padrão). Então print(\'Olá\') imprime a palavra "Olá" no terminal.',
  },
  {
    id: 'q4',
    question: 'O que é um loop (laço)?',
    options: [
      'Um erro que faz o programa travar',
      'Uma estrutura que repete um bloco de código várias vezes',
      'Um tipo de variável que muda de valor',
      'Um comando para parar o programa',
    ],
    correctIndex: 1,
    explanation:
      'Um loop (laço de repetição) é uma estrutura que executa um bloco de código repetidamente até que uma condição seja satisfeita.',
  },
  {
    id: 'q5',
    question: 'Qual é o seu objetivo ao aprender programação?',
    options: [
      'Aprender por hobby / curiosidade',
      'Mudar de carreira para a área de tecnologia',
      'Faculdade / escola (projeto ou matéria)',
      'Criar projetos pessoais ou freelancer',
    ],
    correctIndex: null, // opinion question
  },
];

interface RecommendedModule {
  id: string;
  title: string;
  description: string;
}

function getRecommendation(correctAnswers: number): {
  message: string;
  module: RecommendedModule;
} {
  if (correctAnswers <= 1) {
    return {
      message: 'Perfeito! Você está no lugar certo para começar do zero.',
      module: {
        id: 'intro',
        title: 'Introdução à Programação',
        description: 'Comece entendendo o que é programação, algoritmos e como os computadores funcionam.',
      },
    };
  } else if (correctAnswers <= 3) {
    return {
      message: 'Bom! Você já tem alguma intuição de programação.',
      module: {
        id: 'logica',
        title: 'Lógica de Programação',
        description: 'Aprenda a pensar computacionalmente com fluxogramas, algoritmos e estruturas de decisão.',
      },
    };
  } else {
    return {
      message: 'Ótimo! Você já tem uma base sólida.',
      module: {
        id: 'python',
        title: 'Python: Primeiros Passos',
        description: 'Mergulhe em uma linguagem popular e versátil para aprofundar seus conhecimentos.',
      },
    };
  }
}

export default function OnboardingQuiz() {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<'answering' | 'showingAnswer'>('answering');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    try {
      const onboarded = localStorage.getItem('codlearn_onboarded');
      if (!onboarded) {
        setVisible(true);
      }
    } catch {
      // ignore
    }
  }, []);

  if (!visible) return null;

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const isOpinionQuestion = currentQuestion.correctIndex === null;

  function handleSelect(idx: number) {
    if (phase !== 'answering') return;
    setSelectedIndex(idx);

    if (isOpinionQuestion) {
      // Opinion questions are never "wrong"
      setPhase('showingAnswer');
    } else {
      const isCorrect = idx === currentQuestion.correctIndex;
      if (isCorrect) setCorrectAnswers((c) => c + 1);
      setPhase('showingAnswer');
    }
  }

  function handleNext() {
    if (isLastQuestion) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setPhase('answering');
    }
  }

  function handleClose() {
    try {
      localStorage.setItem('codlearn_onboarded', 'true');
    } catch {
      // ignore
    }
    setVisible(false);
  }

  function getOptionClasses(idx: number): string {
    const base =
      'w-full text-left border rounded-lg p-3.5 transition-all duration-200 flex items-center gap-3 text-sm';

    if (phase === 'answering') {
      if (selectedIndex === idx) {
        return `${base} border-primary bg-primary/5 ring-2 ring-primary/20 cursor-pointer`;
      }
      return `${base} border-border hover:border-primary/50 hover:bg-muted/50 cursor-pointer`;
    }

    if (isOpinionQuestion) {
      if (selectedIndex === idx) {
        return `${base} border-primary bg-primary/10`;
      }
      return `${base} border-border opacity-50`;
    }

    const isCorrect = idx === currentQuestion.correctIndex;
    const isSelected = idx === selectedIndex;

    if (isCorrect) {
      return `${base} border-green-500 bg-green-500/10 text-green-700 dark:text-green-300`;
    }
    if (isSelected && !isCorrect) {
      return `${base} border-red-500 bg-red-500/10 text-red-700 dark:text-red-300`;
    }
    return `${base} border-border opacity-50`;
  }

  function getOptionIcon(idx: number) {
    if (phase !== 'showingAnswer' || isOpinionQuestion) return null;
    const isCorrect = idx === currentQuestion.correctIndex;
    const isSelected = idx === selectedIndex;
    if (isCorrect) return <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />;
    if (isSelected && !isCorrect) return <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />;
    return null;
  }

  const recommendation = getRecommendation(correctAnswers);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {!finished ? (
            <>
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1">
                  Bem-vindo ao{' '}
                  <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                    CodLearn
                  </span>
                  !
                </h2>
                <p className="text-muted-foreground text-sm">
                  Responda algumas perguntas para personalizarmos sua experiência.
                </p>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-2 mb-6">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i < currentIndex
                        ? 'bg-primary'
                        : i === currentIndex
                        ? 'bg-primary/40'
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              {/* Question */}
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Pergunta {currentIndex + 1} de {totalQuestions}
              </p>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {currentQuestion.question}
              </h3>

              {/* Options */}
              <div className="space-y-2 mb-4">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={phase === 'showingAnswer'}
                    className={getOptionClasses(idx)}
                  >
                    {getOptionIcon(idx)}
                    <span className="flex-1">{option}</span>
                  </button>
                ))}
              </div>

              {/* Explanation */}
              {phase === 'showingAnswer' && currentQuestion.explanation && (
                <div className="mb-4 p-3 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Explicação: </span>
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              {/* Next */}
              {phase === 'showingAnswer' && (
                <button
                  onClick={handleNext}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-medium"
                >
                  {isLastQuestion ? 'Ver resultado' : 'Próxima'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {/* Skip */}
              {phase === 'answering' && (
                <button
                  onClick={handleClose}
                  className="w-full mt-2 text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Explorar por conta
                </button>
              )}
            </>
          ) : (
            /* Results */
            <>
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🎯</div>
                <h2 className="text-2xl font-bold mb-2">Avaliação concluída!</h2>
                <p className="text-muted-foreground">{recommendation.message}</p>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
                <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">
                  Módulo recomendado
                </p>
                <h3 className="font-bold text-lg mb-1">{recommendation.module.title}</h3>
                <p className="text-sm text-muted-foreground">{recommendation.module.description}</p>
              </div>

              <div className="space-y-3">
                <Link
                  href={`/modulo/${recommendation.module.id}`}
                  onClick={handleClose}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-medium"
                >
                  Ir para o módulo recomendado
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={handleClose}
                  className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Explorar por conta
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
