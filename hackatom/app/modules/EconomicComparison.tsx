
'use client';

import { useState } from 'react';

export default function EconomicComparison() {
  const [selectedApplication, setSelectedApplication] = useState('medical');
  const [draggedItem, setDraggedItem] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);

  const applications = {
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
        portability: 'High',
        defectionRate: '99.5%',
        maintenance: 'Low'
      },
      alternative: 'X-Ray Testing',
      alternativeMethod: {
        cost: '$400/inspection',
        portability: 'Low',
        defectionRate: '95%',
        maintenance: 'High'
      }
    }
  };

  const matchingItems = [
    { id: 1, isotope: 'Tc-99m', benefit: 'Cost-effective medical imaging' },
    { id: 2, isotope: 'Co-60', benefit: 'Portable industrial testing' },
    { id: 3, isotope: 'I-131', benefit: 'Targeted thyroid treatment' },
    { id: 4, isotope: 'Cs-137', benefit: 'Precise material gauging' }
  ];

  const roiCalculator = {
    medicalImaging: { investment: 50000, annualSavings: 25000, patients: 500 },
    foodIrradiation: { investment: 200000, annualSavings: 150000, tonnage: 1000 },
    industrialTesting: { investment: 75000, annualSavings: 40000, inspections: 800 }
  };

  const calculateROI = (investment, annualSavings) => {
    const paybackPeriod = investment / annualSavings;
    const roi = (annualSavings / investment) * 100;
    return { paybackPeriod: paybackPeriod.toFixed(1), roi: roi.toFixed(1) };
  };

  return (
    <div className="space-y-8">
      {/* Cost Comparison Tool */}
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Economic Comparison Tool</h2>
        
        <div className="flex flex-wrap gap-4 mb-8">
          {Object.keys(applications).map((app) => (
            <button
              key={app}
              onClick={() => setSelectedApplication(app)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                selectedApplication === app
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {applications[app].title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
              <i className="ri-radioactive-line mr-2"></i>
              {applications[selectedApplication].isotope} Method
            </h3>
            <div className="space-y-3">
              {Object.entries(applications[selectedApplication].isotopeMethod).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-green-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                  <span className="font-semibold text-green-800">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center">
              <i className="ri-tools-line mr-2"></i>
              {applications[selectedApplication].alternative} Method
            </h3>
            <div className="space-y-3">
              {Object.entries(applications[selectedApplication].alternativeMethod).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-red-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                  <span className="font-semibold text-red-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ROI Calculator */}
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Return on Investment Calculator</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(roiCalculator).map(([key, data]) => {
            const { paybackPeriod, roi } = calculateROI(data.investment, data.annualSavings);
            return (
              <div key={key} className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Initial Investment:</span>
                    <span className="font-medium">${data.investment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Savings:</span>
                    <span className="font-medium text-green-600">${data.annualSavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payback Period:</span>
                    <span className="font-bold text-indigo-600">{paybackPeriod} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual ROI:</span>
                    <span className="font-bold text-green-600">{roi}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Drag and Drop Activity */}
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Match Isotopes with Economic Benefits</h3>
        <p className="text-gray-600 mb-6">Drag isotopes to their corresponding economic benefits</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Isotopes</h4>
            <div className="space-y-3">
              {matchingItems.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => setDraggedItem(item)}
                  className={`p-4 rounded-lg border-2 border-dashed cursor-move transition-colors ${
                    matchedPairs.find(pair => pair.id === item.id)
                      ? 'bg-green-100 border-green-300 text-green-800'
                      : 'bg-indigo-100 border-indigo-300 hover:bg-indigo-200'
                  }`}
                >
                  {item.isotope}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Economic Benefits</h4>
            <div className="space-y-3">
              {matchingItems.map((item) => (
                <div
                  key={`benefit-${item.id}`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (draggedItem && draggedItem.id === item.id) {
                      setMatchedPairs([...matchedPairs, item]);
                      setDraggedItem(null);
                    }
                  }}
                  className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
                    matchedPairs.find(pair => pair.id === item.id)
                      ? 'bg-green-100 border-green-300 text-green-800'
                      : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {item.benefit}
                  {matchedPairs.find(pair => pair.id === item.id) && (
                    <i className="ri-checkbox-circle-fill text-green-600 ml-2"></i>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {matchedPairs.length === matchingItems.length && (
          <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
            <i className="ri-trophy-line mr-2"></i>
            Excellent! You've successfully matched all isotopes with their economic benefits.
          </div>
        )}
      </div>
    </div>
  );
}
