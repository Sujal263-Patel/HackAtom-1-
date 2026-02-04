'use client';

import { useState } from 'react';
import { QuizState } from '../types/quiz';
import { questions } from '../lib/isotopes';

export const useQuiz = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    answers: new Array(questions.length).fill(null),
    timeRemaining: 0,
    isComplete: false,
    showExplanation: false,
  });

  const [hasStarted, setHasStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const startQuiz = () => {
    setHasStarted(true);
    setQuizState({
      currentQuestion: 0,
      score: 0,
      answers: new Array(questions.length).fill(null),
      timeRemaining: 0,
      isComplete: false,
      showExplanation: false,
    });
    setShowResult(false);
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestion] = answerIndex;
    
    const isCorrect = answerIndex === questions[quizState.currentQuestion].correctAnswer;
    const newScore = isCorrect ? quizState.score + 1 : quizState.score;

    setQuizState((prev: QuizState) => ({
      ...prev,
      answers: newAnswers,
      score: newScore,
      showExplanation: true,
    }));

    setShowResult(true);
  };

  const nextQuestion = () => {
    const nextIndex = quizState.currentQuestion + 1;
    
    if (nextIndex >= questions.length) {
      setQuizState((prev: QuizState) => ({
        ...prev,
        isComplete: true,
      }));
    } else {
      setQuizState((prev: QuizState) => ({
        ...prev,
        currentQuestion: nextIndex,
        showExplanation: false,
      }));
      setShowResult(false);
    }
  };

  const restartQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      score: 0,
      answers: new Array(questions.length).fill(null),
      timeRemaining: 0,
      isComplete: false,
      showExplanation: false,
    });
    setHasStarted(false);
    setShowResult(false);
  };

  return {
    quizState,
    hasStarted,
    showResult,
    startQuiz,
    selectAnswer,
    nextQuestion,
    restartQuiz,
  };
};
