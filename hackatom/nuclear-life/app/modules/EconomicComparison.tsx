'use client';

import { useState } from 'react';

interface MethodData {
  [key: string]: string;
}

interface ApplicationData {
  title: string;
  isotope: string;
  isotopeMethod: MethodData;
  alternative: string;
  alternativeMethod: MethodData;
}

interface Applications {
  medical: ApplicationData;
  agriculture: ApplicationData;
  industry: ApplicationData;
}

interface MatchItem {
  id: number;
  isotope: string;
  benefit: string;
}

export default function EconomicComparison() {
  const [selectedApplication, setSelectedApplication] = useState<keyof Applications>('medical');
  const [draggedItem, setDraggedItem] = useState<MatchItem | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<MatchItem[]>([]);

  const applications: Applications = {
    medical: {
      title: 'Medical Applications',
      isotope: 'Technetium-99m',
      isotopeMethod: {
        cost: '$150/procedure',
        accuracy: '95%',
        timeRequired: '2 hours',
        sideEffects: 'Minimal'
      },
      alternative: 'CT Scan',
      alternativeMethod: {
        cost: '$1,200/procedure',
        accuracy: '85%',
        timeRequired: '4 hours',
        sideEffects: 'Radiation exposure'
      }
    },
    agriculture: {
      title: 'Food Preservation',
      isotope: 'Gamma Irradiation',
      isotopeMethod: {
        cost: '$0.05/lb',
        shelfLife: '300% increase',
        energyUse: '90% less',
        chemicals: 'None required'
      },
      alternative: 'Chemical Treatment',
      alternativeMethod: {
        cost: '$0.12/lb',
        shelfLife: '50% increase',
        energyUse: 'Standard',
        chemicals: 'Multiple required'
      }
    },
    industry: {
      title: 'Non-Destructive Testing',
      isotope: 'Cobalt-60',
      isotopeMethod: {
        cost: '$200/inspection',
        accuracy: '99%',
        timeRequired: '1 hour',
        safety: 'High'
      },
      alternative: 'X-Ray Testing',
      alternativeMethod: {
        cost: '$500/inspection',
        accuracy: '80%',
        timeRequired: '3 hours',
        safety: 'Medium'
      }
    }
  };

  const calculateROI = (investment: number, annualSavings: number) => {
    const paybackPeriod = investment / annualSavings;
    const roi = (annualSavings / investment) * 100;
    return { paybackPeriod: paybackPeriod.toFixed(1), roi: roi.toFixed(1) };
  };

  const matchingGame = [
    { id: 1, isotope: 'Tc-99m', benefit: 'Medical Imaging' },
    { id: 2, isotope: 'Co-60', benefit: 'Cancer Treatment' },
    { id: 3, isotope: 'I-131', benefit: 'Thyroid Treatment' },
    { id: 4, isotope: 'Cs-137', benefit: 'Industrial Gauging' }
  ];

  return (
    <div className="space-y-8">
      {/* Application Selection */}
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Economic Comparison Tool</h2>
        <p className="text-gray-600 mb-6">
          Compare nuclear isotope applications with traditional alternatives across different sectors.
        </p>
        
        <div className="flex flex-wrap gap-4 mb-8">
          {Object.keys(applications).map((app) => (
            <button
              key={app}
              onClick={() => setSelectedApplication(app as keyof Applications)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedApplication === app
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {applications[app as keyof Applications].title}
            </button>
          ))}
        </div>

        {/* Comparison Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Nuclear Method */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h4 className="text-lg font-semibold text-green-900 mb-4">
              {applications[selectedApplication].isotope} Method
            </h4>
            <div className="space-y-3">
              {Object.entries(applications[selectedApplication].isotopeMethod).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="font-semibold text-green-800">{value as string}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alternative Method */}
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h4 className="text-lg font-semibold text-red-900 mb-4">
              {applications[selectedApplication].alternative} Method
            </h4>
            <div className="space-y-3">
              {Object.entries(applications[selectedApplication].alternativeMethod).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="font-semibold text-red-800">{value as string}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Economic Analysis */}
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Economic Impact Analysis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Cost Savings</h4>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {selectedApplication === 'medical' && '87%'}
              {selectedApplication === 'agriculture' && '58%'}
              {selectedApplication === 'industry' && '60%'}
            </div>
            <div className="text-gray-600 text-sm">vs traditional methods</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Efficiency Gain</h4>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {selectedApplication === 'medical' && '300%'}
              {selectedApplication === 'agriculture' && '250%'}
              {selectedApplication === 'industry' && '200%'}
            </div>
            <div className="text-gray-600 text-sm">productivity increase</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">ROI Timeline</h4>
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {selectedApplication === 'medical' && '2.3'}
              {selectedApplication === 'agriculture' && '1.8'}
              {selectedApplication === 'industry' && '2.1'}
            </div>
            <div className="text-gray-600 text-sm">years payback period</div>
          </div>
        </div>
      </div>

      {/* Interactive Matching Game */}
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Isotope Application Matching</h3>
        <p className="text-gray-600 mb-6">
          Drag and drop isotopes to their primary applications. Test your knowledge!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Isotopes */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Isotopes</h4>
            <div className="space-y-3">
              {matchingGame.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => setDraggedItem(item)}
                  className={`p-4 rounded-lg border-2 cursor-grab active:cursor-grabbing transition-all ${
                    matchedPairs.find(pair => pair.id === item.id)
                      ? 'border-green-500 bg-green-50 opacity-50'
                      : 'border-gray-200 bg-white hover:border-indigo-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{item.isotope}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Applications */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Applications</h4>
            <div className="space-y-3">
              {matchingGame.map((item) => (
                <div
                  key={item.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (draggedItem && draggedItem.id === item.id) {
                      setMatchedPairs([...matchedPairs, item]);
                      setDraggedItem(null);
                    }
                  }}
                  className={`p-4 rounded-lg border-2 transition-all min-h-[60px] flex items-center ${
                    matchedPairs.find(pair => pair.id === item.id)
                      ? 'border-green-500 bg-green-50'
                      : 'border-dashed border-gray-300 bg-gray-50'
                  }`}
                >
                  {matchedPairs.find(pair => pair.id === item.id) && (
                    <div className="font-semibold text-green-900">
                      ✓ {item.benefit}
                    </div>
                  )}
                  {!matchedPairs.find(pair => pair.id === item.id) && (
                    <div className="text-gray-500">{item.benefit}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {matchedPairs.length === matchingGame.length && (
          <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg">
            <div className="flex items-center text-green-800">
              <i className="ri-trophy-line mr-2 text-xl"></i>
              <span className="font-semibold">Congratulations! You matched all isotopes correctly!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
