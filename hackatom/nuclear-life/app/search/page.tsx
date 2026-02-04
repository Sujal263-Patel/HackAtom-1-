
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReading, setIsReading] = useState(false);

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

  const searchDatabase = {
    'technetium-99m': {
      title: 'Technetium-99m',
      type: 'Isotope',
      category: 'Medical',
      description: 'Most widely used radioisotope in nuclear medicine',
      details: {
        halfLife: '6 hours',
        cost: '$150 per Curie',
        production: '15 million Ci annually',
        applications: ['SPECT imaging', 'Heart scans', 'Bone scans', 'Brain imaging'],
        economics: {
          marketValue: '$2.5 billion annually',
          procedures: '30 million per year',
          growth: '8.5% CAGR',
          profitMargin: '20-25%'
        },
        manufacturing: {
          facilityType: 'Nuclear reactor or generator system',
          investmentCost: '$50-100 million',
          operatingCost: '$15 million/year',
          timeline: '2-3 years',
          risks: ['Supply chain disruptions', 'Regulatory changes', 'Short shelf life']
        },
        safety: {
          radiation: 'Low energy gamma rays',
          exposure: 'Minimal patient dose',
          handling: 'Standard nuclear medicine protocols',
          disposal: 'Decay storage (10 half-lives)'
        }
      }
    },
    'cobalt-60': {
      title: 'Cobalt-60',
      type: 'Isotope',
      category: 'Medical/Industrial',
      description: 'High-energy gamma source for cancer treatment and sterilization',
      details: {
        halfLife: '5.3 years',
        cost: '$1,000 per Curie',
        production: '75,000 Ci annually',
        applications: ['External beam radiotherapy', 'Food sterilization', 'Medical device sterilization', 'Industrial radiography'],
        economics: {
          marketValue: '$1.8 billion annually',
          treatments: '2.5 million cancer patients',
          growth: '6.2% CAGR',
          profitMargin: '25-30%'
        },
        manufacturing: {
          facilityType: 'Nuclear reactor irradiation',
          investmentCost: '$100-200 million',
          operatingCost: '$25 million/year',
          timeline: '3-5 years',
          risks: ['Reactor availability', 'Security requirements', 'Competition']
        },
        safety: {
          radiation: 'High energy gamma rays',
          exposure: 'Requires heavy shielding',
          handling: 'Remote handling systems',
          disposal: 'Long-term storage required'
        }
      }
    },
    'iodine-131': {
      title: 'Iodine-131',
      type: 'Isotope',
      category: 'Medical',
      description: 'Thyroid treatment and thyroid cancer therapy',
      details: {
        halfLife: '8 days',
        cost: '$200 per Curie',
        production: '500,000 Ci annually',
        applications: ['Thyroid ablation', 'Thyroid cancer treatment', 'Hyperthyroidism therapy'],
        economics: {
          marketValue: '$850 million annually',
          treatments: '150,000 patients per year',
          growth: '7.8% CAGR',
          profitMargin: '25%'
        },
        manufacturing: {
          facilityType: 'Uranium fission or tellurium targets',
          investmentCost: '$30-75 million',
          operatingCost: '$12 million/year',
          timeline: '2-4 years',
          risks: ['Transport logistics', 'Regulatory compliance', 'Market competition']
        },
        safety: {
          radiation: 'Beta and gamma radiation',
          exposure: 'Thyroid uptake considerations',
          handling: 'Isolation protocols required',
          disposal: 'Decay storage and monitoring'
        }
      }
    },
    'plutonium-238': {
      title: 'Plutonium-238',
      type: 'Isotope',
      category: 'Space Technology',
      description: 'Radioisotope thermoelectric generator fuel for space missions',
      details: {
        halfLife: '87.7 years',
        cost: '$50,000 per Curie',
        production: '1,500 Ci annually (limited)',
        applications: ['RTG power systems', 'Deep space missions', 'Mars rovers', 'Outer planet probes'],
        economics: {
          marketValue: '$450 million annually',
          missions: '15 active spacecraft',
          growth: '15.3% CAGR',
          profitMargin: '24%'
        },
        manufacturing: {
          facilityType: 'Neptunium target irradiation',
          investmentCost: '$300-500 million',
          operatingCost: '$50 million/year',
          timeline: '5-7 years',
          risks: ['Security clearance', 'Limited capacity', 'Political factors']
        },
        safety: {
          radiation: 'Alpha particles (low penetration)',
          exposure: 'Internal contamination risk',
          handling: 'Glove box operations',
          disposal: 'Long-term secure storage'
        }
      }
    },
    'cesium-137': {
      title: 'Cesium-137',
      type: 'Isotope',
      category: 'Industrial',
      description: 'Industrial gauging and level detection systems',
      details: {
        halfLife: '30 years',
        cost: '$500 per Curie',
        production: '25,000 Ci annually',
        applications: ['Thickness gauging', 'Level detection', 'Well logging', 'Industrial radiography'],
        economics: {
          marketValue: '$320 million annually',
          devices: '1 million gauges deployed',
          growth: '4.5% CAGR',
          profitMargin: '24%'
        },
        manufacturing: {
          facilityType: 'Fission product separation',
          investmentCost: '$75-150 million',
          operatingCost: '$20 million/year',
          timeline: '3-4 years',
          risks: ['Alternative technologies', 'Security concerns', 'Waste management']
        },
        safety: {
          radiation: 'Beta and gamma radiation',
          exposure: 'Sealed source design',
          handling: 'Shielded containers',
          disposal: 'Return to supplier programs'
        }
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    
    if (query) {
      const searchResults = [];
      const queryLower = query.toLowerCase();
      
      // Search through database
      Object.entries(searchDatabase).forEach(([key, data]) => {
        if (
          key.includes(queryLower) ||
          data.title.toLowerCase().includes(queryLower) ||
          data.description.toLowerCase().includes(queryLower) ||
          data.category.toLowerCase().includes(queryLower) ||
          data.details.applications.some(app => app.toLowerCase().includes(queryLower))
        ) {
          searchResults.push({ id: key, ...data });
        }
      });
      
      setResults(searchResults);
    }
    
    setIsLoading(false);
  }, [query]);

  const getIcon = (type, category) => {
    if (type === 'Isotope') {
      switch (category) {
        case 'Medical': return 'ri-heart-pulse-line';
        case 'Industrial': return 'ri-hammer-line';
        case 'Space Technology': return 'ri-rocket-line';
        default: return 'ri-atom-line';
      }
    }
    return 'ri-search-line';
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Medical': return 'bg-red-50 text-red-700 border-red-200';
      case 'Industrial': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Space Technology': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-gray-600">
            {isLoading ? 'Searching...' : `Found ${results.length} result${results.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching database...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12">
            <i className="ri-search-line text-6xl text-gray-400 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">Try searching for isotope names, applications, or categories</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Technetium-99m', 'Cobalt-60', 'Medical imaging', 'Space technology', 'Manufacturing costs'].map((suggestion) => (
                <Link
                  key={suggestion}
                  href={`/search?q=${encodeURIComponent(suggestion)}`}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  {suggestion}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Results List */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {results.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => setSelectedResult(result)}
                    className={`bg-white p-6 rounded-xl border-2 transition-all cursor-pointer hover:shadow-lg ${
                      selectedResult?.id === result.id
                        ? 'border-indigo-500 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
                          <i className={`${getIcon(result.type, result.category)} text-white`}></i>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{result.title}</h3>
                          <p className="text-sm text-gray-600">{result.type}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium border rounded-full ${getCategoryColor(result.category)}`}>
                        {result.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{result.description}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="mr-4">Cost: {result.details.cost}</span>
                      <span>Half-life: {result.details.halfLife}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed View */}
            <div className="lg:col-span-2">
              {selectedResult ? (
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-indigo-500 rounded-xl flex items-center justify-center mr-4">
                        <i className={`${getIcon(selectedResult.type, selectedResult.category)} text-2xl text-white`}></i>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{selectedResult.title}</h2>
                        <p className="text-gray-600">{selectedResult.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => readText(`${selectedResult.title}. ${selectedResult.description}. Half-life: ${selectedResult.details.halfLife}. Cost: ${selectedResult.details.cost}. Main applications include: ${selectedResult.details.applications.join(', ')}.`)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                        isReading ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                      } text-white`}
                    >
                      <i className={`ri-${isReading ? 'stop' : 'volume-up'}-line mr-2`}></i>
                      {isReading ? 'Stop' : 'Read'}
                    </button>
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Half-life</h4>
                      <p className="text-2xl font-bold text-indigo-600">{selectedResult.details.halfLife}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Cost per Curie</h4>
                      <p className="text-2xl font-bold text-green-600">{selectedResult.details.cost}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Annual Production</h4>
                      <p className="text-2xl font-bold text-blue-600">{selectedResult.details.production}</p>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8">
                      {['Applications', 'Economics', 'Manufacturing', 'Safety'].map((tab) => (
                        <button
                          key={tab}
                          className="border-b-2 border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300 py-2 px-1 font-medium transition-colors"
                        >
                          {tab}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Content Sections */}
                  <div className="space-y-8">
                    {/* Applications */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Applications</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedResult.details.applications.map((app, index) => (
                          <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <i className="ri-check-line text-green-500 mr-3"></i>
                            <span className="text-gray-700">{app}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Economics */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Economic Data</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(selectedResult.details.economics).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                            <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="font-semibold text-green-700">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Manufacturing */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Manufacturing Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Costs & Timeline</h4>
                          <div className="space-y-3">
                            {Object.entries(selectedResult.details.manufacturing).filter(([key]) => !key.includes('risks')).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Key Risks</h4>
                          <div className="space-y-2">
                            {selectedResult.details.manufacturing.risks.map((risk, index) => (
                              <div key={index} className="flex items-center p-2 bg-red-50 rounded">
                                <i className="ri-alert-line text-red-500 mr-2"></i>
                                <span className="text-red-700 text-sm">{risk}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Safety */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(selectedResult.details.safety).map(([key, value]) => (
                          <div key={key} className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2 capitalize">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </h4>
                            <p className="text-blue-700">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap gap-4">
                      <Link href="/analysis" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer">
                        Analyze Costs
                      </Link>
                      <Link href="/modules" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer">
                        Learn More
                      </Link>
                      <Link href="/resources" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer">
                        Research Papers
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl p-8 shadow-sm text-center">
                  <i className="ri-cursor-line text-6xl text-gray-400 mb-4"></i>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a result</h3>
                  <p className="text-gray-600">Click on any result to see detailed information</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading search...</p>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
