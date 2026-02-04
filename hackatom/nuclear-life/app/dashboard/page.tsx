
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import NewsUpdates from '../../components/NewsUpdates';

export default function DashboardPage() {
  const [selectedRegion, setSelectedRegion] = useState('global');
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

  const regions = {
    global: { name: 'Global', facilities: 245, production: '15.2M Ci', market: '$12.4B' },
    northAmerica: { name: 'North America', facilities: 89, production: '6.8M Ci', market: '$4.2B' },
    europe: { name: 'Europe', facilities: 76, production: '4.1M Ci', market: '$3.8B' },
    asia: { name: 'Asia Pacific', facilities: 58, production: '3.2M Ci', market: '$3.1B' },
    other: { name: 'Others', facilities: 22, production: '1.1M Ci', market: '$1.3B' }
  };

  const marketData = [
    { year: '2020', value: 8.5, growth: 5.2 },
    { year: '2021', value: 9.2, growth: 8.2 },
    { year: '2022', value: 10.1, growth: 9.8 },
    { year: '2023', value: 11.3, growth: 11.9 },
    { year: '2024', value: 12.4, growth: 9.7 },
    { year: '2025', value: 13.8, growth: 11.3 },
    { year: '2026', value: 15.4, growth: 11.6 }
  ];

  const carbonSavings = {
    medical: { sector: 'Medical Imaging', saving: 2.5, equivalent: '540,000 cars' },
    agriculture: { sector: 'Food Preservation', saving: 8.2, equivalent: '1.8M cars' },
    industry: { sector: 'Industrial Testing', saving: 1.8, equivalent: '390,000 cars' },
    space: { sector: 'Space Technology', saving: 0.3, equivalent: '65,000 cars' }
  };

  return (
    <div className="min-h-screen bg-gray-50" suppressHydrationWarning={true}>
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Nuclear Isotope Data Dashboard</h1>
            <p className="text-gray-600">Real-time market data and global production insights</p>
          </div>
          {isMounted && (
            <div className="flex gap-3">
              <button
                onClick={() => readText("Welcome to the Nuclear Isotope Data Dashboard. This dashboard provides real-time market data, global production insights, and environmental impact metrics for nuclear isotope applications across medicine, industry, agriculture, and space technology.")}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Global Market Overview</h2>
                <button
                  onClick={() => readText("Global isotope market is worth 150 billion dollars annually, with medical applications representing 8.2 billion, industrial applications 4.1 billion, agriculture 2.4 billion, and space technology 850 million dollars.")}
                  className="text-blue-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                  title="Read market overview"
                >
                  <i className="ri-volume-up-line"></i>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">$150B</div>
                  <div className="text-gray-600 text-sm">Total Market</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">$8.2B</div>
                  <div className="text-gray-600 text-sm">Medical</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">$4.1B</div>
                  <div className="text-gray-600 text-sm">Industrial</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">$2.4B</div>
                  <div className="text-gray-600 text-sm">Agriculture</div>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-6 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d25344074.79783921!2d-95.677068!3d37.6000009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Global Nuclear Facilities"
                  className="rounded-lg"
                ></iframe>
              </div>

              <div className="flex flex-wrap gap-4">
                {['global', 'north-america', 'europe', 'asia-pacific'].map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap capitalize ${
                      selectedRegion === region
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {region.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Global Production Facilities</h2>

              <div className="flex flex-wrap gap-4 mb-6">
                {Object.entries(regions).map(([key, region]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedRegion(key)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      selectedRegion === key
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {region.name}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24176.251535935!2d-74.0059413!3d40.7127837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    className="rounded-lg border-0"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {regions[selectedRegion as keyof typeof regions].name} Statistics
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Production Facilities</span>
                      <span className="font-bold text-gray-900">{regions[selectedRegion as keyof typeof regions].facilities}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Annual Production</span>
                      <span className="font-bold text-gray-900">{regions[selectedRegion as keyof typeof regions].production}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Market Value</span>
                      <span className="font-bold text-gray-900">{regions[selectedRegion as keyof typeof regions].market}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Growth Projections</h2>

              <div className="h-80 bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-end h-full">
                  {marketData.map((data, index) => (
                    <div key={data.year} className="flex flex-col items-center">
                      <div className="text-xs text-gray-600 mb-2">${data.value}B</div>
                      <div
                        className="bg-indigo-500 rounded-t-lg w-12 transition-all duration-500 hover:bg-indigo-600 cursor-pointer"
                        style={{ height: `${(data.value / 16) * 100}%` }}
                        title={`${data.year}: $${data.value}B (${data.growth}% growth)`}
                      ></div>
                      <div className="text-sm text-gray-700 mt-2">{data.year}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 text-center text-gray-600">
                <p>Projected market growth shows consistent upward trend with average 10.2% annual growth</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Environmental Impact: Carbon Savings</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(carbonSavings).map(([key, data]) => (
                  <div key={key} className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-gray-900 mb-3">{data.sector}</h3>
                    <div className="text-3xl font-bold text-green-600 mb-2">{data.saving}M</div>
                    <div className="text-sm text-gray-600 mb-3">Tons CO₂ saved annually</div>
                    <div className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
                      = {data.equivalent} off road
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center text-blue-800">
                  <i className="ri-information-line mr-2"></i>
                  <span className="font-semibold">Total Environmental Benefit:</span>
                </div>
                <p className="text-blue-700 mt-1">
                  Nuclear isotope technologies save 12.8 million tons of CO₂ annually, equivalent to removing 2.8 million cars from the road.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <i className="ri-factory-line text-xl text-white"></i>
                  </div>
                  <span className="text-green-600 text-sm font-medium">+12.5%</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">245</h3>
                <p className="text-gray-600">Active Production Facilities</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <i className="ri-money-dollar-circle-line text-xl text-white"></i>
                  </div>
                  <span className="text-green-600 text-sm font-medium">+9.7%</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">$12.4B</h3>
                <p className="text-gray-600">Annual Market Value</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <i className="ri-radioactive-line text-xl text-white"></i>
                  </div>
                  <span className="text-green-600 text-sm font-medium">+8.3%</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">15.2M</h3>
                <p className="text-gray-600">Curies Produced Annually</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <i className="ri-leaf-line text-xl text-white"></i>
                  </div>
                  <span className="text-green-600 text-sm font-medium">+15.2%</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">12.8M</h3>
                <p className="text-gray-600">Tons CO₂ Saved Annually</p>
              </div>
            </div>

            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/modules" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
                  Learn More
                </Link>
                <Link href="/analysis" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
                  Cost Analysis
                </Link>
                <Link href="/resources" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
                  View Resources
                </Link>
                <Link href="/quiz" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
                  Test Knowledge
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <NewsUpdates />

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/modules" className="block w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-3 rounded-lg font-medium text-center transition-colors whitespace-nowrap cursor-pointer">
                  <i className="ri-book-open-line mr-2"></i>
                  Continue Learning
                </Link>
                <Link href="/analysis" className="block w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg font-medium text-center transition-colors whitespace-nowrap cursor-pointer">
                  <i className="ri-bar-chart-2-line mr-2"></i>
                  Cost Analysis
                </Link>
                <Link href="/quiz" className="block w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-medium text-center transition-colors whitespace-nowrap cursor-pointer">
                  <i className="ri-questionnaire-line mr-2"></i>
                  Take Quiz
                </Link>
                <Link href="/resources" className="block w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium text-center transition-colors whitespace-nowrap cursor-pointer">
                  <i className="ri-file-text-line mr-2"></i>
                  Browse Resources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}