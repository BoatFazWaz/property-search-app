'use client';

import React, { useState } from 'react';
import { PropertyFilterWidget } from '../components/widgets/property-filter';
import Image from 'next/image';

interface Property {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
  propertyType: string;
  address: string;
  imageUrl: string;
  isFeatured: boolean;
}

export default function PropertiesPage() {
  // Mock properties data
  const [properties] = useState<Property[]>([
    {
      id: '1',
      title: 'Modern Apartment',
      price: 500000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      yearBuilt: 2018,
      propertyType: 'Apartment',
      address: '123 Main St, City',
      imageUrl: 'https://placehold.co/600x400/png?text=Modern+Apartment',
      isFeatured: true
    },
    {
      id: '2',
      title: 'Luxury Villa',
      price: 1200000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      yearBuilt: 2015,
      propertyType: 'House',
      address: '456 Park Ave, City',
      imageUrl: 'https://placehold.co/600x400/png?text=Luxury+Villa',
      isFeatured: true
    },
    {
      id: '3',
      title: 'Downtown Condo',
      price: 650000,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      yearBuilt: 2020,
      propertyType: 'Condo',
      address: '789 Center St, City',
      imageUrl: 'https://placehold.co/600x400/png?text=Downtown+Condo',
      isFeatured: false
    },
    {
      id: '4',
      title: 'Suburban House',
      price: 850000,
      bedrooms: 4,
      bathrooms: 2.5,
      sqft: 2400,
      yearBuilt: 2010,
      propertyType: 'House',
      address: '101 Maple Dr, Suburb',
      imageUrl: 'https://placehold.co/600x400/png?text=Suburban+House',
      isFeatured: false
    },
    {
      id: '5',
      title: 'Waterfront Property',
      price: 1500000,
      bedrooms: 5,
      bathrooms: 4,
      sqft: 3200,
      yearBuilt: 2017,
      propertyType: 'House',
      address: '202 Lake View Rd, Lakeside',
      imageUrl: 'https://placehold.co/600x400/png?text=Waterfront+Property',
      isFeatured: true
    },
    {
      id: '6',
      title: 'City Loft',
      price: 450000,
      bedrooms: 1,
      bathrooms: 1,
      sqft: 950,
      yearBuilt: 2016,
      propertyType: 'Apartment',
      address: '303 Urban Ave, Downtown',
      imageUrl: 'https://placehold.co/600x400/png?text=City+Loft',
      isFeatured: false
    }
  ]);

  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 2000000 },
    bedrooms: 0,
    bathrooms: 0,
    propertyType: 'any'
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // In a real app, you would filter the properties here or make an API call
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">Property Listings</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <PropertyFilterWidget onFilterChange={handleFilterChange} />
        </div>
        
        {/* Property Listings */}
        <div className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">{properties.length} properties found</p>
            <select className="border rounded-md px-3 py-2">
              <option>Sort by: Newest</option>
              <option>Sort by: Price (Low to High)</option>
              <option>Sort by: Price (High to Low)</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div 
                key={property.id} 
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white"
              >
                <div className="relative h-48">
                  <Image
                    src={property.imageUrl}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  {property.isFeatured && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{property.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{property.address}</p>
                  <p className="text-lg font-bold text-blue-600 mb-2">${property.price.toLocaleString()}</p>
                  
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{property.bedrooms} beds</span>
                    <span>{property.bathrooms} baths</span>
                    <span>{property.sqft.toLocaleString()} sqft</span>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t flex justify-between">
                    <span className="text-sm text-gray-500">{property.propertyType}</span>
                    <span className="text-sm text-gray-500">Built in {property.yearBuilt}</span>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                      View Details
                    </button>
                    <button className="p-2 border rounded hover:bg-gray-50">
                      <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <nav className="flex space-x-2" aria-label="Pagination">
              <a href="#" className="px-3 py-2 border rounded text-gray-500 hover:bg-gray-50">
                Previous
              </a>
              <a href="#" className="px-3 py-2 border rounded bg-blue-500 text-white">
                1
              </a>
              <a href="#" className="px-3 py-2 border rounded text-gray-500 hover:bg-gray-50">
                2
              </a>
              <a href="#" className="px-3 py-2 border rounded text-gray-500 hover:bg-gray-50">
                3
              </a>
              <a href="#" className="px-3 py-2 border rounded text-gray-500 hover:bg-gray-50">
                Next
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
} 