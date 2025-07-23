"use client";

import React, { useEffect, useState } from 'react';

const UserInvoice = ({ userId }) => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("extractId:", userId);

  const invoiceHandler = async () => {
    if (!userId) {
      setError("User ID is missing");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`);
      const newData = await response.json();
      console.log("newData:", newData);

      if (response.ok && newData.success) {
        setInvoice(newData.data);
      } else {
        throw new Error(newData.message || 'Failed to fetch invoice data');
      }
    } catch (error) {
      setError(error.message);
      console.log("Error fetching invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    invoiceHandler();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-lg text-gray-600">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          Loading your bookings...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center m-5">
        <div className="font-semibold">Error</div>
        <div>{error}</div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="text-center p-5 text-gray-600">
        No user data available
      </div>
    );
  }

  if (!invoice.bookings || invoice.bookings.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-6xl mb-4">📋</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No bookings yet
        </h3>
        <p className="text-gray-500">
          You haven&apos;t made any reservations. Start exploring our amazing stays!
        </p>
      </div>
    );
  }

  const calculateDays = (startDate, endDate) => {
    // Convert DD/MM/YYYY format to MM/DD/YYYY for proper Date parsing
    const convertDateFormat = (dateStr) => {
      const [day, month, year] = dateStr.split('/');
      return `${month}/${day}/${year}`;
    };

    const start = new Date(convertDateFormat(startDate));
    const end = new Date(convertDateFormat(endDate));
    const difference = Math.abs(end - start);
    return Math.ceil(difference / (1000 * 60 * 60 * 24)); 
  };

  const deleteBooking = async (bookingId) => {
    const isConfirmed = window.confirm("Are you sure to delete this booking?");
    if (!isConfirmed) {
      return; 
    }
  
    try {
      const response = await fetch(`/api/users/${bookingId}`, {
        method: 'DELETE',
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log("Booking deleted:", result);
        // Add a small delay to ensure the deletion is processed
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        throw new Error(result.message || 'Failed to delete booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking');
    }
  };
  

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {invoice.username}!
          </h1>
          <p className="text-gray-600">Here are your booking details</p>
        </div>
    
        {invoice.bookings.length > 0 ? (
          <div className="space-y-6">
            {invoice.bookings.map((item) => {
              console.log("Booking item:", item);
              console.log("Start date:", item.startDate, "End date:", item.endDate);
              console.log("Price:", item.price, "Type:", typeof item.price);
              
              const days = calculateDays(item.startDate, item.endDate);
              const pricePerDay = parseFloat(item.price) || 0;
              const totalAmount = days * pricePerDay;
              
              console.log("Calculated days:", days, "Price per day:", pricePerDay, "Total:", totalAmount);
        
              return (
                <div key={item._id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {item.productName}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="space-y-2">
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium mr-2">📅 Check-in:</span>
                              <span>{item.startDate}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium mr-2">📅 Check-out:</span>
                              <span>{item.endDate}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium mr-2">🏷️ Discount:</span>
                              <span className="text-green-600 font-semibold">{item.offer}%</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium mr-2">🌙 Duration:</span>
                              <span>{days} {days === 1 ? 'night' : 'nights'}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium mr-2">💰 Per night:</span>
                              <span>₹{pricePerDay.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium mr-2 text-gray-600">💳 Total:</span>
                              <span className="text-2xl font-bold text-primary-600">
                                ₹{totalAmount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-center">
                        <button 
                          onClick={() => deleteBooking(item._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          🗑️ Cancel Booking
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No bookings available
            </h3>
            <p className="text-gray-500">
              You haven&apos;t made any reservations yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInvoice;
