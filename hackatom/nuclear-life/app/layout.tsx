
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NotificationSystem from '../components/NotificationSystem';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'IsoLearn - Where Nuclear Science Meets Everyday Innovation',
  description: 'Explore nuclear isotope applications transforming medicine, agriculture, industry, and space technology. Discover economic opportunities in the $150 billion nuclear ecosystem.',
  keywords: 'nuclear isotopes, medical isotopes, nuclear economics, radioisotopes, nuclear medicine, industrial applications, IsoLearn',
  authors: [{ name: 'IsoLearn Team' }],
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'IsoLearn - Nuclear Science Innovation',
    description: 'Master nuclear isotope economics through interactive learning and analysis tools',
    type: 'website',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/icon-192x192.png',
    apple: '/icon-192x192.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0891b2',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --font-inter: ${inter.style.fontFamily};
            }
          `
        }} />
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
      <body className={`${inter.variable} font-inter antialiased bg-white text-gray-900`} suppressHydrationWarning={true}>
        {children}
        <NotificationSystem />
      </body>
    </html>
  );
}
