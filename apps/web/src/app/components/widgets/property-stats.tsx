'use client';

import React from 'react';
import { Card } from '@repo/ui/card';

export function PropertyStatsWidget() {
  // Example data - replace with real data fetching
  const stats = {
    averagePrice: '$450,000',
    listingsCount: 245,
    averageDaysOnMarket: 32
  };

  return (
    <Card title="Property Statistics">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-blue-600">{stats.averagePrice}</p>
          <p className="text-sm text-gray-500">Average Price</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-blue-600">{stats.listingsCount}</p>
          <p className="text-sm text-gray-500">Available Listings</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-blue-600">{stats.averageDaysOnMarket}</p>
          <p className="text-sm text-gray-500">Avg. Days on Market</p>
        </div>
      </div>
    </Card>
  );
} 