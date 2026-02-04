
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import IsotopeBasics from './IsotopeBasics';
import EconomicComparison from './EconomicComparison';
import SectorApplications from './SectorApplications';

export default function ModulesPage() {
  const [activeModule, setActiveModule] = useState('basics');

  const modules = [
    { id: 'basics', title: 'Isotope Basics', icon: 'ri-atom-line' },
    { id: 'economics', title: 'Economic Comparison', icon: 'ri-line-chart-line' },
    { id: 'applications', title: 'Sector Applications', icon: 'ri-apps-line' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interactive Learning Modules</h1>
          <p className="text-gray-600">Master nuclear isotope economics through hands-on exploration</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Module Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Learning Path</h2>
              <div className="space-y-3">
                {modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      activeModule === module.id
                        ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-600'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                        activeModule === module.id ? 'bg-indigo-600' : 'bg-gray-400'
                      }`}>
                        <i className={`${module.icon} text-sm text-white`}></i>
                      </div>
                      <span className="font-medium">{module.title}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Link href="/analysis" className="block w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium text-center transition-colors whitespace-nowrap cursor-pointer">
                    Cost Analysis
                  </Link>
                  <Link href="/quiz" className="block w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-center transition-colors whitespace-nowrap cursor-pointer">
                    Take Quiz
                  </Link>
                  <Link href="/dashboard" className="block w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-center transition-colors whitespace-nowrap cursor-pointer">
                    View Data
                  </Link>
                  <Link href="/resources" className="block w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-center transition-colors whitespace-nowrap cursor-pointer">
                    Resources
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Module Content */}
          <div className="lg:col-span-3">
            {activeModule === 'basics' && <IsotopeBasics />}
            {activeModule === 'economics' && <EconomicComparison />}
            {activeModule === 'applications' && <SectorApplications />}
          </div>
        </div>
      </div>
    </div>
  );
}
