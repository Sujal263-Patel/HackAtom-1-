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
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80) { // near top of screen
        setShowHeader(true);
        clearTimeout(timeout); // cancel previous timer
        timeout = setTimeout(() => setShowHeader(false), 15000); // hide after 15s
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);


  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('selectedLanguage');
    if (saved) setSelectedLanguage(saved);
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'te', name: 'తెలుগు', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'ta', name: 'தমிழ்', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'as', name: 'অসমীয়া', flag: '🇮🇳' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'ne', name: 'नेपाली', flag: '🇳🇵' },
    { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
  ];

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
    setShowLanguageDropdown(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.language-dropdown')) {
        setShowLanguageDropdown(false);
      }
      if (!target.closest('.more-dropdown')) {
        setShowMoreDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <header className={`fixed left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl mx-auto transition-all duration-50 ${
    showHeader ? "top-4 opacity-100" : "-top-32 opacity-0 pointer-events-none"
  }`}
>
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg px-4 md:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-nuclear-400 to-nuclear-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <span className="text-white font-bold text-sm md:text-base">⚛</span>
              </div>
              <span className="hidden sm:block text-lg md:text-xl font-bold bg-gradient-to-r from-nuclear-600 to-nuclear-800 bg-clip-text text-transparent">
               IsoLearn
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link 
                href="/overview" 
                className="px-4 py-2 text-nuclear-700 hover:text-nuclear-800 hover:bg-white/30 rounded-lg transition-all duration-200 font-medium"
              >
                Overview
              </Link>
              <Link 
                href="/modules" 
                className="px-4 py-2 text-nuclear-700 hover:text-nuclear-800 hover:bg-white/30 rounded-lg transition-all duration-200 font-medium"
              >
                Learn
              </Link>
              <Link 
                href="/quiz" 
                className="px-4 py-2 text-nuclear-700 hover:text-nuclear-800 hover:bg-white/30 rounded-lg transition-all duration-200 font-medium"
              >
                Quiz
              </Link>
              
              {/* More Dropdown */}
              <div className="relative more-dropdown">
                <button
                  onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                  className="flex items-center px-4 py-2 text-nuclear-700 hover:text-nuclear-800 hover:bg-white/30 rounded-lg transition-all duration-200 font-medium"
                  aria-label="More navigation options"
                  {...(showMoreDropdown ? { "aria-expanded": "true" } : { "aria-expanded": "false" })}
                >
                  More
                  <svg 
                    className={`ml-1 w-4 h-4 transition-transform duration-200 ${showMoreDropdown ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showMoreDropdown && isMounted && (
                  <div className="absolute top-full mt-2 left-0 bg-white/95 backdrop-blur-sm border border-white/40 rounded-xl shadow-lg py-2 min-w-[160px] z-50">
                    <Link 
                      href="/simple-quiz" 
                      className="block px-4 py-2 text-nuclear-700 hover:text-nuclear-800 hover:bg-nuclear-50 transition-colors duration-150 text-sm"
                      onClick={() => setShowMoreDropdown(false)}
                    >
                      Quick Quiz
                    </Link>
                    <Link 
                      href="/analysis" 
                      className="block px-4 py-2 text-nuclear-700 hover:text-nuclear-800 hover:bg-nuclear-50 transition-colors duration-150 text-sm"
                      onClick={() => setShowMoreDropdown(false)}
                    >
                      Analysis
                    </Link>
                    <Link 
                      href="/manufacturing" 
                      className="block px-4 py-2 text-nuclear-700 hover:text-nuclear-800 hover:bg-nuclear-50 transition-colors duration-150 text-sm"
                      onClick={() => setShowMoreDropdown(false)}
                    >
                      Manufacturing
                    </Link>
                    <Link 
                      href="/dashboard" 
                      className="block px-4 py-2 text-nuclear-700 hover:text-nuclear-800 hover:bg-nuclear-50 transition-colors duration-150 text-sm"
                      onClick={() => setShowMoreDropdown(false)}
                    >
                      Dashboard
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-2 md:space-x-3">
              {/* Search */}
              <div className="hidden md:block">
                <SearchBar />
              </div>

              {/* AI Chatbot Button */}
              <button
                onClick={() => setShowChatbot(true)}
                className="p-2 text-nuclear-600 hover:text-nuclear-800 hover:bg-white/30 rounded-lg transition-all duration-200 group"
                aria-label="Open AI Assistant"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </button>

              {/* Language Selector */}
              <div className="relative language-dropdown">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center p-2 text-nuclear-700 hover:text-nuclear-800 hover:bg-white/30 rounded-lg transition-all duration-200 group"
                  aria-label={`Current language: ${currentLanguage.name}`}
                  {...(showLanguageDropdown ? { "aria-expanded": "true" } : { "aria-expanded": "false" })}
                >
                  <span className="mr-1 sm:mr-2 text-lg group-hover:scale-110 transition-transform">{currentLanguage.flag}</span>
                  <span className="hidden sm:block text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
                  <svg 
                    className={`ml-1 w-4 h-4 transition-transform duration-200 ${showLanguageDropdown ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showLanguageDropdown && isMounted && (
                  <div className="absolute top-full mt-2 right-0 bg-white/95 backdrop-blur-sm border border-white/40 rounded-xl shadow-lg py-2 max-h-64 overflow-y-auto z-50 min-w-[200px]" role="menu">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-4 py-2 hover:bg-nuclear-50 transition-colors duration-150 flex items-center space-x-3 ${
                          selectedLanguage === lang.code ? 'bg-nuclear-100 text-nuclear-800' : 'text-nuclear-700'
                        }`}
                        role="menuitem"
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-nuclear-600 hover:text-nuclear-800 hover:bg-white/30 rounded-lg transition-all duration-200"
                aria-label="Toggle navigation menu"
                {...(isMenuOpen ? { "aria-expanded": "true" } : { "aria-expanded": "false" })}
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-white/20">
              <div className="flex flex-col space-y-2">
                <div className="mb-3">
                  <SearchBar />
                </div>
                <Link 
                  href="/overview" 
                  className="px-3 py-2 text-nuclear-700 hover:text-nuclear-800 hover:bg-white/30 rounded-lg transition-all duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Overview
                </Link>
                <Link 
                  href="/modules" 
                  className="px-3 py-2 text-nuclear-700 hover:text-nuclear-800 hover:bg-white/30 rounded-lg transition-all duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Learn
                </Link>
                <Link 
                  href="/quiz" 
                  className="px-3 py-2 text-nuclear-700 hover:text-nuclear-800 hover:bg-white/30 rounded-lg transition-all duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Quiz
                </Link>
                <Link 
                  href="/simple-quiz" 
                  className="px-3 py-2 text-nuclear-700 hover:text-nuclear-800 hover:bg-white/30 rounded-lg transition-all duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Quick Quiz
                </Link>
                <Link 
                  href="/analysis" 
                  className="px-3 py-2 text-nuclear-700 hover:text-nuclear-800 hover:bg-white/30 rounded-lg transition-all duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Analysis
                </Link>
                <Link 
                  href="/manufacturing" 
                  className="px-3 py-2 text-nuclear-700 hover:text-nuclear-800 hover:bg-white/30 rounded-lg transition-all duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Manufacturing
                </Link>
                <Link 
                  href="/dashboard" 
                  className="px-3 py-2 text-nuclear-700 hover:text-nuclear-800 hover:bg-white/30 rounded-lg transition-all duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Chatbot Modal */}
      {showChatbot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-nuclear-800">AI Assistant</h3>
              <button
                onClick={() => setShowChatbot(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close AI Assistant"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-nuclear-600 mb-4">
              Hello! I'm your AI assistant for Nuclear Life. How can I help you learn about nuclear science today?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowChatbot(false)}
                className="px-4 py-2 text-nuclear-600 border border-nuclear-300 rounded-lg hover:bg-nuclear-50 transition-colors duration-200"
              >
                Close
              </button>
              <Link
                href="/chatbot"
                className="px-4 py-2 bg-nuclear-600 text-white rounded-lg hover:bg-nuclear-700 transition-colors duration-200"
                onClick={() => setShowChatbot(false)}
              >
                Open Chatbot
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}