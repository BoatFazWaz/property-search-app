'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Property {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
  address: string;
}

export function PropertyListWidget() {
  const [properties, setProperties] = useState<Property[]>([
    // Sample data - replace with actual API call
    {
      id: '1',
      title: 'Modern Apartment',
      price: 500000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      imageUrl: '/sample-property-1.jpg',
      address: '123 Main St, City'
    },
    {
      id: '2',
      title: 'Luxury Villa',
      price: 1200000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      imageUrl: '/sample-property-2.jpg',
      address: '456 Park Ave, City'
    }
  ]);

  return (
    <div className="h-full w-full overflow-auto bg-white rounded-lg border border-gray-200">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Featured Properties</h2>
        <div className="space-y-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative w-48 h-32">
                <Image
                  src={property.imageUrl}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 p-4">
                <h3 className="font-semibold text-lg">{property.title}</h3>
                <p className="text-gray-600 text-sm">{property.address}</p>
                <div className="mt-2 flex items-center gap-4">
                  <span className="text-lg font-bold text-blue-600">
                    ${property.price.toLocaleString()}
                  </span>
                  <div className="flex gap-3 text-sm text-gray-500">
                    <span>{property.bedrooms} beds</span>
                    <span>{property.bathrooms} baths</span>
                    <span>{property.sqft.toLocaleString()} sqft</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 