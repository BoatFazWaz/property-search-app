'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@repo/ui/card';

interface DailyQuote {
  text: string;
  author: string;
}

export function QuoteWidget() {
  const [quote, setQuote] = useState<DailyQuote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quote`);
        if (!response.ok) throw new Error('Failed to fetch quote');
        const data = await response.json();
        setQuote(data);
      } catch (_) {
        setError('Failed to load daily quote');
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (error) {
    return (
      <Card title="Daily Quote">
        <div className="text-red-500">{error}</div>
      </Card>
    );
  }

  return (
    <Card title="Daily Quote">
      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      ) : quote ? (
        <div className="space-y-3">
          <blockquote className="text-gray-900 dark:text-white italic">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          <footer className="text-sm text-gray-600 dark:text-gray-400">
            — {quote.author}
          </footer>
        </div>
      ) : null}
    </Card>
  );
} 