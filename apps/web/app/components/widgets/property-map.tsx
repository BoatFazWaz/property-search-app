'use client';

import React from 'react';
import dynamic from 'next/dynamic';

interface Property {
  id: string;
  title: string;
  price: number;
  location: {
    lat: number;
    lng: number;
  };
}

// Dynamic import with no SSR to prevent 'window is not defined' errors
const MapWithNoSSR = dynamic(
  () => import('./map-component'),
  { 
    ssr: false,
    loading: () => <div className="h-full w-full flex items-center justify-center bg-gray-100 p-4 rounded min-h-[400px]">Loading map...</div>
  }
);

export function PropertyMapWidget() {
  // Use a constant instead of state to avoid hydration mismatch
  const properties = [
    {
      id: '1',
      title: 'Modern Apartment',
      price: 500000,
      location: { lat: 51.505, lng: -0.09 }
    },
    {
      id: '2',
      title: 'Luxury Villa',
      price: 1200000,
      location: { lat: 51.51, lng: -0.1 }
    }
  ];

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border border-gray-200">
      <MapWithNoSSR properties={properties} />
    </div>
  );
} 