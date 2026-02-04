'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import IsotopeCostAnalyzer from './IsotopeCostAnalyzer';

export default function AnalysisPage() {
  const [isReading, setIsReading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const readText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsReading(true);
      utterance.onend = () => setIsReading(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopReading = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsReading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" suppressHydrationWarning={true}>
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Isotope Cost Analysis Tool</h1>
            <p className="text-gray-600">Comprehensive analysis of isotope economics, profitability, and future projections</p>
          </div>
          {isMounted && (
            <div className="flex gap-3">
              <button
                onClick={() => readText("Welcome to the Isotope Cost Analysis Tool. This comprehensive tool helps you analyze isotope economics including life span, pricing statistics, future projections, profitability analysis, and application sectors with detailed graphical representations.")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  isReading ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                <i className={`ri-${isReading ? 'stop' : 'volume-up'}-line mr-2`}></i>
                {isReading ? 'Stop Reading' : 'Read Page'}
              </button>
            </div>
          )}
        </div>

        <IsotopeCostAnalyzer />

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/modules" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
              Learn Basics
            </Link>
            <Link href="/dashboard" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
              View Dashboard
            </Link>
            <Link href="/resources" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
              Research Papers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}