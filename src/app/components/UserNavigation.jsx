import Link from 'next/link'
import React from 'react'

const UserNavigation = ({userName, bookingCount = 0}) => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-white hover:text-gray-300 transition-colors duration-200">
              <h2 className="text-xl font-bold">Holiday Resort</h2>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-sm text-gray-300">
              📞 Call now: 123 456 789
            </div>
            
            <Link href="/invoice" className="text-white hover:text-gray-300 transition-colors duration-200">
              <div className="flex items-center space-x-1 bg-primary-600 hover:bg-primary-700 px-3 py-2 rounded-lg">
                <span>📋</span>
                <span>Bookings: {bookingCount}</span>
              </div>
            </Link>
            
            <div className="text-sm">
              Welcome,{' '}
              <span className="text-yellow-400 font-semibold ml-1">
                {userName}
              </span>
            </div>
            
            <Link href="/api/auth/signout" className="text-white hover:text-gray-300 transition-colors duration-200">
              <div className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium">
                Logout
              </div>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white focus:outline-none focus:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="text-sm text-gray-300 py-2">
              📞 Call now: 123 456 789
            </div>
            
            <Link href="/invoice" className="block text-white hover:text-gray-300 transition-colors duration-200">
              <div className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 px-3 py-2 rounded-lg">
                <span>📋</span>
                <span>Bookings: {bookingCount}</span>
              </div>
            </Link>
            
            <div className="text-sm py-2">
              Welcome,{' '}
              <span className="text-yellow-400 font-semibold">
                {userName}
              </span>
            </div>
            
            <Link href="/api/auth/signout" className="block text-white hover:text-gray-300 transition-colors duration-200">
              <div className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium text-center">
                Logout
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default UserNavigation
