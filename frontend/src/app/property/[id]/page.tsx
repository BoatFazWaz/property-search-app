'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
    description: 'This modern apartment is located in the heart of Downtown. It features 2 spacious bedrooms, 1 bathroom, and an open concept living area with high-end finishes. Enjoy city living at its finest with restaurants, shops, and entertainment right at your doorstep.',
    features: [
      'Hardwood floors',
      'Stainless steel appliances',
      'In-unit laundry',
      'Central air conditioning',
      'Balcony with city views',
      'Secure building access'
    ],
    location: {
      lat: 40.7128,
      lng: -74.0060
    }
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
    description: 'Perfect for a growing family, this spacious home offers 4 bedrooms, 2.5 bathrooms, and ample living space. The open-concept main floor features a gourmet kitchen, formal dining room, and a cozy living room with a fireplace. The fenced backyard includes a deck and plenty of space for outdoor activities.',
    features: [
      'Gourmet kitchen',
      'Master suite with ensuite bathroom',
      'Finished basement',
      'Two-car garage',
      'Fenced backyard',
      'Quiet neighborhood'
    ],
    location: {
      lat: 42.3601,
      lng: -71.0589
    }
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
    description: 'Experience luxury living in this stunning penthouse apartment. With 3 bedrooms, 3 bathrooms, and breathtaking panoramic views, this property is truly one-of-a-kind. The gourmet kitchen, spa-like bathrooms, and expansive living areas make this the perfect home for those who appreciate the finer things in life.',
    features: [
      'Panoramic city views',
      'Private rooftop terrace',
      'Floor-to-ceiling windows',
      'Smart home technology',
      'Concierge service',
      'Private elevator access'
    ],
    location: {
      lat: 34.0522,
      lng: -118.2437
    }
  }
]

export default function PropertyDetail({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchProperty = () => {
      setLoading(true)
      setTimeout(() => {
        const foundProperty = mockProperties.find(p => p.id === params.id)
        setProperty(foundProperty || null)
        setLoading(false)
      }, 500) // Simulate network delay
    }
    
    fetchProperty()
  }, [params.id])
  
  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (!property) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-500 mb-8">The property you are looking for does not exist or has been removed.</p>
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }
  
  const { title, price, bedrooms, bathrooms, area, address, image, description, features } = property
  
  // Format price with commas
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center text-primary-600 mb-6">
          <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to listings
        </Link>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-72 sm:h-96 w-full">
            <Image
              src={image}
              alt={title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
          
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600 mb-4">{address}</p>
            
            <div className="flex flex-wrap items-center justify-between mb-6">
              <div className="text-3xl font-bold text-primary-600">{formattedPrice}</div>
              
              <div className="flex flex-wrap gap-4 sm:gap-8 text-gray-700 mt-3 sm:mt-0">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span><b>{bedrooms}</b> {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                  <span><b>{bathrooms}</b> {bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  </svg>
                  <span><b>{area}</b> sq ft</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700 mb-6">{description}</p>
              
              <h2 className="text-xl font-semibold mb-3">Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-2 text-primary-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn btn-primary">Schedule Viewing</button>
                <button className="btn btn-secondary">Contact Agent</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 