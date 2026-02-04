'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Auto-slide for features
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(slideTimer);
    };
  }, []);

  const heroFeatures = [
    {
      title: "Medical Revolution",
      description: "80% of nuclear medicine procedures worldwide",
      icon: "ri-heart-pulse-line",
      color: "from-red-500 to-pink-500"
    },
    {
      title: "Industrial Innovation", 
      description: "Non-destructive testing & quality control",
      icon: "ri-settings-3-line",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Agricultural Advancement",
      description: "Food preservation & crop improvement",
      icon: "ri-plant-line",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Space Exploration",
      description: "Powering deep space missions",
      icon: "ri-rocket-line",
      color: "from-purple-500 to-violet-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      <Header />
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-pulse particle-${i}`}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 text-center text-white z-10">
          
          {/* Main Title with Advanced Animation */}
          <div className={`mb-8 transition-all duration-1500 ease-out ${
            isLoaded ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform translate-y-12 scale-95'
          }`}>
            <div className="relative">
              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
                IsoLearn
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent blur-sm opacity-50 text-6xl md:text-8xl font-bold">
                IsoLearn
              </div>
            </div>
            <p className="text-xl md:text-2xl mb-4 text-blue-200 font-light">
              Where Nuclear Science Meets Everyday Innovation
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
          </div>

          {/* Subtitle with Delay */}
          <p className={`text-lg md:text-xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed transition-all duration-1500 delay-300 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            Explore the extraordinary applications of nuclear isotopes transforming medicine, 
            agriculture, industry, and space technology. Discover economic opportunities in 
            the $150 billion nuclear technology ecosystem.
          </p>

          {/* Action Buttons with Stagger Animation */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1500 delay-500 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <Link href="/modules" className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-2xl transform hover:-translate-y-1 cursor-pointer">
              <span className="relative z-10 flex items-center justify-center">
                <i className="ri-rocket-line mr-2"></i>
                Start Learning Journey
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </Link>
            
            <Link href="/overview" className="group relative overflow-hidden border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-2xl transform hover:-translate-y-1 cursor-pointer">
              <span className="relative z-10 flex items-center justify-center">
                <i className="ri-explore-line mr-2"></i>
                Explore Features
              </span>
            </Link>
          </div>

          {/* Rotating Feature Showcase */}
          <div className={`transition-all duration-1500 delay-700 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-4xl mx-auto border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {heroFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className={`transform transition-all duration-500 ${
                      currentSlide === index ? 'scale-110 z-10' : 'scale-100'
                    }`}
                  >
                    <div className={`relative p-6 rounded-xl bg-gradient-to-br ${feature.color} text-white group cursor-pointer hover:scale-105 transition-transform`}>
                      <div className="text-3xl mb-4">
                        <i className={feature.icon}></i>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                      <p className="text-sm opacity-90">{feature.description}</p>
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Progress Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {heroFeatures.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSlide === index ? 'bg-cyan-400 w-8' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-16 h-16 bg-cyan-400/20 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-10 w-12 h-12 bg-purple-400/20 rounded-full animate-ping ping-delay-1"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-blue-400/20 rounded-full animate-ping ping-delay-2"></div>
      </div>

      {/* Applications Overview Section */}
      <div className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Nuclear Applications Transforming Industries
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover how nuclear isotopes drive innovation across medicine, agriculture, 
              industry, and space exploration with measurable economic impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                href: '/modules', 
                icon: 'ri-heart-pulse-line', 
                title: 'Healthcare Revolution', 
                desc: 'Cancer treatment, medical imaging, and sterilization procedures saving millions of lives annually.',
                stats: '$8.2B Market',
                color: 'from-red-500 to-pink-600',
                delay: 'delay-100'
              },
              { 
                href: '/modules', 
                icon: 'ri-plant-line', 
                title: 'Agricultural Innovation', 
                desc: 'Food preservation, pest control, and crop improvement enhancing global food security.',
                stats: '$2.4B Market',
                color: 'from-green-500 to-emerald-600',
                delay: 'delay-200'
              },
              { 
                href: '/modules', 
                icon: 'ri-settings-3-line', 
                title: 'Industrial Solutions', 
                desc: 'Non-destructive testing, quality control, and manufacturing process optimization.',
                stats: '$4.1B Market',
                color: 'from-blue-500 to-cyan-600',
                delay: 'delay-300'
              },
              { 
                href: '/modules', 
                icon: 'ri-rocket-line', 
                title: 'Space Technology', 
                desc: 'Radioisotope power systems enabling deep space missions and satellite operations.',
                stats: '$850M Market',
                color: 'from-purple-500 to-violet-600',
                delay: 'delay-400'
              }
            ].map((item, index) => (
              <Link 
                key={index}
                href={item.href} 
                className={`group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer transform border border-slate-200 hover:border-transparent ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${item.delay}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className={`relative w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`${item.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                  {item.title}
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                    {item.stats}
                  </span>
                  <i className="ri-arrow-right-line text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300"></i>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Tools & Features */}
      <div className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Interactive Learning & Analysis Tools
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Master nuclear technology economics through hands-on tools, quizzes, and comprehensive analysis features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                href: '/modules',
                icon: 'ri-book-open-line',
                title: 'Learning Modules',
                desc: 'Interactive lessons covering isotope basics, economic analysis, and real-world applications.',
                cta: 'Start Learning →',
                color: 'from-cyan-500 to-blue-600'
              },
              {
                href: '/quiz',
                icon: 'ri-trophy-line',
                title: 'Advanced Quiz',
                desc: 'Multi-level economics-focused quiz with progress tracking and detailed explanations.',
                cta: 'Challenge Yourself →',
                color: 'from-purple-500 to-pink-600'
              },
              {
                href: '/analysis',
                icon: 'ri-bar-chart-2-line',
                title: 'Cost Analysis',
                desc: 'Comprehensive isotope cost analysis with pricing forecasts and profitability insights.',
                cta: 'Analyze Costs →',
                color: 'from-green-500 to-teal-600'
              },
              {
                href: '/manufacturing',
                icon: 'ri-factory-line',
                title: 'Manufacturing Planner',
                desc: 'Facility planning tools with investment calculations and risk assessments.',
                cta: 'Plan Facility →',
                color: 'from-orange-500 to-red-600'
              },
              {
                href: '/dashboard',
                icon: 'ri-dashboard-line',
                title: 'Data Dashboard',
                desc: 'Global market data, production statistics, and real-time industry insights.',
                cta: 'View Dashboard →',
                color: 'from-blue-500 to-indigo-600'
              },
              {
                href: '/chatbot',
                icon: 'ri-robot-line',
                title: 'AI Assistant',
                desc: 'Get instant answers about isotopes, costs, safety, and applications.',
                cta: 'Ask AI →',
                color: 'from-violet-500 to-purple-600'
              }
            ].map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className={`group relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 transform hover:-translate-y-2 cursor-pointer ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`${feature.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-blue-200 mb-6 leading-relaxed">
                  {feature.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-semibold group-hover:text-white transition-colors">
                    {feature.cta}
                  </span>
                  <i className="ri-arrow-right-line text-cyan-400 group-hover:translate-x-2 transition-transform duration-300"></i>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className={`transition-all duration-1000 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Explore Nuclear Innovation?
            </h2>
            <p className="text-xl mb-8 text-cyan-100">
              Join thousands of professionals, students, and researchers discovering 
              the economic potential of nuclear technology applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/modules" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-xl cursor-pointer">
                <i className="ri-play-circle-line mr-2"></i>
                Start Your Journey
              </Link>
              <Link href="/overview" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-xl cursor-pointer">
                <i className="ri-information-line mr-2"></i>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
