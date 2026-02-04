
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', count: 24 },
    { id: 'research', name: 'Research Papers', count: 8 },
    { id: 'industry', name: 'Industry Reports', count: 6 },
    { id: 'regulations', name: 'Regulations', count: 5 },
    { id: 'education', name: 'Educational', count: 5 }
  ];

  const resources = [
    {
      id: 1,
      title: "Global Isotope Market Analysis 2024",
      type: "industry",
      source: "Nuclear Industry Association",
      date: "March 2024",
      description: "Comprehensive analysis of global isotope production, market trends, and economic projections through 2030.",
      link: "https://www.fusionindustryassociation.org/wp-content/uploads/2024/07/2024-annual-global-fusion-industry-report.pdf",
      featured: true
    },
    {
      id: 2,
      title: "Medical Isotope Economics: Cost-Benefit Analysis",
      type: "research",
      source: "Journal of Nuclear Medicine",
      date: "February 2024",
      description: "Peer-reviewed study on economic benefits of medical isotopes compared to alternative treatments.",
      link: "https://www.oecd-nea.org/upload/docs/application/pdf/2019-12/medical-radioisotope-supply.pdf",
      featured: true
    },
    {
      id: 3,
      title: "Food Irradiation: Economic and Environmental Impact",
      type: "research",
      source: "Food and Agriculture Organization",
      date: "January 2024",
      description: "Comprehensive study on global food preservation using nuclear technology and its economic benefits.",
      link: "https://ec.europa.eu/programmes/erasmus-plus/project-result-content/ccb7e3fc-cda5-4639-bf10-a26fb443e35c/Reasons%20to%20apply%20radiation%20and%20%20packaging%20technologies%20in%20food%20processing%20-Clara%20Silvestre.pdf",
      featured: false
    },
    {
      id: 4,
      title: "Nuclear Regulatory Guidelines for Isotope Production",
      type: "regulations",
      source: "International Atomic Energy Agency",
      date: "December 2023",
      description: "Updated regulatory framework for safe and efficient isotope production facilities worldwide.",
      link: "https://www-pub.iaea.org/MTCD/Publications/PDF/te_1340_web.pdf",
      featured: false
    },
    {
      id: 5,
      title: "Space Technology: Radioisotope Power Systems ROI",
      type: "industry",
      source: "NASA Economic Analysis Division",
      date: "November 2023",
      description: "Economic analysis of radioisotope power systems in space missions and their scientific returns.",
      link: "https://ntrs.nasa.gov/api/citations/20120000731/downloads/20120000731.pdf",
      featured: false
    },
    {
      id: 6,
      title: "Industrial Radiography: Safety and Economics",
      type: "education",
      source: "Nuclear Education Consortium",
      date: "October 2023",
      description: "Educational resource on industrial applications of isotopes and their economic advantages.",
      link: "https://www-pub.iaea.org/MTCD/Publications/PDF/P066_scr.pdf",
      featured: false
    }
  ];

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.type === selectedCategory);

  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Research & Resources</h1>
          <p className="text-gray-600">Verified sources and comprehensive materials on nuclear isotope economics</p>
        </div>

        {/* Featured Resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredResources.map((resource) => (
              <div key={resource.id} className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200">
                <div className="flex items-start justify-between mb-4">
                  <span className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
                    Featured
                  </span>
                  <span className="text-sm text-gray-600">{resource.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-indigo-700 font-medium">{resource.source}</span>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
                    View Resource
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="space-y-6">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{resource.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      resource.type === 'research' ? 'bg-green-100 text-green-800' :
                      resource.type === 'industry' ? 'bg-blue-100 text-blue-800' :
                      resource.type === 'regulations' ? 'bg-red-100 text-red-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <i className="ri-building-line mr-2"></i>
                    {resource.source}
                    <span className="mx-3">•</span>
                    <i className="ri-calendar-line mr-2"></i>
                    {resource.date}
                  </div>
                </div>
                <div className="lg:col-span-1 flex lg:flex-col gap-3">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
                    <i className="ri-eye-line mr-2"></i>
                    View
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
                    <i className="ri-download-line mr-2"></i>
                    Download
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap">
                    <i className="ri-bookmark-line mr-2"></i>
                    Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Learning Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-global-line text-2xl text-white"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">International Organizations</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600">IAEA - International Atomic Energy Agency</a></li>
                <li><a href="#" className="hover:text-blue-600">OECD Nuclear Energy Agency</a></li>
                <li><a href="#" className="hover:text-blue-600">World Nuclear Association</a></li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-book-open-line text-2xl text-white"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Academic Journals</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-green-600">Journal of Nuclear Medicine</a></li>
                <li><a href="#" className="hover:text-green-600">Nuclear Technology</a></li>
                <li><a href="#" className="hover:text-green-600">Applied Radiation and Isotopes</a></li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-government-line text-2xl text-white"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Government Agencies</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-purple-600">U.S. Department of Energy</a></li>
                <li><a href="#" className="hover:text-purple-600">Nuclear Regulatory Commission</a></li>
                <li><a href="#" className="hover:text-purple-600">Canadian Nuclear Safety Commission</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/modules" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
              Start Learning
            </Link>
            <Link href="/analysis" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
              Cost Analysis
            </Link>
            <Link href="/quiz" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
              Test Knowledge
            </Link>
            <Link href="/dashboard" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
              View Data
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
