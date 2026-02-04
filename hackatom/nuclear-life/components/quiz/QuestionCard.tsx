'use client';

import React from 'react';
import { Question } from '../../types/quiz';
import { AtomicDiagram } from './AtomicDiagram';
import { CheckCircle, XCircle, Info } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  showResult: boolean;
  onAnswerSelect: (answerIndex: number) => void;
  showExplanation: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  showResult,
  onAnswerSelect,
  showExplanation,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-500">Question {question.id}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </span>
        </div>
        <div className="text-sm text-gray-500 capitalize">
          {question.type.replace('-', ' ')}
        </div>
      </div>

      {/* Atomic Diagram */}
      <div className="mb-8">
        <AtomicDiagram 
          isotope={question.isotope} 
          animated={true}
          size="large"
        />
      </div>

      {/* Question */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {question.question}
        </h2>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          const isWrong = showResult && isSelected && !isCorrect;
          const shouldHighlight = showResult && isCorrect;

          return (
            <button
              key={index}
              onClick={() => !showResult && onAnswerSelect(index)}
              disabled={showResult}
              className={`
                p-4 rounded-lg border-2 text-left transition-all duration-200 transform hover:scale-105
                ${isSelected && !showResult ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                ${shouldHighlight ? 'border-green-500 bg-green-50' : ''}
                ${isWrong ? 'border-red-500 bg-red-50' : ''}
                ${!showResult ? 'hover:border-blue-300 hover:bg-blue-25 cursor-pointer' : 'cursor-default'}
                disabled:transform-none
              `}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800">{option}</span>
                {showResult && (
                  <div className="flex items-center space-x-2">
                    {shouldHighlight && <CheckCircle className="w-5 h-5 text-green-500" />}
                    {isWrong && <XCircle className="w-5 h-5 text-red-500" />}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && showResult && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Explanation</h4>
              <p className="text-blue-700 text-sm">{question.explanation}</p>
              {question.isotope.applications && (
                <div className="mt-3">
                  <p className="font-medium text-blue-800 text-sm">Applications:</p>
                  <ul className="list-disc list-inside text-blue-700 text-sm mt-1">
                    {question.isotope.applications.map((app, index) => (
                      <li key={index}>{app}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
