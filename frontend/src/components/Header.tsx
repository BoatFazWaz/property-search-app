'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                PropertyFinder
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                isActive('/') === 'text-primary-600' ? 'border-primary-600' : 'border-transparent'
              } ${isActive('/')}`}>
                Home
              </Link>
              <Link href="/properties" className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                isActive('/properties') === 'text-primary-600' ? 'border-primary-600' : 'border-transparent'
              } ${isActive('/properties')}`}>
                Properties
              </Link>
              <Link href="/map" className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                isActive('/map') === 'text-primary-600' ? 'border-primary-600' : 'border-transparent'
              } ${isActive('/map')}`}>
                Map View
              </Link>
              <Link href="/about" className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                isActive('/about') === 'text-primary-600' ? 'border-primary-600' : 'border-transparent'
              } ${isActive('/about')}`}>
                About
              </Link>
            </nav>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link href="/login" className="btn btn-secondary mr-2">
              Login
            </Link>
            <Link href="/signup" className="btn btn-primary">
              Sign Up
            </Link>
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              href="/" 
              className={`block pl-3 pr-4 py-2 border-l-4 ${
                isActive('/') === 'text-primary-600' 
                  ? 'bg-primary-50 border-primary-600' 
                  : 'border-transparent hover:bg-gray-50 hover:border-gray-300'
              } ${isActive('/')}`}
            >
              Home
            </Link>
            <Link 
              href="/properties" 
              className={`block pl-3 pr-4 py-2 border-l-4 ${
                isActive('/properties') === 'text-primary-600' 
                  ? 'bg-primary-50 border-primary-600' 
                  : 'border-transparent hover:bg-gray-50 hover:border-gray-300'
              } ${isActive('/properties')}`}
            >
              Properties
            </Link>
            <Link 
              href="/map" 
              className={`block pl-3 pr-4 py-2 border-l-4 ${
                isActive('/map') === 'text-primary-600' 
                  ? 'bg-primary-50 border-primary-600' 
                  : 'border-transparent hover:bg-gray-50 hover:border-gray-300'
              } ${isActive('/map')}`}
            >
              Map View
            </Link>
            <Link 
              href="/about" 
              className={`block pl-3 pr-4 py-2 border-l-4 ${
                isActive('/about') === 'text-primary-600' 
                  ? 'bg-primary-50 border-primary-600' 
                  : 'border-transparent hover:bg-gray-50 hover:border-gray-300'
              } ${isActive('/about')}`}
            >
              About
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <Link href="/login" className="btn btn-secondary mr-2 w-full text-center">
                Login
              </Link>
              <Link href="/signup" className="btn btn-primary w-full text-center">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}