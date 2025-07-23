"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";

const ProductCollection = () => {
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const collectionHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/add-product`)
      const newData = await response.json();

      console.log("productData:", newData);

      if (newData.data) {
        setCollections(newData.data);
      } else {
        setError("No data received");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    collectionHandler();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Select Your Perfect Stay
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center mb-8">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="flex flex-col justify-center items-center h-96">
            <Circles
              height="80"
              width="80"
              color="#14b8a6"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            <p className="text-gray-600 mt-4 text-lg">Loading available stays...</p>
          </div>
        ) : collections && collections.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-8">
            {collections.map((item) => {
              return (
                <div key={item._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div className="md:flex">
                    {/* Image Section */}
                    <div className="md:w-1/2">
                      <div className="h-64 md:h-full">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="md:w-1/2 p-6 flex flex-col justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                          {item.title}
                        </h2>
                        
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Amenities
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {item.amen && item.amen.map((serve, i) => {
                              return (
                                <div key={i} className="flex items-center text-gray-600">
                                  <span className="text-primary-500 mr-2">✓</span>
                                  <span className="text-sm">{serve}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      
                      {/* Price and Action Section */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Starting from</p>
                          <p className="text-3xl font-bold text-primary-600">
                            ₹{item.price.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">per night</p>
                        </div>
                        
                        <Link href={`/detail/${item._id}`}>
                          <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🏨</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No stays available
            </h3>
            <p className="text-gray-500">
              Please check back later for available accommodations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCollection;
