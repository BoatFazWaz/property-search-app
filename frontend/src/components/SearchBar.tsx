'use client'

import { useState } from 'react'

type SearchBarProps = {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full bg-white border border-gray-300 rounded-md py-3 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Search for location, neighborhood, or property type"
          />
        </div>
        
        <button
          type="submit"
          className="flex-none bg-primary-600 px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Search
        </button>
      </form>
      
      <div className="mt-3 flex flex-wrap gap-2">
        <button 
          onClick={() => onSearch('apartment')}
          className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full"
        >
          Apartments
        </button>
        <button 
          onClick={() => onSearch('house')}
          className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full"
        >
          Houses
        </button>
        <button 
          onClick={() => onSearch('condo')}
          className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full"
        >
          Condos
        </button>
        <button 
          onClick={() => onSearch('downtown')}
          className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full"
        >
          Downtown
        </button>
        <button 
          onClick={() => onSearch('modern')}
          className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full"
        >
          Modern
        </button>
      </div>
    </div>
  )
} 