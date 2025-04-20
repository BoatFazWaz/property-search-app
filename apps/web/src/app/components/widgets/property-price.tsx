'use client';

import React from 'react';
import { Card } from '@repo/ui/card';

export function PropertyPriceWidget() {
  return (
    <Card title="Price Range">
      <div className="space-y-4">
        <div className="text-center">
          <span className="text-3xl font-bold text-blue-600">$350k-$550k</span>
          <p className="text-sm text-gray-500 mt-1">Popular price range</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-center text-sm">
          <div className="bg-gray-100 rounded p-2">
            <div className="font-bold">$275k</div>
            <div className="text-xs text-gray-500">Min price</div>
          </div>
          <div className="bg-gray-100 rounded p-2">
            <div className="font-bold">$825k</div>
            <div className="text-xs text-gray-500">Max price</div>
          </div>
        </div>
      </div>
    </Card>
  );
} 