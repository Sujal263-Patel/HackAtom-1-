
'use client';

import { useState, useRef, useEffect } from 'react';

export default function SearchBar({ onSearch, placeholder = "Search isotopes, applications, or topics..." }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const searchRef = useRef(null);

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

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
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

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    setIsOpen(false);
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'isotope': return 'ri-atom-line';
      case 'application': return 'ri-apps-line';
      case 'topic': return 'ri-book-line';
      case 'tool': return 'ri-tools-line';
      default: return 'ri-search-line';
    }
  };

  const getColor = (category) => {
    switch (category) {
      case 'Medicine': return 'text-red-600 bg-red-50';
      case 'Industry': return 'text-blue-600 bg-blue-50';
      case 'Agriculture': return 'text-green-600 bg-green-50';
      case 'Space': return 'text-purple-600 bg-purple-50';
      case 'Economics': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (!isMounted) {
    return (
      <div className="relative w-full max-w-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="ri-search-line text-gray-400"></i>
          </div>
          <input
            type="text"
            value=""
            readOnly
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
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
          <i className="ri-search-line text-gray-400"></i>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
          placeholder={placeholder}
          suppressHydrationWarning={true}
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <i className="ri-close-line text-gray-400 hover:text-gray-600"></i>
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-gray-500 mb-2 px-2">
              {results.length} result{results.length !== 1 ? 's' : ''}
            </div>
            {results.map((result) => (
              <button
                key={result.id}
                onClick={() => handleSearch(result.title)}
                className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-start">
                  <div className="w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    <i className={`${getIcon(result.type)} text-gray-500`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {result.title}
                      </p>
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getColor(result.category)} flex-shrink-0`}>
                        {result.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-1">
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
