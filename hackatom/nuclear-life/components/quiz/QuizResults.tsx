'use client';

import React from 'react';
import { QuizState } from '../../types/quiz';
import { Trophy, RotateCcw, BookOpen, Target } from 'lucide-react';

interface QuizResultsProps {
  quizState: QuizState;
  totalQuestions: number;
  onRestart: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({ 
  quizState, 
  totalQuestions, 
  onRestart 
}) => {
  const percentage = (quizState.score / totalQuestions) * 100;
  
  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { grade: 'D', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const gradeInfo = getGrade(percentage);

  const getPerformanceMessage = (percentage: number) => {
    if (percentage >= 90) return "Outstanding! You have excellent knowledge of nuclear isotopes!";
    if (percentage >= 80) return "Great job! You have a solid understanding of nuclear technology!";
    if (percentage >= 70) return "Good work! You're developing strong knowledge in this area!";
    if (percentage >= 60) return "Not bad! Keep studying to improve your understanding!";
    return "Keep learning! Nuclear technology is complex but fascinating!";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="flex justify-center mb-4">
          <div className={`p-4 rounded-full ${gradeInfo.bg}`}>
            <Trophy className={`w-12 h-12 ${gradeInfo.color}`} />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
        <p className="text-gray-600">You've finished the Nuclear Isotopes Quiz</p>
      </div>

      {/* Score Display */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {quizState.score}
          </div>
          <div className="text-sm text-gray-600">Correct</div>
        </div>
        
        <div className="text-center">
          <div className={`text-3xl font-bold mb-1 ${gradeInfo.color}`}>
            {gradeInfo.grade}
          </div>
          <div className="text-sm text-gray-600">Grade</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800 mb-1">
            {percentage.toFixed(0)}%
          </div>
          <div className="text-sm text-gray-600">Score</div>
        </div>
      </div>

      {/* Performance Message */}
      <div className="mb-8">
        <div className="bg-gray-50 rounded-lg p-6">
          <BookOpen className="w-8 h-8 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-700 font-medium">
            {getPerformanceMessage(percentage)}
          </p>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
        <div className="bg-green-50 p-4 rounded-lg">
          <Target className="w-5 h-5 text-green-600 mx-auto mb-2" />
          <div className="font-semibold text-green-800">Accuracy</div>
          <div className="text-green-600">{percentage.toFixed(1)}%</div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <Trophy className="w-5 h-5 text-blue-600 mx-auto mb-2" />
          <div className="font-semibold text-blue-800">Questions</div>
          <div className="text-blue-600">{quizState.score} / {totalQuestions}</div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onRestart}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
      >
        <RotateCcw className="w-5 h-5" />
        <span>Take Quiz Again</span>
      </button>
    </div>
  );
};
