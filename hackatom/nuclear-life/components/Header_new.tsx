'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('selectedLanguage');
    if (saved) setSelectedLanguage(saved);
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' }
  ];

  const changeLanguage = (langCode: string) => {
    setSelectedLanguage(langCode);
    localStorage.setItem('selectedLanguage', langCode);
    setShowLanguageDropdown(false);
    
    // Add translation logic here
    if (typeof window !== 'undefined' && (window as any).translatePage) {
      (window as any).translatePage(langCode);
    }
  };

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  const handleSearch = (query: string) => {
    // Enhanced search with detailed results
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center cursor-pointer group">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300">
                IsoLearn
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/overview" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors cursor-pointer relative group">
                Overview
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link href="/modules" className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer relative group">
                Learn
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link href="/simple-quiz" className="text-gray-700 hover:text-purple-600 font-medium transition-colors cursor-pointer relative group">
                Quick Quiz
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link href="/quiz" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors cursor-pointer relative group">
                Advanced Quiz
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link href="/analysis" className="text-gray-700 hover:text-green-600 font-medium transition-colors cursor-pointer relative group">
                Analysis
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link href="/manufacturing" className="text-gray-700 hover:text-orange-600 font-medium transition-colors cursor-pointer relative group">
                Manufacturing
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-violet-600 font-medium transition-colors cursor-pointer relative group">
                Dashboard
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></div>
              </Link>
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden lg:block">
                <SearchBar onSearch={handleSearch} />
              </div>

              {/* AI Chatbot Button */}
              <button
                onClick={() => setShowChatbot(true)}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white p-2 rounded-lg transition-all hover:scale-105 shadow-md hover:shadow-lg"
                title="AI Assistant"
              >
                <i className="ri-robot-line text-lg"></i>
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors group"
                  suppressHydrationWarning={true}
                >
                  <span className="mr-2 text-lg group-hover:scale-110 transition-transform">{currentLanguage.flag}</span>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {currentLanguage.code.toUpperCase()}
                  </span>
                  <i className="ri-arrow-down-s-line ml-1 text-gray-500 group-hover:text-gray-700 transition-colors"></i>
                </button>

                {showLanguageDropdown && isMounted && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center ${
                          selectedLanguage === lang.code ? 'bg-cyan-50 text-cyan-600' : 'text-gray-700'
                        }`}
                      >
                        <span className="mr-3 text-lg">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-700 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="mb-4">
                <SearchBar onSearch={handleSearch} placeholder="Search..." />
              </div>
              <nav className="space-y-2">
                <Link href="/overview" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
                  Overview
                </Link>
                <Link href="/modules" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
                  Learn
                </Link>
                <Link href="/simple-quiz" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
                  Quick Quiz
                </Link>
                <Link href="/quiz" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
                  Advanced Quiz
                </Link>
                <Link href="/analysis" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
                  Analysis
                </Link>
                <Link href="/manufacturing" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
                  Manufacturing
                </Link>
                <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
                  Dashboard
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* AI Chatbot Modal */}
      {showChatbot && isMounted && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[80vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-t-xl">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <i className="ri-robot-line text-white text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">IsoLearn AI Assistant</h3>
                  <p className="text-sm text-cyan-100">Ask anything about isotopes and nuclear technology</p>
                </div>
              </div>
              <button
                onClick={() => setShowChatbot(false)}
                className="text-white/80 hover:text-white p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <iframe
                src="/chatbot"
                className="w-full h-full border-0"
                title="IsoLearn AI Chatbot"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
