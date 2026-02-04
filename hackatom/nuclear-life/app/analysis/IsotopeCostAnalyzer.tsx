'use client';

import { useState, useEffect } from 'react';

interface IsotopeData {
  name: string;
  halfLife: string;
  currentPrice: number;
  productionCost: number;
  marketDemand: string;
  growthRate: number;
  applications: string[];
  regions: string[];
  competitors: string[];
  risks: string[];
  opportunities: string[];
  futurePrice: number[];
  profitMargin: number;
  marketSize: number;
}

interface IsotopesData {
  [key: string]: IsotopeData;
}

export default function IsotopeCostAnalyzer() {
  const [selectedIsotope, setSelectedIsotope] = useState<string>('Tc-99m');
  const [analysisType, setAnalysisType] = useState<string>('overview');
  const [timeHorizon, setTimeHorizon] = useState<number>(5);
  const [investmentAmount, setInvestmentAmount] = useState<number>(100000);
  const [isReading, setIsReading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

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

  const isotopes: IsotopesData = {
    'Tc-99m': {
      name: 'Technetium-99m',
      halfLife: '6 hours',
      currentPrice: 150,
      productionCost: 120,
      marketDemand: 'Very High',
      growthRate: 8.5,
      applications: ['Medical Imaging', 'SPECT Scans', 'Cardiac Studies'],
      regions: ['North America: 45%', 'Europe: 30%', 'Asia: 20%', 'Others: 5%'],
      competitors: ['NTP Radioisotopes', 'IRE', 'ANSTO'],
      risks: ['Supply Chain', 'Regulatory', 'Technology'],
      opportunities: ['Aging Population', 'Emerging Markets', 'New Applications'],
      futurePrice: [150, 162, 175, 189, 204],
      profitMargin: 20,
      marketSize: 2500000000
    },
    'Co-60': {
      name: 'Cobalt-60',
      halfLife: '5.3 years',
      currentPrice: 1000,
      productionCost: 750,
      marketDemand: 'High',
      growthRate: 6.2,
      applications: ['Cancer Treatment', 'Food Sterilization', 'Industrial Radiography'],
      regions: ['North America: 40%', 'Europe: 25%', 'Asia: 25%', 'Others: 10%'],
      competitors: ['Bruce Power', 'Nordion', 'NTP Radioisotopes'],
      risks: ['Reactor Availability', 'Competition', 'Regulations'],
      opportunities: ['Cancer Incidence', 'Food Safety', 'Industrial Growth'],
      futurePrice: [1000, 1062, 1127, 1196, 1270],
      profitMargin: 25,
      marketSize: 1800000000
    },
    'I-131': {
      name: 'Iodine-131',
      halfLife: '8 days',
      currentPrice: 200,
      productionCost: 150,
      marketDemand: 'High',
      growthRate: 7.8,
      applications: ['Thyroid Treatment', 'Thyroid Cancer', 'Hyperthyroidism'],
      regions: ['North America: 50%', 'Europe: 28%', 'Asia: 15%', 'Others: 7%'],
      competitors: ['NTP Radioisotopes', 'IRE', 'Curium'],
      risks: ['Short Half-Life', 'Transport', 'Storage'],
      opportunities: ['Thyroid Disorders', 'Personalized Medicine', 'Emerging Markets'],
      futurePrice: [200, 216, 233, 251, 271],
      profitMargin: 25,
      marketSize: 850000000
    },
    'Pu-238': {
      name: 'Plutonium-238',
      halfLife: '87.7 years',
      currentPrice: 50000,
      productionCost: 38000,
      marketDemand: 'Medium',
      growthRate: 15.3,
      applications: ['Space Missions', 'Deep Space Probes', 'Mars Rovers'],
      regions: ['North America: 70%', 'Europe: 20%', 'Asia: 8%', 'Others: 2%'],
      competitors: ['Oak Ridge National Lab', 'Roscosmos', 'ESA'],
      risks: ['Limited Production', 'High Security', 'Political'],
      opportunities: ['Space Exploration', 'Mars Missions', 'Deep Space'],
      futurePrice: [50000, 57650, 66464, 76634, 88330],
      profitMargin: 24,
      marketSize: 450000000
    },
    'Cs-137': {
      name: 'Cesium-137',
      halfLife: '30 years',
      currentPrice: 500,
      productionCost: 380,
      marketDemand: 'Medium',
      growthRate: 4.5,
      applications: ['Industrial Gauging', 'Well Logging', 'Level Detection'],
      regions: ['North America: 35%', 'Europe: 30%', 'Asia: 25%', 'Others: 10%'],
      competitors: ['Eckert & Ziegler', 'NTP Radioisotopes', 'Curium'],
      risks: ['Alternative Technologies', 'Security Concerns', 'Waste Management'],
      opportunities: ['Industrial Automation', 'Quality Control', 'Emerging Markets'],
      futurePrice: [500, 523, 546, 571, 596],
      profitMargin: 24,
      marketSize: 320000000
    }
  };

  const currentIsotope = isotopes[selectedIsotope as keyof IsotopesData];

  const calculateProfitability = () => {
    const annualRevenue = investmentAmount * (currentIsotope.profitMargin / 100);
    const paybackPeriod = investmentAmount / annualRevenue;
    const totalReturn = annualRevenue * timeHorizon;
    const roi = ((totalReturn - investmentAmount) / investmentAmount) * 100;
    const npv = totalReturn - investmentAmount;
    
    return {
      annualRevenue: Math.round(annualRevenue),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      totalReturn: Math.round(totalReturn),
      roi: Math.round(roi * 10) / 10,
      npv: Math.round(npv),
      futureValue: Math.round(investmentAmount * Math.pow(1 + (currentIsotope.growthRate / 100), timeHorizon))
    };
  };

  const profitability = calculateProfitability();

  const analysisTypes = [
    { id: 'overview', name: 'Market Overview', icon: 'ri-pie-chart-line' },
    { id: 'pricing', name: 'Pricing Analysis', icon: 'ri-money-dollar-circle-line' },
    { id: 'profitability', name: 'Profitability', icon: 'ri-line-chart-line' },
    { id: 'applications', name: 'Applications', icon: 'ri-apps-line' },
    { id: 'risks', name: 'Risk Analysis', icon: 'ri-shield-check-line' }
  ];

  return (
    <div className="space-y-8">
      {/* Isotope Selection */}
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Select Isotope for Analysis</h2>
          {isMounted && (
            <button
              onClick={() => readText(`Currently analyzing ${currentIsotope.name} with half-life of ${currentIsotope.halfLife}, current price $${currentIsotope.currentPrice} per curie, and annual growth rate of ${currentIsotope.growthRate} percent.`)}
              className="text-blue-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors"
              title="Read isotope details"
            >
              <i className="ri-volume-up-line"></i>
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {Object.keys(isotopes).map((isotope: string) => (
            <button
              key={isotope}
              onClick={() => setSelectedIsotope(isotope)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedIsotope === isotope
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="text-lg font-bold mb-1">{isotope}</div>
              <div className="text-sm text-gray-600">${isotopes[isotope as keyof IsotopesData].currentPrice}/Ci</div>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{currentIsotope.halfLife}</div>
            <div className="text-gray-600 text-sm">Half-Life</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">${currentIsotope.currentPrice}/Ci</div>
            <div className="text-gray-600 text-sm">Current Price</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{currentIsotope.growthRate}%</div>
            <div className="text-gray-600 text-sm">Annual Growth</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{currentIsotope.marketDemand}</div>
            <div className="text-gray-600 text-sm">Market Demand</div>
          </div>
        </div>
      </div>

      {/* Analysis Type Selection */}
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Analysis Type</h3>
        <div className="flex flex-wrap gap-4">
          {analysisTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setAnalysisType(type.id)}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                analysisType === type.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <i className={`${type.icon} mr-2`}></i>
              {type.name}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Content */}
      {analysisType === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Market Overview</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Market Size</h4>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  ${(currentIsotope.marketSize / 1000000000).toFixed(1)}B
                </div>
                <div className="text-gray-600">Annual global market value</div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Regional Distribution</h4>
                <div className="space-y-2">
                  {currentIsotope.regions.map((region: string, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-600">{region.split(':')[0]}</span>
                      <div className="flex items-center">
                        <div className="w-20 h-2 bg-gray-200 rounded-full mr-3">
                          <div 
                            className="h-2 bg-indigo-500 rounded-full"
                            style={{ width: region.split(':')[1].trim() }}
                          ></div>
                        </div>
                        <span className="font-medium">{region.split(':')[1].trim()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Key Applications</h3>
            <div className="space-y-4">
              {currentIsotope.applications.map((app: string, index: number) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-checkbox-circle-fill text-white"></i>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{app}</div>
                    <div className="text-gray-600 text-sm">Primary application sector</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center text-blue-800">
                <i className="ri-lightbulb-line mr-2"></i>
                <span className="font-semibold">Market Insight:</span>
              </div>
              <p className="text-blue-700 mt-1 text-sm">
                {selectedIsotope === 'Tc-99m' && "Dominates 80% of nuclear medicine procedures with consistent demand growth"}
                {selectedIsotope === 'Co-60' && "Essential for sterilization industry with expanding cancer treatment applications"}
                {selectedIsotope === 'I-131' && "Growing thyroid treatment market driven by increasing diagnosis rates"}
                {selectedIsotope === 'Pu-238' && "Critical for space missions with NASA increasing production capacity"}
                {selectedIsotope === 'Cs-137' && "Stable industrial demand with opportunities in emerging automation markets"}
              </p>
            </div>
          </div>
        </div>
      )}

      {analysisType === 'pricing' && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">5-Year Pricing Projection</h3>
            
            <div className="h-80 bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-end h-full">
                {currentIsotope.futurePrice.map((price: number, index: number) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="text-sm text-gray-600 mb-2">${price}</div>
                    <div
                      className="bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg w-16 transition-all duration-500 hover:from-indigo-700 hover:to-indigo-500 cursor-pointer"
                      style={{ 
                        height: `${(price / Math.max(...currentIsotope.futurePrice)) * 100}%`,
                        minHeight: '20px'
                      }}
                      title={`Year ${2024 + index}: $${price}/Ci`}
                    ></div>
                    <div className="text-sm text-gray-700 mt-2">{2024 + index}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Current Price</h4>
                <div className="text-2xl font-bold text-green-600">${currentIsotope.currentPrice}/Ci</div>
                <div className="text-sm text-gray-600">Market price today</div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">5-Year Projection</h4>
                <div className="text-2xl font-bold text-blue-600">
                  ${currentIsotope.futurePrice[4]}/Ci
                </div>
                <div className="text-sm text-gray-600">Estimated 2029 price</div>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Total Growth</h4>
                <div className="text-2xl font-bold text-purple-600">
                  +{Math.round(((currentIsotope.futurePrice[4] - currentIsotope.currentPrice) / currentIsotope.currentPrice) * 100)}%
                </div>
                <div className="text-sm text-gray-600">5-year price increase</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Cost Structure Analysis</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Production Costs</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Raw Materials</span>
                    <span className="font-medium">${Math.round(currentIsotope.productionCost * 0.4)}/Ci</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Processing</span>
                    <span className="font-medium">${Math.round(currentIsotope.productionCost * 0.35)}/Ci</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Quality Control</span>
                    <span className="font-medium">${Math.round(currentIsotope.productionCost * 0.15)}/Ci</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Logistics</span>
                    <span className="font-medium">${Math.round(currentIsotope.productionCost * 0.1)}/Ci</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between items-center font-semibold">
                    <span className="text-gray-900">Total Cost</span>
                    <span className="text-red-600">${currentIsotope.productionCost}/Ci</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Profit Margins</h4>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Production Cost</span>
                    <span className="font-medium">${currentIsotope.productionCost}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
                    <div 
                      className="bg-red-500 h-6 rounded-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ width: `${(currentIsotope.productionCost / currentIsotope.currentPrice) * 100}%` }}
                    >
                      {Math.round((currentIsotope.productionCost / currentIsotope.currentPrice) * 100)}%
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Profit Margin</span>
                    <span className="font-medium">${currentIsotope.currentPrice - currentIsotope.productionCost}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6">
                    <div 
                      className="bg-green-500 h-6 rounded-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ width: `${currentIsotope.profitMargin}%` }}
                    >
                      {currentIsotope.profitMargin}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {analysisType === 'profitability' && (
        <div className="space-y-8">
          {/* Investment Calculator */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Investment Calculator</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount ($)
                </label>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  min="1000"
                  step="1000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Horizon (Years)
                </label>
                <select
                  value={timeHorizon}
                  onChange={(e) => setTimeHorizon(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                >
                  <option value={1}>1 Year</option>
                  <option value={3}>3 Years</option>
                  <option value={5}>5 Years</option>
                  <option value={10}>10 Years</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Growth Rate
                </label>
                <div className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600">
                  {currentIsotope.growthRate}% (Market Average)
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Annual Revenue</h4>
                  <i className="ri-money-dollar-circle-line text-2xl text-green-600"></i>
                </div>
                <div className="text-3xl font-bold text-green-700 mb-2">
                  ${profitability.annualRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-green-600">Per year at {currentIsotope.profitMargin}% margin</div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Payback Period</h4>
                  <i className="ri-time-line text-2xl text-blue-600"></i>
                </div>
                <div className="text-3xl font-bold text-blue-700 mb-2">
                  {profitability.paybackPeriod} Years
                </div>
                <div className="text-sm text-blue-600">Time to recover investment</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Total ROI</h4>
                  <i className="ri-trending-up-line text-2xl text-purple-600"></i>
                </div>
                <div className="text-3xl font-bold text-purple-700 mb-2">
                  {profitability.roi}%
                </div>
                <div className="text-sm text-purple-600">Over {timeHorizon} years</div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Net Present Value</h4>
                  <i className="ri-calculator-line text-2xl text-orange-600"></i>
                </div>
                <div className="text-3xl font-bold text-orange-700 mb-2">
                  ${profitability.npv.toLocaleString()}
                </div>
                <div className="text-sm text-orange-600">Current value of returns</div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Future Value</h4>
                  <i className="ri-funds-line text-2xl text-indigo-600"></i>
                </div>
                <div className="text-3xl font-bold text-indigo-700 mb-2">
                  ${profitability.futureValue.toLocaleString()}
                </div>
                <div className="text-sm text-indigo-600">Investment value in {timeHorizon} years</div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Total Returns</h4>
                  <i className="ri-trophy-line text-2xl text-red-600"></i>
                </div>
                <div className="text-3xl font-bold text-red-700 mb-2">
                  ${profitability.totalReturn.toLocaleString()}
                </div>
                <div className="text-sm text-red-600">Cumulative revenue over {timeHorizon} years</div>
              </div>
            </div>
          </div>

          {/* Profitability Chart */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Investment Growth Projection</h3>
            
            <div className="h-80 bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-end h-full">
                {Array.from({ length: timeHorizon + 1 }, (_, i) => {
                  const value = investmentAmount + (profitability.annualRevenue * i);
                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div className="text-xs text-gray-600 mb-2">
                        ${Math.round(value / 1000)}K
                      </div>
                      <div
                        className="bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg transition-all duration-500 hover:from-green-700 hover:to-green-500 cursor-pointer"
                        style={{ 
                          height: `${(value / (investmentAmount + profitability.totalReturn)) * 100}%`,
                          width: `${80 / (timeHorizon + 1)}%`,
                          minHeight: '20px'
                        }}
                        title={`Year ${i}: $${value.toLocaleString()}`}
                      ></div>
                      <div className="text-sm text-gray-700 mt-2">Year {i}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {analysisType === 'applications' && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Application Sectors Analysis</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Primary Applications</h4>
                <div className="space-y-4">
                  {currentIsotope.applications.map((app: string, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center mr-4">
                            <i className="ri-flashlight-line text-white"></i>
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">{app}</h5>
                            <div className="text-sm text-gray-600 mb-3">
                              {selectedIsotope === 'Tc-99m' && index === 0 && "30 million procedures annually worldwide"}
                              {selectedIsotope === 'Tc-99m' && index === 1 && "Heart imaging and perfusion studies"}
                              {selectedIsotope === 'Tc-99m' && index === 2 && "Bone and organ scans"}
                              {selectedIsotope === 'Co-60' && index === 0 && "External beam radiotherapy"}
                              {selectedIsotope === 'Co-60' && index === 1 && "Medical device sterilization"}
                              {selectedIsotope === 'Co-60' && index === 2 && "Weld inspection and testing"}
                              {selectedIsotope === 'I-131' && index === 0 && "Thyroid ablation therapy"}
                              {selectedIsotope === 'I-131' && index === 1 && "Thyroid cancer treatment"}
                              {selectedIsotope === 'I-131' && index === 2 && "Hyperthyroidism treatment"}
                              {selectedIsotope === 'Pu-238' && index === 0 && "NASA deep space missions"}
                              {selectedIsotope === 'Pu-238' && index === 1 && "Voyager and New Horizons"}
                              {selectedIsotope === 'Pu-238' && index === 2 && "Mars exploration vehicles"}
                              {selectedIsotope === 'Cs-137' && index === 0 && "Thickness and density measurement"}
                              {selectedIsotope === 'Cs-137' && index === 1 && "Oil and gas exploration"}
                              {selectedIsotope === 'Cs-137' && index === 2 && "Level and interface detection"}
                            </div>
                            <div className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                              Market Share: {30 + index * 10}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Geographic Distribution</h4>
                <div className="h-64 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={`https://readdy.ai/api/search-image?query=World%20map%20showing%20nuclear%20isotope%20$%7BcurrentIsotope.name%7D%20distribution%20and%20usage%20across%20different%20continents%2C%20medical%20and%20industrial%20facilities%2C%20global%20supply%20chain%20network%2C%20scientific%20infographic%20style%20with%20blue%20and%20green%20color%20scheme&width=500&height=300&seq=geo-${selectedIsotope}&orientation=landscape`}
                    alt="Geographic Distribution"
                    className="w-full h-full object-cover object-top rounded-lg"
                  />
                </div>
                
                <div className="space-y-3">
                  {currentIsotope.regions.map((region: string, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{region.split(':')[0]}</span>
                      <div className="flex items-center">
                        <div className="w-24 h-3 bg-gray-200 rounded-full mr-3">
                          <div 
                            className="h-3 bg-indigo-500 rounded-full transition-all duration-500"
                            style={{ width: region.split(':')[1].trim() }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {region.split(':')[1].trim()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Future Applications & Opportunities</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentIsotope.opportunities.map((opportunity: string, index: number) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                    <i className="ri-rocket-line text-xl text-white"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-3">{opportunity}</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    {selectedIsotope === 'Tc-99m' && index === 0 && "Global aging population increasing diagnostic imaging demand"}
                    {selectedIsotope === 'Tc-99m' && index === 1 && "Expanding healthcare infrastructure in developing countries"}
                    {selectedIsotope === 'Tc-99m' && index === 2 && "New radiopharmaceuticals and imaging techniques"}
                    {selectedIsotope === 'Co-60' && index === 0 && "Rising cancer incidence driving treatment demand"}
                    {selectedIsotope === 'Co-60' && index === 1 && "Growing food safety regulations globally"}
                    {selectedIsotope === 'Co-60' && index === 2 && "Expanding industrial infrastructure"}
                    {selectedIsotope === 'I-131' && index === 0 && "Increasing thyroid disorder diagnosis"}
                    {selectedIsotope === 'I-131' && index === 1 && "Personalized nuclear medicine approaches"}
                    {selectedIsotope === 'I-131' && index === 2 && "Expanding access in developing markets"}
                    {selectedIsotope === 'Pu-238' && index === 0 && "NASA Mars exploration programs"}
                    {selectedIsotope === 'Pu-238' && index === 1 && "Artemis lunar mission requirements"}
                    {selectedIsotope === 'Pu-238' && index === 2 && "Outer planet exploration missions"}
                    {selectedIsotope === 'Cs-137' && index === 0 && "Industrial automation growth"}
                    {selectedIsotope === 'Cs-137' && index === 1 && "Quality control standardization"}
                    {selectedIsotope === 'Cs-137' && index === 2 && "Infrastructure development in Asia"}
                  </p>
                  <div className="text-sm font-medium text-green-700">
                    Growth Potential: {15 + index * 5}% CAGR
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {analysisType === 'risks' && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Risk Assessment Matrix</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Key Risk Factors</h4>
                <div className="space-y-4">
                  {currentIsotope.risks.map((risk, index) => {
                    const riskLevels = ['High', 'Medium', 'Low'];
                    const riskColors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500'];
                    const riskLevel = riskLevels[index % 3];
                    const riskColor = riskColors[index % 3];
                    
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-semibold text-gray-900">{risk}</h5>
                          <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${riskColor}`}>
                            {riskLevel}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          {risk === 'Supply Chain' && "Limited production facilities and transportation challenges"}
                          {risk === 'Regulatory' && "Strict nuclear regulations and licensing requirements"}
                          {risk === 'Technology' && "Alternative technologies and competition from non-nuclear methods"}
                          {risk === 'Reactor Availability' && "Dependence on research reactor operations"}
                          {risk === 'Competition' && "Market competition and pricing pressure"}
                          {risk === 'Regulations' && "Changing regulatory landscape and compliance costs"}
                          {risk === 'Short Half-Life' && "Limited shelf life requiring fast logistics"}
                          {risk === 'Transport' && "Complex shipping and handling requirements"}
                          {risk === 'Storage' && "Specialized storage facilities needed"}
                          {risk === 'Limited Production' && "Very limited global production capacity"}
                          {risk === 'High Security' && "Strict security and safeguards requirements"}
                          {risk === 'Political' && "International politics affecting supply"}
                          {risk === 'Alternative Technologies' && "Digital alternatives reducing demand"}
                          {risk === 'Security Concerns' && "Radiological security requirements"}
                          {risk === 'Waste Management' && "Long-term waste disposal challenges"}
                        </p>
                        <div className="text-xs text-gray-500">
                          Impact: {riskLevel} | Probability: {riskLevels[(index + 1) % 3]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Risk Mitigation Strategies</h4>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h5 className="font-semibold text-blue-900 mb-2">
                      <i className="ri-shield-check-line mr-2"></i>
                      Supply Chain Diversification
                    </h5>
                    <p className="text-blue-700 text-sm">
                      Multiple supplier relationships and strategic inventory management
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h5 className="font-semibold text-green-900 mb-2">
                      <i className="ri-file-shield-line mr-2"></i>
                      Regulatory Compliance
                    </h5>
                    <p className="text-green-700 text-sm">
                      Proactive regulatory engagement and compliance systems
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h5 className="font-semibold text-purple-900 mb-2">
                      <i className="ri-innovation-line mr-2"></i>
                      Technology Innovation
                    </h5>
                    <p className="text-purple-700 text-sm">
                      Continuous R&D and process improvement investments
                    </p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <h5 className="font-semibold text-orange-900 mb-2">
                      <i className="ri-global-line mr-2"></i>
                      Market Expansion
                    </h5>
                    <p className="text-orange-700 text-sm">
                      Geographic diversification and new application development
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-2">Overall Risk Score</h5>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-4 mr-3">
                      <div 
                        className={`h-4 rounded-full ${
                          selectedIsotope === 'Tc-99m' ? 'bg-yellow-500' : 
                          selectedIsotope === 'Co-60' ? 'bg-green-500' :
                          selectedIsotope === 'I-131' ? 'bg-yellow-500' :
                          selectedIsotope === 'Pu-238' ? 'bg-red-500' :
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${
                          selectedIsotope === 'Tc-99m' ? '60' : 
                          selectedIsotope === 'Co-60' ? '45' :
                          selectedIsotope === 'I-131' ? '55' :
                          selectedIsotope === 'Pu-238' ? '75' :
                          '50'
                        }%` }}
                      ></div>
                    </div>
                    <span className="font-medium text-gray-700">
                      {selectedIsotope === 'Tc-99m' ? 'Medium' : 
                       selectedIsotope === 'Co-60' ? 'Low-Medium' :
                       selectedIsotope === 'I-131' ? 'Medium' :
                       selectedIsotope === 'Pu-238' ? 'High' :
                       'Medium'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Competitive Analysis</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentIsotope.competitors.map((competitor, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">{competitor}</h4>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      index === 0 ? 'bg-red-100 text-red-800' :
                      index === 1 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {index === 0 ? 'Leader' : index === 1 ? 'Major' : 'Emerging'}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Market Share</span>
                      <span className="font-medium">{35 - index * 10}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Production Capacity</span>
                      <span className="font-medium">{index === 0 ? 'High' : index === 1 ? 'Medium' : 'Low'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Geographic Reach</span>
                      <span className="font-medium">{index === 0 ? 'Global' : index === 1 ? 'Regional' : 'Local'}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      Competitive Advantage: {
                        index === 0 ? 'Established infrastructure and relationships' :
                        index === 1 ? 'Technical expertise and quality' :
                        'Innovation and agility'
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}