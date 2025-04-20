'use client';

interface RefreshButtonProps {
  onRefresh: () => Promise<void>;
  loading?: boolean;
}

export function RefreshButton({ onRefresh, loading = false }: RefreshButtonProps) {
  return (
    <button
      onClick={() => onRefresh()}
      disabled={loading}
      className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 disabled:opacity-50"
      aria-label="Refresh data"
    >
      <svg
        className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </button>
  );
} 