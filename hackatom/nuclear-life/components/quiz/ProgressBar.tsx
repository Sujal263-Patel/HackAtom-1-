'use client';

import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  score: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, score }) => {
  const progressPercentage = (current / total) * 100;
  const scorePercentage = total > 0 ? (score / total) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-600">
            Question {current} of {total}
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Score:</span>
            <span className="text-lg font-bold text-blue-600">{score}/{total}</span>
            <span className="text-sm text-gray-500">({scorePercentage.toFixed(0)}%)</span>
          </div>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>Progress: {progressPercentage.toFixed(0)}%</span>
        <span>
          {score > 0 && (
            <span className="text-green-600 font-medium">
              ✓ {score} correct
            </span>
          )}
        </span>
      </div>
    </div>
  );
};
