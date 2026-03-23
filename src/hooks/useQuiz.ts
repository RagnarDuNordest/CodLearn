'use client';

import { useState, useCallback } from 'react';
import { Quiz } from '@/types/quiz';

type QuizPhase = 'answering' | 'showingAnswer' | 'finished';

interface QuizState {
  currentQuestionIndex: number;
  selectedOptionId: string | null;
  answers: Record<string, string>;
  phase: QuizPhase;
  score: number;
}

export function useQuiz(quiz: Quiz) {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedOptionId: null,
    answers: {},
    phase: 'answering',
    score: 0,
  });

  const currentQuestion = quiz.questions[state.currentQuestionIndex];
  const isCorrect = state.selectedOptionId === currentQuestion?.correctOptionId;
  const isLastQuestion = state.currentQuestionIndex === quiz.questions.length - 1;
  const passed = state.score >= quiz.passingScore;

  const selectOption = useCallback(
    (optionId: string) => {
      if (state.phase !== 'answering') return;

      const correct = optionId === currentQuestion.correctOptionId;
      setState((prev) => ({
        ...prev,
        selectedOptionId: optionId,
        phase: 'showingAnswer',
        answers: { ...prev.answers, [currentQuestion.id]: optionId },
        score: correct ? prev.score + 1 : prev.score,
      }));
    },
    [state.phase, currentQuestion]
  );

  const nextQuestion = useCallback(() => {
    if (isLastQuestion) {
      setState((prev) => ({ ...prev, phase: 'finished' }));
    } else {
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedOptionId: null,
        phase: 'answering',
      }));
    }
  }, [isLastQuestion]);

  const restart = useCallback(() => {
    setState({
      currentQuestionIndex: 0,
      selectedOptionId: null,
      answers: {},
      phase: 'answering',
      score: 0,
    });
  }, []);

  return {
    currentQuestion,
    currentQuestionIndex: state.currentQuestionIndex,
    totalQuestions: quiz.questions.length,
    selectedOptionId: state.selectedOptionId,
    phase: state.phase,
    score: state.score,
    isCorrect,
    isLastQuestion,
    passed,
    passingScore: quiz.passingScore,
    selectOption,
    nextQuestion,
    restart,
  };
}
