'use client'

import Image from 'next/image'

type Property = {
  id: string
  title: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  address: string
  image: string
}

type PropertyCardProps = {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { title, price, bedrooms, bathrooms, area, address, image } = property
  
  // Format price with commas
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
  
  return (
    <div className="card group hover:shadow-lg transition-shadow duration-200">
      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md">
        {/* Add a placeholder fallback if image fails to load */}
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-200"
          priority={false}
        />
        <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 text-sm font-semibold rounded">
          {formattedPrice}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
        <p className="text-gray-500 text-sm mb-2">{address}</p>
        
        <div className="flex justify-between items-center mt-3 text-sm text-gray-700">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>{bedrooms} {bedrooms === 1 ? 'bed' : 'beds'}</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
            <span>{bathrooms} {bathrooms === 1 ? 'bath' : 'baths'}</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>
            <span>{area} sq ft</span>
          </div>
        </div>
      </div>
    </div>
  )
} 