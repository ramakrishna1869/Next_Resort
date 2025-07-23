"use client"

import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import CalenderComponent from '@/app/components/CalenderComponent'
import { bookingAction } from '../serverActions/bookingAction'
import { Circles } from 'react-loader-spinner'
import Image from 'next/image'



const DynamicProduct = () => {
    const [record, setRecord] = useState("")

    const [selecetedDates, setSelectedDates] = useState(null)

    const params = useParams();

    const {id} = params

    console.log("dynamic ClientId:", id)

    const dynamicProductHandler = useCallback(async()=>{
        // Use correct API endpoint for local and production
        const apiUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost'
          ? `/api/admin/product/${id}`
          : `https://next-resort-project.vercel.app/api/admin/product/${id}`;
        const response = await fetch(apiUrl)
        const newData = await response.json()

        console.log("dynaic data:", newData)
        setRecord(newData.data)

    }, [id])

    useEffect(()=>{
        dynamicProductHandler()
    }, [dynamicProductHandler])

    const bookingHandler = async()=>{
        if(!selecetedDates){
          alert("Please select booking dates")
          return
        }

          const bookingDetails = {record, selecetedDates}
      try {
        const response = await bookingAction(bookingDetails)
        if(response.success){
          alert("Booking Successfull")
        }
      } catch (error) {
        
      }

    }

    const handleDateSelect = (dates)=>{
        setSelectedDates(dates)
        console.log("dates coming from calenderComp:", dates)
    }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors duration-200">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Properties
          </Link>
        </div>
      </div>

      {record ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Property Header */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="lg:flex">
              {/* Image Section */}
              <div className="lg:w-3/5">
                <div className="relative h-96 lg:h-full">
                  <Image 
                    src={record.image} 
                    alt={record.title} 
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Discount Badge */}
                  {record.offer > 0 && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {record.offer}% OFF
                    </div>
                  )}
                </div>
              </div>
              
              {/* Content Section */}
              <div className="lg:w-2/5 p-8">
                <div className="h-full flex flex-col">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                      {record.title}
                    </h1>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-primary-600">
                          ₹{record.price.toLocaleString()}
                        </span>
                        <span className="text-gray-500 ml-2">per night</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Description
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {record.desc}
                      </p>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Amenities
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {record.amen && record.amen.map((item, i) => (
                          <div key={i} className="flex items-center text-gray-600">
                            <span className="text-primary-500 mr-2">✓</span>
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <button 
                      onClick={bookingHandler}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 text-lg"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Calendar Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Select Your Dates
            </h2>
            <div className="flex justify-center">
              <CalenderComponent onDatesSelect={handleDateSelect}/>
            </div>
            {selecetedDates && (
              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <p className="text-center text-primary-800 font-medium">
                  Selected dates: {selecetedDates.startDate} to {selecetedDates.endDate}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
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
          <p className="text-gray-600 mt-4 text-lg">Loading property details...</p>
        </div>
      )}
    </div>
  )
  
  
}

export default DynamicProduct

