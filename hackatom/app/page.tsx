
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Entry animation trigger
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section with Entry Animation */}
      <div 
        className={`relative min-h-screen bg-cover bg-center flex items-center transition-all duration-1000 ${
          isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}
        style={{
          backgroundImage: `linear-gradient(rgba(30, 64, 175, 0.8), rgba(67, 56, 202, 0.8)), url('https://readdy.ai/api/search-image?query=Modern%20nuclear%20facility%20with%20advanced%20technology%20equipment%2C%20clean%20energy%20production%2C%20scientific%20laboratory%20with%20blue%20glowing%20elements%2C%20futuristic%20industrial%20setting%20with%20sleek%20metallic%20surfaces%20and%20digital%20displays%2C%20professional%20lighting%2C%20high-tech%20atmosphere%2C%20conveying%20innovation%20and%20progress%20in%20nuclear%20science&width=1920&height=1080&seq=hero-bg&orientation=landscape')`
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-6 text-white">
          <div className="max-w-3xl">
            <div className={`mb-6 transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-8'
            }`}>
              <h1 className="text-5xl font-bold mb-4 leading-tight">
                Isotope Impact Explorer
              </h1>
              <p className="text-xl mb-2 text-blue-100">
                An Interactive Guide to Nuclear Technology Economics
              </p>
            </div>
            
            <p className={`text-lg mb-8 text-blue-50 leading-relaxed transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-8'
            }`}>
              Discover the fascinating world of nuclear isotopes beyond energy production. 
              Learn how these powerful tools revolutionize medicine, agriculture, industry, 
              and space technology while delivering exceptional economic value and environmental benefits.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-700 ${
              isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>
              <Link href="/modules" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 whitespace-nowrap cursor-pointer">
                Start Learning Journey
              </Link>
              <Link href="/dashboard" className="border-2 border-white text-white hover:bg-white hover:text-indigo-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 whitespace-nowrap cursor-pointer">
                View Data Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Applications Overview with Staggered Animation */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuclear Isotopes: Beyond Energy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore how nuclear technology creates value across multiple industries, 
              improving lives and driving economic growth worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                href: '/modules', 
                bg: 'from-red-50 to-red-100', 
                icon: 'ri-heart-pulse-line', 
                color: 'red-500', 
                title: 'Medicine', 
                desc: 'Cancer treatment, medical imaging, sterilization, and diagnostic procedures saving millions of lives annually.',
                delay: 'delay-100'
              },
              { 
                href: '/modules', 
                bg: 'from-green-50 to-green-100', 
                icon: 'ri-plant-line', 
                color: 'green-500', 
                title: 'Agriculture', 
                desc: 'Food preservation, pest control, crop improvement, and soil analysis enhancing global food security.',
                delay: 'delay-200'
              },
              { 
                href: '/modules', 
                bg: 'from-blue-50 to-blue-100', 
                icon: 'ri-hammer-line', 
                color: 'blue-500', 
                title: 'Industry', 
                desc: 'Non-destructive testing, material analysis, quality control, and manufacturing process optimization.',
                delay: 'delay-300'
              },
              { 
                href: '/modules', 
                bg: 'from-purple-50 to-purple-100', 
                icon: 'ri-rocket-line', 
                color: 'purple-500', 
                title: 'Space Tech', 
                desc: 'Radioisotope power systems, deep space missions, and satellite technology advancement.',
                delay: 'delay-400'
              }
            ].map((item, index) => (
              <Link 
                key={index}
                href={item.href} 
                className={`bg-gradient-to-br ${item.bg} p-8 rounded-xl hover:shadow-lg transition-all duration-500 hover:scale-105 cursor-pointer group transform ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${item.delay}`}
              >
                <div className={`w-16 h-16 bg-${item.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`${item.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Features with Hover Animations */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Interactive Learning Experience
            </h2>
            <p className="text-xl text-gray-600">
              Engage with cutting-edge tools to master nuclear economics
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                href: '/modules',
                color: 'indigo',
                icon: 'ri-book-open-line',
                title: 'Learning Modules',
                desc: 'Interactive lessons covering isotope basics, economic comparisons, and real-world applications across industries.',
                cta: 'Start Learning →'
              },
              {
                href: '/analysis',
                color: 'purple',
                icon: 'ri-bar-chart-2-line',
                title: 'Cost Analysis Tool',
                desc: 'Comprehensive isotope cost analysis with pricing statistics, profitability projections, and market insights.',
                cta: 'Analyze Costs →'
              },
              {
                href: '/manufacturing',
                color: 'green',
                icon: 'ri-building-line',
                title: 'Manufacturing Model',
                desc: 'Complete facility planning tool with costs, timeline, risks, and financial projections for nuclear facilities.',
                cta: 'Plan Facility →'
              }
            ].map((item, index) => (
              <Link 
                key={index}
                href={item.href} 
                className={`group bg-white p-8 rounded-xl hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer transform ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } delay-${(index + 1) * 100}`}
              >
                <div className={`w-12 h-12 bg-${item.color}-500 rounded-lg flex items-center justify-center mb-6 group-hover:bg-${item.color}-600 group-hover:scale-110 transition-all duration-300`}>
                  <i className={`${item.icon} text-xl text-white`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 mb-6">{item.desc}</p>
                <span className={`text-${item.color}-600 font-semibold group-hover:text-${item.color}-700 transition-colors`}>
                  {item.cta}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section with Counter Animation */}
      <div className="py-20 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            {[
              { value: '$150B', label: 'Annual global market value' },
              { value: '50M+', label: 'Medical procedures annually' },
              { value: '80%', label: 'Reduction in food waste' }
            ].map((stat, index) => (
              <div key={index} className={`text-center transition-all duration-1000 delay-${(index + 1) * 200} ${
                isLoaded ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'
              }`}>
                <div className="text-4xl font-bold mb-2 transition-all duration-500 hover:scale-110">
                  {stat.value}
                </div>
                <div className="text-indigo-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section with Animated Buttons */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className={`text-4xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            Ready to Explore Nuclear Economics?
          </h2>
          <p className={`text-xl text-gray-600 mb-8 transition-all duration-1000 delay-200 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            Join thousands of learners discovering the economic power of nuclear technology
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-400 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            <Link href="/modules" className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap cursor-pointer">
              Begin Your Journey
            </Link>
            <Link href="/analysis" className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap cursor-pointer">
              Analyze Costs
            </Link>
            <Link href="/manufacturing" className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap cursor-pointer">
              Plan Manufacturing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
