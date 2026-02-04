'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

export default function OverviewPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      category: "Learning & Education",
      items: [
        {
          href: '/modules',
          title: 'Interactive Learning Modules',
          description: 'Comprehensive lessons on isotope basics, economic analysis, and sector applications',
          color: 'indigo',
          icon: 'ri-book-open-line',
          complexity: 'Beginner to Advanced'
        },
        {
          href: '/simple-quiz',
          title: 'Quick Quiz (Classic)',
          description: 'Simple nuclear isotopes quiz with atomic diagrams and detailed explanations',
          color: 'blue',
          icon: 'ri-question-line',
          complexity: 'Beginner'
        },
        {
          href: '/quiz',
          title: 'Advanced Quiz System',
          description: 'Multi-level economics quiz with progress tracking, badges, and voice features',
          color: 'purple',
          icon: 'ri-trophy-line',
          complexity: 'Intermediate to Advanced'
        }
      ]
    },
    {
      category: "Analysis & Tools",
      items: [
        {
          href: '/analysis',
          title: 'Isotope Cost Analyzer',
          description: 'Comprehensive cost analysis with pricing statistics and market insights',
          color: 'green',
          icon: 'ri-bar-chart-2-line',
          complexity: 'Professional'
        },
        {
          href: '/manufacturing',
          title: 'Manufacturing Planner',
          description: 'Complete facility planning with costs, timeline, and risk assessments',
          color: 'orange',
          icon: 'ri-building-line',
          complexity: 'Professional'
        },
        {
          href: '/dashboard',
          title: 'Data Dashboard',
          description: 'Real-time isotope market data, trends, and economic indicators',
          color: 'cyan',
          icon: 'ri-dashboard-line',
          complexity: 'All Levels'
        }
      ]
    },
    {
      category: "Interactive Features",
      items: [
        {
          href: '/chatbot',
          title: 'AI Nuclear Assistant',
          description: 'Intelligent chatbot for questions about nuclear technology and economics',
          color: 'rose',
          icon: 'ri-robot-line',
          complexity: 'All Levels'
        },
        {
          href: '/search',
          title: 'Advanced Search',
          description: 'Powerful search across all isotope data, research, and applications',
          color: 'gray',
          icon: 'ri-search-line',
          complexity: 'All Levels'
        },
        {
          href: '/resources',
          title: 'Resource Library',
          description: 'Curated collection of papers, reports, and industry resources',
          color: 'amber',
          icon: 'ri-library-line',
          complexity: 'All Levels'
        }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      indigo: 'from-indigo-500 to-indigo-600 text-white',
      blue: 'from-blue-500 to-blue-600 text-white',
      purple: 'from-purple-500 to-purple-600 text-white',
      green: 'from-green-500 to-green-600 text-white',
      orange: 'from-orange-500 to-orange-600 text-white',
      cyan: 'from-cyan-500 to-cyan-600 text-white',
      rose: 'from-rose-500 to-rose-600 text-white',
      gray: 'from-gray-500 to-gray-600 text-white',
      amber: 'from-amber-500 to-amber-600 text-white'
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Unified Isotope Explorer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A comprehensive platform combining educational modules, interactive quizzes, 
            economic analysis tools, and professional planning resources for nuclear technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              ✨ Merged from 2 Applications
            </div>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full">
              🎓 Educational & Professional
            </div>
            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
              🚀 Next.js + React
            </div>
          </div>
        </div>

        {/* Feature Categories */}
        {features.map((category, categoryIndex) => (
          <div key={categoryIndex} className={`mb-16 transition-all duration-1000 delay-${categoryIndex * 200} ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {category.category}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item, index) => (
                <Link 
                  key={index}
                  href={item.href}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
                >
                  <div className={`bg-gradient-to-r ${getColorClasses(item.color)} p-6`}>
                    <div className="flex items-center justify-between mb-4">
                      <i className={`${item.icon} text-3xl`}></i>
                      <span className="text-sm opacity-90">{item.complexity}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                      <span>Explore Feature</span>
                      <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Quick Navigation */}
        <div className={`bg-white rounded-xl p-8 shadow-lg text-center transition-all duration-1000 delay-600 ${
          isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start Options</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/simple-quiz" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              🎯 Start with Basic Quiz
            </Link>
            <Link href="/modules" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              📚 Begin Learning Journey
            </Link>
            <Link href="/dashboard" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              📊 View Market Data
            </Link>
            <Link href="/analysis" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              💰 Analyze Costs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
