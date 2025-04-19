'use client'

import { useState } from 'react'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import PropertyCard from '@/components/PropertyCard'
import Header from '@/components/Header'

// Mock property data - would come from API in real app
const mockProperties = [
  {
    id: '1',
    title: 'Modern Apartment in Downtown',
    price: 350000,
    bedrooms: 2,
    bathrooms: 1,
    area: 850,
    address: '123 Main St, Downtown',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '2',
    title: 'Spacious Family Home',
    price: 550000,
    bedrooms: 4,
    bathrooms: 2.5,
    area: 2200,
    address: '456 Oak Avenue, Suburbia',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '3',
    title: 'Luxury Penthouse with View',
    price: 1200000,
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    address: '789 Sky Tower, City Center',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  }
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [properties, setProperties] = useState(mockProperties)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // In a real app, this would call the backend API
    const filtered = mockProperties.filter(
      property => 
        property.title.toLowerCase().includes(query.toLowerCase()) ||
        property.address.toLowerCase().includes(query.toLowerCase())
    )
    setProperties(filtered)
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Find your perfect property
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Search through thousands of listings to find the perfect home for you and your family.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Properties'}
          </h2>
          
          {properties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No properties found. Try a different search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map(property => (
                <Link href={`/property/${property.id}`} key={property.id} className="hover:no-underline">
                  <PropertyCard property={property} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 