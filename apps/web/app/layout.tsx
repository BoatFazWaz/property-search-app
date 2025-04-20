import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from './components/header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PropertyFinder - Find Your Dream Home',
  description: 'Search, compare, and discover the perfect property for your needs',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.ReactElement {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Script to prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('Dark mode initialization failed:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} h-full bg-gray-50 dark:bg-gray-900`}>
        <div className="flex flex-col h-full">
          <Header />
          <div className="flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
} 