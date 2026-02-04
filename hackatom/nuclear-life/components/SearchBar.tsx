
'use client';

import { useState, useRef, useEffect } from 'react';

interface SearchResult {
  id: number;
  title: string;
  type: string;
  description: string;
  category: string;
}

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search isotopes, applications, or topics..." }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fix hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const searchData = [
    { id: 1, title: 'Technetium-99m', type: 'isotope', description: 'Medical imaging isotope', category: 'Medicine' },
    { id: 2, title: 'Cobalt-60', type: 'isotope', description: 'Cancer treatment and sterilization', category: 'Medicine' },
    { id: 3, title: 'Iodine-131', type: 'isotope', description: 'Thyroid treatment', category: 'Medicine' },
    { id: 4, title: 'Cesium-137', type: 'isotope', description: 'Industrial gauging', category: 'Industry' },
    { id: 5, title: 'Americium-241', type: 'isotope', description: 'Smoke detectors', category: 'Industry' },
    { id: 6, title: 'Plutonium-238', type: 'isotope', description: 'Space power systems', category: 'Space' },
    { id: 7, title: 'Medical Imaging', type: 'application', description: 'Nuclear medicine procedures', category: 'Medicine' },
    { id: 8, title: 'Food Irradiation', type: 'application', description: 'Food preservation technology', category: 'Agriculture' },
    { id: 9, title: 'Non-Destructive Testing', type: 'application', description: 'Industrial quality control', category: 'Industry' },
    { id: 10, title: 'Cancer Treatment', type: 'application', description: 'Radiotherapy procedures', category: 'Medicine' },
    { id: 11, title: 'Nuclear Medicine Market', type: 'topic', description: '$8.2 billion industry', category: 'Economics' },
    { id: 12, title: 'ROI Calculator', type: 'tool', description: 'Investment return analysis', category: 'Economics' },
  ];

  useEffect(() => {
    if (!isMounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    if (query.length > 1) {
      const filteredResults = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults.slice(0, 8));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, isMounted]);

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    setIsOpen(false);
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'isotope': return '⚛️';
      case 'application': return '🔬';
      case 'topic': return '📚';
      case 'tool': return '🛠️';
      default: return '🔍';
    }
  };

  const getColor = (category: string) => {
    switch (category) {
      case 'Medicine': return 'text-red-600 bg-red-50 border-red-200';
      case 'Industry': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Agriculture': return 'text-green-600 bg-green-50 border-green-200';
      case 'Space': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'Economics': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (!isMounted) {
    return (
      <div className="relative w-full max-w-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value=""
            readOnly
            className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nuclear-primary focus:border-transparent outline-none text-sm bg-white shadow-sm"
            placeholder={placeholder}
            suppressHydrationWarning={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nuclear-primary focus:border-transparent outline-none text-sm bg-white shadow-sm transition-all duration-200 hover:shadow-md"
          placeholder={placeholder}
          suppressHydrationWarning={true}
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-xl transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto backdrop-blur-sm">
          <div className="p-3">
            <div className="text-xs text-gray-500 mb-3 px-2 font-medium">
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </div>
            {results.map((result) => (
              <button
                key={result.id}
                onClick={() => handleSearch(result.title)}
                className="w-full text-left p-4 hover:bg-gradient-to-r hover:from-nuclear-primary/5 hover:to-nuclear-secondary/5 rounded-xl transition-all duration-200 group border border-transparent hover:border-nuclear-primary/20"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-nuclear-primary/10 to-nuclear-secondary/10 rounded-lg flex-shrink-0 group-hover:from-nuclear-primary/20 group-hover:to-nuclear-secondary/20 transition-all duration-200">
                    <span className="text-lg">{getIcon(result.type)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-nuclear-primary transition-colors">
                        {result.title}
                      </p>
                      <span className={`ml-3 px-3 py-1 text-xs font-medium rounded-full border flex-shrink-0 ${getColor(result.category)}`}>
                        {result.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-1 group-hover:text-gray-700">
                      {result.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
