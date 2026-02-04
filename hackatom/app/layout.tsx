
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NotificationSystem from '../components/NotificationSystem';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Isotope Impact Explorer - Nuclear Technology Economics',
  description: 'An interactive guide to nuclear isotope applications and economics across medicine, agriculture, industry, and space technology.',
  keywords: 'nuclear isotopes, medical isotopes, nuclear economics, radioisotopes, nuclear medicine, industrial applications',
  authors: [{ name: 'Isotope Impact Explorer Team' }],
  openGraph: {
    title: 'Isotope Impact Explorer',
    description: 'Master nuclear isotope economics through interactive learning',
    type: 'website',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/icon-192x192.png',
    apple: '/icon-192x192.png',
  },
  themeColor: '#4F46E5',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
        <NotificationSystem />
      </body>
    </html>
  );
}
