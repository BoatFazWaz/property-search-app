'use client';

import { useEffect, useState } from 'react';
import { Card } from '@repo/ui/card';
import { LoadingSkeleton } from './loading-skeleton';
import { RefreshButton } from './refresh-button';
import { ErrorBoundary } from './error-boundary';

interface GitHubIssue {
  id: string;
  title: string;
  number: number;
  state: string;
  repository: string;
  url: string;
  created_at: string;
}

export function GitHubIssuesWidget() {
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/github/issues?username=${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`
      );
      if (!response.ok) throw new Error('Failed to fetch issues');
      const data = await response.json();
      setIssues(data);
    } catch (err) {
      setError('Failed to load GitHub issues');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const content = (
    <Card title="GitHub Issues">
      <div className="flex justify-end mb-4">
        <RefreshButton onRefresh={fetchIssues} loading={loading} />
      </div>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : loading ? (
        <LoadingSkeleton className="h-16" count={3} />
      ) : (
        <div className="space-y-3">
          {issues.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No open issues found
            </p>
          ) : (
            issues.map((issue) => (
              <a
                key={issue.id}
                href={issue.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-lg border border-gray-200 dark:border-gray-700
                         hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-start">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {issue.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {issue.repository} #{issue.number}
                    </p>
                  </div>
                  <div className="ml-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500">
                      {issue.state}
                    </span>
                  </div>
                </div>
              </a>
            ))
          )}
        </div>
      )}
    </Card>
  );

  return <ErrorBoundary>{content}</ErrorBoundary>;
} 