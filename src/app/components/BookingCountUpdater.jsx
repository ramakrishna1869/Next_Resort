"use client";

import React, { useEffect, useState } from 'react';
import UserNavigation from './UserNavigation';

const BookingCountUpdater = ({ userName, initialBookingCount, userEmail }) => {
  const [bookingCount, setBookingCount] = useState(initialBookingCount);

  // Function to refresh booking count
  const refreshBookingCount = async () => {
    try {
      const response = await fetch(`/api/users?email=${userEmail}`);
      const data = await response.json();
      if (data.success && data.data) {
        const newCount = data.data.bookings?.length || 0;
        setBookingCount(newCount);
        console.log('Client-side booking count updated:', newCount);
      }
    } catch (error) {
      console.error('Error refreshing booking count:', error);
    }
  };

  // Check for booking count updates when the page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshBookingCount();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Always refresh on mount to ensure we have the latest count
    refreshBookingCount();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [userEmail]);

  // Update count when initialBookingCount changes (e.g., after page reload)
  useEffect(() => {
    setBookingCount(initialBookingCount);
  }, [initialBookingCount]);

  return (
    <UserNavigation userName={userName} bookingCount={bookingCount} />
  );
};

export default BookingCountUpdater; 