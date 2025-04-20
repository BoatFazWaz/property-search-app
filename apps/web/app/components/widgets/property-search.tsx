'use client';

import React, { useState } from 'react';

export function PropertySearchWidget() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    
    // Simulate search results with a delay
    setTimeout(() => {
      // Mock search results based on the search term
      const mockResults = [
        `${searchTerm} - Modern Apartment`,
        `${searchTerm} - Luxury Villa`,
        `${searchTerm} - Downtown Condo`
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="h-full w-full bg-white rounded-lg border border-gray-200 p-4 overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Property Search</h2>
      
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search properties..."
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSearching}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      {isSearching ? (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {searchResults.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-2">{searchResults.length} results found</p>
              {searchResults.map((result, index) => (
                <div key={index} className="p-3 border rounded hover:bg-gray-50 cursor-pointer">
                  {result}
                </div>
              ))}
            </div>
          ) : searchTerm ? (
            <p className="text-gray-500 text-center p-4">No results found. Try a different search term.</p>
          ) : null}
        </>
      )}
    </div>
  );
} 