'use client';

import React from 'react';
import { useQuiz } from '../../hooks/useQuiz';
import { QuizIntro } from './QuizIntro';
import { QuestionCard } from './QuestionCard';
import { ProgressBar } from './ProgressBar';
import { QuizResults } from './QuizResults';
import { questions } from '../../lib/isotopes';
import { ChevronRight, Home } from 'lucide-react';

export function QuizApp() {
  const {
    quizState,
    hasStarted,
    showResult,
    startQuiz,
    selectAnswer,
    nextQuestion,
    restartQuiz,
  } = useQuiz();

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <QuizIntro onStart={startQuiz} />
        </div>
      </div>
    );
  }

  if (quizState.isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <QuizResults
            quizState={quizState}
            totalQuestions={questions.length}
            onRestart={restartQuiz}
          />
        </div>
      </div>
    );
  }

  const currentQuestion = questions[quizState.currentQuestion];
  const selectedAnswer = quizState.answers[quizState.currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <button
              onClick={restartQuiz}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Start</span>
            </button>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Nuclear Isotopes Quiz</h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>

        {/* Progress */}
        <ProgressBar
          current={quizState.currentQuestion + 1}
          total={questions.length}
          score={quizState.score}
        />

        {/* Question */}
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          onAnswerSelect={selectAnswer}
          showExplanation={quizState.showExplanation}
        />

        {/* Navigation */}
        {showResult && (
          <div className="flex justify-center mt-8">
            <button
              onClick={nextQuestion}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <span>
                {quizState.currentQuestion + 1 >= questions.length ? 'View Results' : 'Next Question'}
              </span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
