
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

export default function ManufacturingPage() {
  const [selectedIsotope, setSelectedIsotope] = useState('tc-99m');
  const [facilityType, setFacilityType] = useState('small');
  const [investmentAmount, setInvestmentAmount] = useState(100000000);
  const [timeHorizon, setTimeHorizon] = useState(10);
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

  const manufacturingData = {
    'tc-99m': {
      name: 'Technetium-99m Production Facility',
      description: 'Medical isotope generator and processing facility',
      costs: {
        small: { initial: 50000000, operating: 15000000, capacity: '5M Ci/year' },
        medium: { initial: 100000000, operating: 25000000, capacity: '15M Ci/year' },
        large: { initial: 200000000, operating: 40000000, capacity: '35M Ci/year' }
      },
      timeline: '2-3 years',
      regulations: ['Nuclear Regulatory Commission approval', 'Medical device manufacturing license', 'GMP compliance'],
      equipment: [
        { name: 'Mo-99/Tc-99m Generator Systems', cost: 10000000 },
        { name: 'Hot Cell Laboratory', cost: 15000000 },
        { name: 'Quality Control Systems', cost: 8000000 },
        { name: 'Packaging & Shipping Facility', cost: 5000000 }
      ],
      risks: [
        { type: 'Regulatory', probability: 'Medium', impact: 'High', mitigation: 'Early engagement with regulators' },
        { type: 'Supply Chain', probability: 'High', impact: 'Medium', mitigation: 'Multiple supplier contracts' },
        { type: 'Market Competition', probability: 'Medium', impact: 'Medium', mitigation: 'Differentiated service offerings' }
      ],
      revenue: { small: 30000000, medium: 85000000, large: 180000000 },
      profitMargin: 0.22
    },
    'co-60': {
      name: 'Cobalt-60 Production Facility',
      description: 'Nuclear reactor irradiation and processing facility',
      costs: {
        small: { initial: 75000000, operating: 20000000, capacity: '25K Ci/year' },
        medium: { initial: 150000000, operating: 35000000, capacity: '60K Ci/year' },
        large: { initial: 300000000, operating: 60000000, capacity: '120K Ci/year' }
      },
      timeline: '4-5 years',
      regulations: ['Nuclear reactor license', 'Radioactive material handling permit', 'Export/import licenses'],
      equipment: [
        { name: 'Research Reactor Access', cost: 80000000 },
        { name: 'Irradiation Facilities', cost: 25000000 },
        { name: 'Source Encapsulation', cost: 12000000 },
        { name: 'Storage & Transport Systems', cost: 8000000 }
      ],
      risks: [
        { type: 'Reactor Availability', probability: 'High', impact: 'High', mitigation: 'Multiple reactor partnerships' },
        { type: 'Security Requirements', probability: 'Medium', impact: 'High', mitigation: 'Comprehensive security plan' },
        { type: 'International Regulations', probability: 'Medium', impact: 'Medium', mitigation: 'Regulatory expertise' }
      ],
      revenue: { small: 45000000, medium: 110000000, large: 220000000 },
      profitMargin: 0.28
    },
    'pu-238': {
      name: 'Plutonium-238 Production Facility',
      description: 'Space-grade RTG fuel production facility',
      costs: {
        small: { initial: 300000000, operating: 50000000, capacity: '500 Ci/year' },
        medium: { initial: 500000000, operating: 80000000, capacity: '1K Ci/year' },
        large: { initial: 800000000, operating: 120000000, capacity: '2K Ci/year' }
      },
      timeline: '6-8 years',
      regulations: ['DOE security clearance', 'Nuclear material license', 'Export control compliance'],
      equipment: [
        { name: 'Neptunium Target Systems', cost: 100000000 },
        { name: 'High Security Hot Cells', cost: 80000000 },
        { name: 'Purification Systems', cost: 60000000 },
        { name: 'Pellet Fabrication', cost: 40000000 }
      ],
      risks: [
        { type: 'Security Clearance', probability: 'Medium', impact: 'High', mitigation: 'Government partnership' },
        { type: 'Limited Market', probability: 'Low', impact: 'High', mitigation: 'Long-term NASA contracts' },
        { type: 'Technical Complexity', probability: 'High', impact: 'High', mitigation: 'Expert team recruitment' }
      ],
      revenue: { small: 150000000, medium: 280000000, large: 520000000 },
      profitMargin: 0.35
    }
  };

  const currentData = manufacturingData[selectedIsotope];
  const currentCosts = currentData.costs[facilityType];

  const calculateFinancials = () => {
    const initialInvestment = currentCosts.initial;
    const annualOperating = currentCosts.operating;
    const annualRevenue = currentData.revenue[facilityType];
    const annualProfit = annualRevenue - annualOperating;
    const paybackPeriod = initialInvestment / annualProfit;
    const totalProfit = annualProfit * timeHorizon;
    const roi = ((totalProfit - initialInvestment) / initialInvestment) * 100;
    const npv = totalProfit - initialInvestment;

    return {
      initialInvestment,
      annualOperating,
      annualRevenue,
      annualProfit,
      paybackPeriod,
      totalProfit,
      roi,
      npv
    };
  };

  const financials = calculateFinancials();

  return (
    <div className="min-h-screen bg-gray-50" suppressHydrationWarning={true}>
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Nuclear Manufacturing Model</h1>
            <p className="text-gray-600">Complete facility planning, costs, timeline, and risk analysis</p>
          </div>
          {isMounted && (
            <button
              onClick={() => readText(`Nuclear Manufacturing Model for ${currentData.name}. This comprehensive tool analyzes facility construction costs, timeline, regulations, equipment requirements, and financial projections for nuclear isotope production facilities.`)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                isReading ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              <i className={`ri-${isReading ? 'stop' : 'volume-up'}-line mr-2`}></i>
              {isReading ? 'Stop Reading' : 'Read Page'}
            </button>
          )}
        </div>

        {/* Facility Selection */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Production Facility</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Object.keys(manufacturingData).map((isotope) => (
              <button
                key={isotope}
                onClick={() => setSelectedIsotope(isotope)}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  selectedIsotope === isotope
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="font-bold text-lg mb-2">
                  {manufacturingData[isotope].name}
                </div>
                <div className="text-gray-600 text-sm">
                  {manufacturingData[isotope].description}
                </div>
              </button>
            ))}
          </div>

          {/* Facility Size Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Facility Size</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(currentData.costs).map(([size, data]) => (
                <button
                  key={size}
                  onClick={() => setFacilityType(size)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    facilityType === size
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold capitalize mb-2">{size} Scale</div>
                  <div className="text-sm text-gray-600 mb-1">
                    Capacity: {data.capacity}
                  </div>
                  <div className="text-sm font-medium text-green-600">
                    ${(data.initial / 1000000).toFixed(0)}M initial cost
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Financial Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Financial Projections</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Horizon (Years)
                </label>
                <select
                  value={timeHorizon}
                  onChange={(e) => setTimeHorizon(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                >
                  <option value={5}>5 Years</option>
                  <option value={10}>10 Years</option>
                  <option value={15}>15 Years</option>
                  <option value={20}>20 Years</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-gray-700">Initial Investment</span>
                <span className="font-bold text-red-700">
                  ${(financials.initialInvestment / 1000000).toFixed(0)}M
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700">Annual Revenue</span>
                <span className="font-bold text-blue-700">
                  ${(financials.annualRevenue / 1000000).toFixed(0)}M
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-gray-700">Annual Operating Cost</span>
                <span className="font-bold text-orange-700">
                  ${(financials.annualOperating / 1000000).toFixed(0)}M
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">Annual Profit</span>
                <span className="font-bold text-green-700">
                  ${(financials.annualProfit / 1000000).toFixed(0)}M
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Key Metrics</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {financials.paybackPeriod.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Years Payback</div>
              </div>
              
              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600 mb-1">
                  {financials.roi.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">ROI ({timeHorizon}yr)</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  ${(financials.npv / 1000000).toFixed(0)}M
                </div>
                <div className="text-sm text-gray-600">Net Present Value</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {(currentData.profitMargin * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600">Profit Margin</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Investment Summary</h4>
              <div className="text-sm text-gray-600">
                This {facilityType}-scale {currentData.name.toLowerCase()} requires 
                ${(financials.initialInvestment / 1000000).toFixed(0)}M initial investment with a 
                {financials.paybackPeriod.toFixed(1)}-year payback period. Expected {timeHorizon}-year ROI is {financials.roi.toFixed(1)}%.
              </div>
            </div>
          </div>
        </div>

        {/* Timeline & Regulations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Construction Timeline</h3>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold text-gray-900">Estimated Duration</span>
                <span className="text-2xl font-bold text-indigo-600">{currentData.timeline}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4">1</div>
                <div>
                  <div className="font-semibold text-gray-900">Planning & Permits</div>
                  <div className="text-sm text-gray-600">6-12 months</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4">2</div>
                <div>
                  <div className="font-semibold text-gray-900">Site Preparation</div>
                  <div className="text-sm text-gray-600">3-6 months</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4">3</div>
                <div>
                  <div className="font-semibold text-gray-900">Equipment Installation</div>
                  <div className="text-sm text-gray-600">12-18 months</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4">4</div>
                <div>
                  <div className="font-semibold text-gray-900">Testing & Commissioning</div>
                  <div className="text-sm text-gray-600">6-12 months</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Regulatory Requirements</h3>
            
            <div className="space-y-4">
              {currentData.regulations.map((regulation, index) => (
                <div key={index} className="flex items-start p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <i className="ri-shield-check-line text-xs text-white"></i>
                  </div>
                  <div>
                    <div className="font-semibold text-red-800">{regulation}</div>
                    <div className="text-sm text-red-600 mt-1">
                      {regulation.includes('Nuclear') && 'Federal licensing required - 12-24 months process'}
                      {regulation.includes('Medical') && 'FDA approval for medical isotopes - 6-18 months'}
                      {regulation.includes('GMP') && 'Good Manufacturing Practices compliance'}
                      {regulation.includes('DOE') && 'Department of Energy security clearance required'}
                      {regulation.includes('Export') && 'International trade compliance required'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Equipment Breakdown */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Major Equipment Requirements</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentData.equipment.map((equipment, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-gray-900">{equipment.name}</h4>
                  <span className="text-lg font-bold text-indigo-600">
                    ${(equipment.cost / 1000000).toFixed(0)}M
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(equipment.cost / Math.max(...currentData.equipment.map(e => e.cost))) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  {Math.round((equipment.cost / currentCosts.initial) * 100)}% of total facility cost
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Analysis */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Risk Analysis Matrix</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Risk Type</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Probability</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Impact</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Mitigation Strategy</th>
                </tr>
              </thead>
              <tbody>
                {currentData.risks.map((risk, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium text-gray-900">{risk.type}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        risk.probability === 'High' ? 'bg-red-100 text-red-800' :
                        risk.probability === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {risk.probability}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        risk.impact === 'High' ? 'bg-red-100 text-red-800' :
                        risk.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {risk.impact}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{risk.mitigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/analysis" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
              Detailed Cost Analysis
            </Link>
            <Link href="/resources" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
              Research & Reports
            </Link>
            <button
              onClick={() => window.print()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
            >
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
