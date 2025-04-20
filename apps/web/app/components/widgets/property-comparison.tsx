'use client';

import React from 'react';

interface PropertyFeatures {
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
  hasGarage: boolean;
  hasPool: boolean;
  hasGarden: boolean;
}

interface ComparisonProperty {
  id: string;
  name: string;
  price: number;
  features: PropertyFeatures;
}

export function PropertyComparisonWidget() {
  // Mock properties for comparison
  const properties: ComparisonProperty[] = [
    {
      id: '1',
      name: 'Modern Apartment',
      price: 500000,
      features: {
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        yearBuilt: 2018,
        hasGarage: true,
        hasPool: false,
        hasGarden: false
      }
    },
    {
      id: '2',
      name: 'Luxury Villa',
      price: 1200000,
      features: {
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2800,
        yearBuilt: 2015,
        hasGarage: true,
        hasPool: true,
        hasGarden: true
      }
    },
    {
      id: '3',
      name: 'Downtown Condo',
      price: 650000,
      features: {
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1800,
        yearBuilt: 2020,
        hasGarage: true,
        hasPool: true,
        hasGarden: false
      }
    }
  ];

  const featureLabels = {
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    sqft: 'Square Feet',
    yearBuilt: 'Year Built',
    hasGarage: 'Garage',
    hasPool: 'Pool',
    hasGarden: 'Garden'
  };

  const renderFeatureValue = (feature: keyof PropertyFeatures, value: any) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="text-green-500">
          <svg className="w-5 h-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </span>
      ) : (
        <span className="text-red-500">
          <svg className="w-5 h-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
      );
    }
    
    if (feature === 'sqft') {
      return `${value.toLocaleString()} sqft`;
    }
    
    return value;
  };

  return (
    <div className="h-full w-full bg-white rounded-lg border border-gray-200 p-4 overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Compare Properties</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Feature
              </th>
              {properties.map((property) => (
                <th key={property.id} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {property.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-3 text-sm font-medium">Price</td>
              {properties.map((property) => (
                <td key={property.id} className="px-4 py-3 text-sm font-semibold text-blue-600">
                  ${property.price.toLocaleString()}
                </td>
              ))}
            </tr>
            
            {Object.entries(featureLabels).map(([key, label]) => (
              <tr key={key}>
                <td className="px-4 py-3 text-sm font-medium">{label}</td>
                {properties.map((property) => (
                  <td key={property.id} className="px-4 py-3 text-sm">
                    {renderFeatureValue(key as keyof PropertyFeatures, property.features[key as keyof PropertyFeatures])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 