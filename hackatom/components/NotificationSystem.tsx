
'use client';

import { useState, useEffect } from 'react';

export default function NotificationSystem() {
  const [permission, setPermission] = useState('default');
  const [isSupported, setIsSupported] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Check if browser supports notifications and service workers
    if ('Notification' in window && 'serviceWorker' in navigator) {
      setIsSupported(true);
      setPermission(Notification.permission);
      
      // Register service worker
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Track user activity with more robust detection
    const trackActivity = () => {
      const now = Date.now();
      localStorage.setItem('lastVisit', now.toString());
      localStorage.setItem('lastActivity', now.toString());
    };

    // Enhanced return visit detection with 24-hour check
    const checkReturnVisit = () => {
      const lastVisit = localStorage.getItem('lastVisit');
      const notificationSent = localStorage.getItem('notificationSent24h');
      
      if (lastVisit) {
        const timeDiff = Date.now() - parseInt(lastVisit);
        const hoursSince = Math.floor(timeDiff / (1000 * 60 * 60));
        
        // Check if 24+ hours have passed and notification hasn't been sent yet
        if (hoursSince >= 24 && !notificationSent && Notification.permission === 'granted') {
          showReturnNotification();
          localStorage.setItem('notificationSent24h', Date.now().toString());
        }
        
        // Reset notification flag after 48 hours to allow new notifications
        if (hoursSince >= 48) {
          localStorage.removeItem('notificationSent24h');
        }
      }
    };

    // Track various user activities
    const activityEvents = ['click', 'scroll', 'keydown', 'mousemove'];
    activityEvents.forEach(event => {
      document.addEventListener(event, trackActivity, { passive: true });
    });

    // Check immediately and then periodically
    trackActivity();
    checkReturnVisit();
    
    // Check every 30 minutes for return visits
    const interval = setInterval(checkReturnVisit, 30 * 60 * 1000);
    
    // Cleanup
    return () => {
      clearInterval(interval);
      activityEvents.forEach(event => {
        document.removeEventListener(event, trackActivity);
      });
    };
  }, []);

  const requestPermission = async () => {
    if (!isSupported) return;

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        showWelcomeNotification();
        // Show immediate in-app confirmation
        addInAppNotification('Notifications enabled! We\'ll remind you about new updates and learning opportunities.', 'success');
      } else {
        addInAppNotification('Notifications blocked. You can enable them anytime in your browser settings.', 'warning');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      addInAppNotification('Unable to enable notifications. Please check your browser settings.', 'error');
    }
  };

  const showWelcomeNotification = () => {
    if (Notification.permission === 'granted') {
      const notification = new Notification('Welcome to Isotope Impact Explorer! 🚀', {
        body: 'Start exploring nuclear technology economics and stay updated with the latest industry insights.',
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        tag: 'welcome',
        requireInteraction: false,
        silent: false,
        actions: [
          {
            action: 'start-learning',
            title: '📚 Start Learning'
          },
          {
            action: 'view-dashboard',
            title: '📊 View Dashboard'
          }
        ]
      });

      notification.onclick = () => {
        window.focus();
        window.location.href = '/modules';
        notification.close();
      };

      // Auto-close after 8 seconds
      setTimeout(() => notification.close(), 8000);
    }
  };

  const showReturnNotification = () => {
    if (Notification.permission === 'granted') {
      const titles = [
        'Welcome back! 🎯',
        'Ready to continue learning? 📚',
        'New insights await! 🔬',
        'Your nuclear journey continues! ⚛️'
      ];
      
      const bodies = [
        'New isotope research and market updates are available. Continue your nuclear economics journey!',
        'Fresh content and analysis tools are ready for you. Dive back into nuclear technology!',
        'Updated market data and new learning modules await. Explore the latest in nuclear economics!',
        'Don\'t miss out on the latest nuclear industry developments. Your learning journey continues!'
      ];

      const randomTitle = titles[Math.floor(Math.random() * titles.length)];
      const randomBody = bodies[Math.floor(Math.random() * bodies.length)];

      const notification = new Notification(randomTitle, {
        body: randomBody,
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        tag: 'return-visit-24h',
        requireInteraction: true,
        silent: false,
        actions: [
          {
            action: 'view-updates',
            title: '🔄 View Updates'
          },
          {
            action: 'continue-quiz',
            title: '🎯 Continue Quiz'
          },
          {
            action: 'analyze-costs',
            title: '💰 Analyze Costs'
          }
        ]
      });

      notification.onclick = () => {
        window.focus();
        window.location.href = '/dashboard';
        notification.close();
      };

      // Auto-close after 15 seconds
      setTimeout(() => notification.close(), 15000);

      // Also show in-app notification
      addInAppNotification('Welcome back! Check out the latest nuclear technology updates.', 'info');
    }
  };

  const showNewsNotification = (newsItem) => {
    if (Notification.permission === 'granted') {
      const notification = new Notification('🔬 Nuclear Industry Update', {
        body: `Breaking: ${newsItem.title}`,
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        tag: 'news-update',
        requireInteraction: false,
        data: { newsId: newsItem.id, category: newsItem.category }
      });

      notification.onclick = () => {
        window.focus();
        window.location.href = '/resources';
        notification.close();
      };

      setTimeout(() => notification.close(), 10000);
    }
  };

  const addInAppNotification = (message, type = 'info') => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]); // Keep only 5 most recent
    
    // Auto-remove after 8 seconds (longer for important messages)
    const autoCloseTime = type === 'error' ? 10000 : type === 'warning' ? 8000 : 6000;
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, autoCloseTime);
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return 'ri-check-circle-line text-green-500';
      case 'warning': return 'ri-alert-line text-yellow-500';
      case 'error': return 'ri-error-warning-line text-red-500';
      case 'info': return 'ri-information-line text-blue-500';
      default: return 'ri-notification-line text-indigo-500';
    }
  };

  const getNotificationBg = (type) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'error': return 'bg-red-50 border-red-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-white border-gray-200';
    }
  };

  // Expose functions globally for other components to use
  useEffect(() => {
    window.showNotification = addInAppNotification;
    window.showNewsNotification = showNewsNotification;
    window.requestNotificationPermission = requestPermission;
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {/* Permission Request Banner */}
      {isSupported && permission === 'default' && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-5 shadow-xl animate-pulse">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
              <i className="ri-notification-line text-lg text-white"></i>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold mb-2">
                Stay Connected! 🚀
              </h4>
              <p className="text-sm opacity-90 mb-4">
                Get personalized notifications about nuclear industry updates, learning progress, and return reminders when you're away for 24+ hours.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={requestPermission}
                  className="bg-white/20 backdrop-blur hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                >
                  ✨ Enable Notifications
                </button>
                <button
                  onClick={() => setPermission('denied')}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced In-App Notifications */}
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getNotificationBg(notification.type)} border rounded-xl p-4 shadow-lg max-w-sm transform transition-all duration-300 hover:scale-102 ${
            notification.read ? 'opacity-75 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <div className="flex items-start">
            <div className="w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
              <i className={getNotificationIcon(notification.type)}></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 leading-relaxed mb-2">
                {notification.message}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500" suppressHydrationWarning={true}>
                  {notification.timestamp.toLocaleTimeString()}
                </span>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
            <button
              onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
              className="ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0 w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
            >
              <i className="ri-close-line text-sm"></i>
            </button>
          </div>
        </div>
      ))}

      {/* Notification Status Indicator */}
      {isSupported && permission === 'granted' && (
        <div className="fixed bottom-4 right-4">
          <div className="bg-green-100 border border-green-200 rounded-full p-2 shadow-sm">
            <i className="ri-notification-check-line text-green-600"></i>
          </div>
        </div>
      )}
    </div>
  );
}
