'use client';

import React from 'react';
import { Atom, Play, BookOpen, Clock } from 'lucide-react';

interface QuizIntroProps {
  onStart: () => void;
}

export const QuizIntro: React.FC<QuizIntroProps> = ({ onStart }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-blue-100 rounded-full">
            <Atom className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Nuclear Isotopes Quiz
        </h1>
        <p className="text-gray-600 text-lg">
          Test your knowledge of nuclear technology and isotopes
        </p>
      </div>

      {/* Quiz Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
          <BookOpen className="w-8 h-8 text-blue-600 mb-2" />
          <div className="font-semibold text-gray-800">12 Questions</div>
          <div className="text-sm text-gray-600">Multiple topics</div>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
          <Clock className="w-8 h-8 text-green-600 mb-2" />
          <div className="font-semibold text-gray-800">No Time Limit</div>
          <div className="text-sm text-gray-600">Take your time</div>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
          <Atom className="w-8 h-8 text-purple-600 mb-2" />
          <div className="font-semibold text-gray-800">Periodic Table</div>
          <div className="text-sm text-gray-600">Element symbols & structure</div>
        </div>
      </div>

      {/* Topics Covered */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Topics Covered</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-blue-50 p-3 rounded-lg text-blue-800">
            🧪 Periodic Table Symbols
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-green-800">
            ⚛️ Atomic Structure
          </div>
          <div className="bg-purple-50 p-3 rounded-lg text-purple-800">
            ⏱️ Half-life & Decay
          </div>
          <div className="bg-orange-50 p-3 rounded-lg text-orange-800">
            🔬 Element Categories
          </div>
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={onStart}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center space-x-3 mx-auto text-lg"
      >
        <Play className="w-6 h-6" />
        <span>Start Quiz</span>
      </button>
    </div>
  );
};
