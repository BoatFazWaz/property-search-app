'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@repo/ui/card';
import { LoadingSkeleton } from './loading-skeleton';
import type { GithubCommit } from '@repo/api/types';

export function GitHubWidget() {
  const [commits, setCommits] = useState<GithubCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/github/commits?username=${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`);
        if (!response.ok) throw new Error('Failed to fetch commits');
        const data = await response.json();
        setCommits(data);
      } catch (err) {
        setError('Failed to load GitHub activity');
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  if (error) {
    return (
      <Card title="GitHub Activity">
        <div className="text-red-500">{error}</div>
      </Card>
    );
  }

  return (
    <Card title="GitHub Activity">
      <div className="space-y-4">
        {loading ? (
          <LoadingSkeleton className="h-16" count={3} />
        ) : (
          commits.map((commit) => (
            <div
              key={commit.sha}
              className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-3 last:pb-0"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {commit.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {commit.repo} • {new Date(commit.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
} 