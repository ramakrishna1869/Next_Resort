

"use client"

import React, { useState } from 'react'

const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice]= useState("");
    const [offer, setOffer] = useState("");
    const [amen, setAmen]= useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("")

    const recordHandler = async(e)=>{
        e.preventDefault()

        const recordDetails = {title, price, offer, amen, desc, image}
        console.log(recordDetails)

          const data = new FormData()
          data.append('title', title);
          data.append('price', price);
          data.append('offer', offer);
          data.append('desc', desc);
          data.append('amen', amen);
          data.append('image', image);
      
          try {
              const response = await fetch(`https://next-resort-project.vercel.app/api/admin/add-product`,{
                method:'POST',
                body:data
              })   
              const result = await response.json()
              if(result.success){
                alert("Record Added Successfully")
                setTitle("")
                setPrice("")
                setOffer("")
                setDesc("")
                setAmen("")
                setImage("")
              }
          } catch (error) {
              console.log(error)
          }


    }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Add New Property
          </h1>
          
          <form onSubmit={recordHandler} encType='multipart/form-data' className="space-y-6">
            {/* Title and Price Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Title
                </label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e)=>setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter property title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Night (₹)
                </label>
                <input 
                  type="number" 
                  value={price} 
                  onChange={(e)=>setPrice(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter price"
                  required
                />
              </div>
            </div>
            
            {/* Offer and Amenities Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Offer (%)
                </label>
                <input 
                  type="number" 
                  value={offer} 
                  onChange={(e)=>setOffer(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter discount percentage"
                  min="0"
                  max="100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amenities
                </label>
                <input 
                  type="text" 
                  value={amen} 
                  onChange={(e)=>setAmen(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="WiFi, Pool, Gym (comma separated)"
                />
              </div>
            </div>
            
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea 
                rows="5" 
                value={desc} 
                onChange={(e)=>setDesc(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Enter detailed description of the property"
              />
            </div>
            
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors duration-200">
                <input 
                  type="file" 
                  accept='image/*' 
                  onChange={(e)=>setImage(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Upload a high-quality image of the property
                </p>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type='submit'
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Add Property
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
