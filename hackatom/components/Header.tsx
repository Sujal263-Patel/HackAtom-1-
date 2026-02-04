
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

  const changeLanguage = (langCode) => {
    setSelectedLanguage(langCode);
    localStorage.setItem('selectedLanguage', langCode);
    setShowLanguageDropdown(false);
    
    // Add translation logic here
    if (typeof window !== 'undefined' && window.translatePage) {
      window.translatePage(langCode);
    }
  };

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  const handleSearch = (query) => {
    // Enhanced search with detailed results
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center cursor-pointer">
              <div className="text-2xl font-bold" style={{ fontFamily: 'Pacifico, serif' }}>
                logo
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/modules" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors cursor-pointer">
                Learn
              </Link>
              <Link href="/analysis" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors cursor-pointer">
                Analysis
              </Link>
              <Link href="/quiz" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors cursor-pointer">
                Quiz
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors cursor-pointer">
                Dashboard
              </Link>
              <Link href="/resources" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors cursor-pointer">
                Resources
              </Link>
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden lg:block">
                <SearchBar onSearch={handleSearch} />
              </div>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  suppressHydrationWarning={true}
                >
                  <span className="mr-2">{currentLanguage.flag}</span>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {currentLanguage.code.toUpperCase()}
                  </span>
                  <i className="ri-arrow-down-s-line ml-1 text-gray-500"></i>
                </button>

                {showLanguageDropdown && isMounted && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center ${
                          selectedLanguage === lang.code ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'
                        }`}
                      >
                        <span className="mr-3">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Chatbot Button */}
              <button
                onClick={() => setShowChatbot(true)}
                className="w-10 h-10 bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center justify-center transition-colors"
                title="AI Assistant"
              >
                <i className="ri-robot-line text-white"></i>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center"
              >
                <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-gray-700`}></i>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="mb-4">
                <SearchBar onSearch={handleSearch} placeholder="Search anything..." />
              </div>
              <nav className="space-y-2">
                <Link href="/modules" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
                  Learn
                </Link>
                <Link href="/analysis" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
                  Analysis
                </Link>
                <Link href="/quiz" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
                  Quiz
                </Link>
                <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
                  Dashboard
                </Link>
                <Link href="/resources" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
                  Resources
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* AI Chatbot Modal */}
      {showChatbot && isMounted && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                  <i className="ri-robot-line text-white"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
                  <p className="text-sm text-gray-600">Ask anything about isotopes and nuclear technology</p>
                </div>
              </div>
              <button
                onClick={() => setShowChatbot(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <iframe
                src="/chatbot"
                className="w-full h-full border-0"
                title="AI Chatbot"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
