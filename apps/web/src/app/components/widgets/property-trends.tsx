'use client';

import React from 'react';
import { Card } from '@repo/ui/card';

export function PropertyTrendsWidget() {
  return (
    <Card title="Market Trends">
      <div className="p-4">
        <div className="h-40 flex items-center justify-center bg-gray-100 rounded-lg">
          <p className="text-gray-500">Price trend chart will be displayed here</p>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <div className="flex justify-between items-center mb-2">
            <span>Year-over-year change:</span>
            <span className="font-semibold text-green-600">+5.2%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Month-over-month:</span>
            <span className="font-semibold text-green-600">+0.8%</span>
          </div>
        </div>
      </div>
    </Card>
  );
} 