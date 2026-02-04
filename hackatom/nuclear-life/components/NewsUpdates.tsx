
'use client';

import { useState, useEffect } from 'react';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  timestamp: Date;
  category: string;
  urgent: boolean;
}

export default function NewsUpdates() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching real-time news data
    const fetchNews = () => {
      // In a real app, this would fetch from an API
      const mockNews = [
        {
          id: 1,
          title: "New Lutetium-177 Production Facility Opens in Europe",
          summary: "Advanced medical isotope production expected to reduce treatment costs by 30%",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          category: "Medical",
          urgent: false
        },
        {
          id: 2,
          title: "Space Mission Success: RTG Powers Mars Rover for 5+ Years",
          summary: "Plutonium-238 radioisotope system demonstrates exceptional ROI for space exploration",
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
          category: "Space",
          urgent: false
        },
        {
          id: 3,
          title: "Global Isotope Market Reaches $15.8 Billion",
          summary: "Medical applications drive 12% annual growth in nuclear isotope industry",
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
          category: "Economics",
          urgent: true
        },
        {
          id: 4,
          title: "Food Irradiation Technology Prevents 2 Million Tons of Waste",
          summary: "New efficiency improvements reduce energy consumption by 25%",
          timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
          category: "Agriculture",
          urgent: false
        },
        {
          id: 5,
          title: "Breakthrough in Technetium-99m Generator Technology",
          summary: "New design extends generator life by 40%, reducing medical imaging costs",
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          category: "Medical",
          urgent: true
        }
      ];
      
      setNews(mockNews);
      setLoading(false);
    };

    fetchNews();
    
    // Update news every 30 minutes
    const interval = setInterval(fetchNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60)); // minutes
    
    if (diff < 60) return `${diff}m ago`;
    if (diff < 24 * 60) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / (24 * 60))}d ago`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Medical': return 'bg-red-100 text-red-800';
      case 'Space': return 'bg-purple-100 text-purple-800';
      case 'Economics': return 'bg-green-100 text-green-800';
      case 'Agriculture': return 'bg-yellow-100 text-yellow-800';
      case 'Industry': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-l-4 border-gray-200 pl-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <i className="ri-newspaper-line mr-2 text-indigo-600"></i>
          Latest Nuclear Industry News
        </h3>
        <div className="flex items-center text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Live Updates
        </div>
      </div>

      <div className="space-y-4">
        {news.map((article) => (
          <div key={article.id} className={`border-l-4 ${article.urgent ? 'border-red-500' : 'border-blue-500'} pl-4 hover:bg-gray-50 transition-colors p-3 rounded-r-lg cursor-pointer`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </span>
                  {article.urgent && (
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                      <i className="ri-alarm-warning-line mr-1"></i>
                      Urgent
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    {getTimeAgo(article.timestamp)}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1 hover:text-indigo-600 transition-colors">
                  {article.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {article.summary}
                </p>
              </div>
              <button className="ml-4 text-gray-400 hover:text-gray-600 flex-shrink-0">
                <i className="ri-external-link-line"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-2 rounded-lg font-medium transition-colors">
          View All News Updates
        </button>
      </div>
    </div>
  );
}
