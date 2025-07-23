"use client";

import React, { useEffect, useState } from 'react';
import UserNavigation from './UserNavigation';
import ProductCollection from './ProductCollection';

const ClientHomePage = ({ userName, initialBookingCount, userEmail }) => {
  const [bookingCount, setBookingCount] = useState(initialBookingCount);

  // Function to refresh booking count
  const refreshBookingCount = async () => {
    try {
      const response = await fetch(`/api/users?email=${userEmail}`);
      const data = await response.json();
      if (data.success && data.data) {
        setBookingCount(data.data.bookings?.length || 0);
      }
    } catch (error) {
      console.error('Error refreshing booking count:', error);
    }
  };

  // Listen for storage events to update booking count when returning from other pages
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'bookingCountUpdated') {
        refreshBookingCount();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check for updates when the page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshBookingCount();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [userEmail]);

  return (
    <>
      <UserNavigation userName={userName} bookingCount={bookingCount} />
      <img src='banner.jpg' alt='banner' className='bannerImage'/>
      <ProductCollection />
    </>
  );
};

export default ClientHomePage; 