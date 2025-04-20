'use client';

import React, { useState } from 'react';
import { PropertyListWidget } from '../components/widgets/property-list';
import { PropertyFilterWidget } from '../components/widgets/property-filter';

export default function PropertiesPage() {
  // State will be used when filter implementation is complete
  const [_filteredProperties, _setFilteredProperties] = useState([]);

  const handleFilterChange = (filters: any) => {
    // TODO: Implement actual filtering logic here
    console.log('Filters changed:', filters);
    // For future implementation:
    // _setFilteredProperties(filteredResults);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Property Search</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <PropertyFilterWidget onFilterChange={handleFilterChange} />
        </div>
        
        {/* Property List */}
        <div className="lg:col-span-3">
          <PropertyListWidget />
        </div>
      </div>
    </div>
  );
} 