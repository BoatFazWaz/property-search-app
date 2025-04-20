'use client';

import React, { useState } from 'react';

interface FilterOptions {
  priceRange: {
    min: number;
    max: number;
  };
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
}

export function PropertyFilterWidget({
  onFilterChange
}: {
  onFilterChange: (filters: FilterOptions) => void;
}) {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: {
      min: 0,
      max: 2000000,
    },
    bedrooms: 0,
    bathrooms: 0,
    propertyType: 'any',
  });

  const handleFilterChange = (
    key: keyof FilterOptions,
    value: string | number | { min: number; max: number }
  ) => {
    const newFilters = {
      ...filters,
      [key]: value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const propertyTypes = [
    'Any',
    'House',
    'Apartment',
    'Condo',
    'Townhouse',
    'Land',
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Filter Properties</h2>
      
      <div className="space-y-4">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Min"
              className="w-full px-3 py-2 border rounded-md"
              value={filters.priceRange.min}
              onChange={(e) =>
                handleFilterChange('priceRange', {
                  ...filters.priceRange,
                  min: parseInt(e.target.value) || 0,
                })
              }
            />
            <input
              type="number"
              placeholder="Max"
              className="w-full px-3 py-2 border rounded-md"
              value={filters.priceRange.max}
              onChange={(e) =>
                handleFilterChange('priceRange', {
                  ...filters.priceRange,
                  max: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bedrooms
          </label>
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={filters.bedrooms}
            onChange={(e) =>
              handleFilterChange('bedrooms', parseInt(e.target.value))
            }
          >
            <option value={0}>Any</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}+
              </option>
            ))}
          </select>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bathrooms
          </label>
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={filters.bathrooms}
            onChange={(e) =>
              handleFilterChange('bathrooms', parseInt(e.target.value))
            }
          >
            <option value={0}>Any</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}+
              </option>
            ))}
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={filters.propertyType}
            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type.toLowerCase()}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
} 