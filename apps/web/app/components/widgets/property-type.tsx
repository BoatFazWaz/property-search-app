'use client';

import React from 'react';
import { Card } from '@repo/ui/card';

export function PropertyTypeWidget() {
  // Example data - replace with real data
  const propertyTypes = [
    { type: 'House', percentage: 45 },
    { type: 'Apartment', percentage: 30 },
    { type: 'Condo', percentage: 15 },
    { type: 'Townhouse', percentage: 10 }
  ];

  return (
    <Card title="Property Types">
      <div className="space-y-3">
        {propertyTypes.map(item => (
          <div key={item.type}>
            <div className="flex justify-between text-sm mb-1">
              <span>{item.type}</span>
              <span>{item.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
} 