"use client"

import React, { useState } from 'react'
import { loginAction } from '../serverActions/loginAction';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import bgImage from '../../../public/background.jpg'
import Image from 'next/image';
import { Circles } from 'react-loader-spinner'


const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const loginHandler = async(e)=>{
        e.preventDefault()
        setLoading(true)
        const loginDetails = {email, password}
        console.log(loginDetails)

        try {
          const response = await loginAction(loginDetails)
          if(response.success){
                router.push("/")
          }else{
            setError(response.message || "login failed, Invalid Credentials");
          }
        } catch (error) {
            setError("Invalid Credentials")
        }finally{
          setLoading(false)
        }
    }


  return (
    <div className="relative min-h-screen">
      <Image
        src="/background.jpg"
        alt="Background"
        fill
        style={{ objectFit: "cover" }}
        quality={75} 
        priority 
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen p-5">
        {
          loading ? (
            <div className="flex flex-col items-center">
              <Circles
                height="80"
                width="80"
                color="white"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
              <p className="text-white mt-4 text-lg">Logging in...</p>
            </div>
          ) : (
            <form onSubmit={loginHandler} className="w-full max-w-md bg-primary-700 border-2 border-gray-300 rounded-xl shadow-2xl p-8 text-white">
              <h1 className="text-3xl font-bold text-center mb-6 border-b border-white pb-3">Login</h1>
              {error && (
                <div className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    name='email' 
                    onChange={(e)=>setEmail(e.target.value)}
                    className="w-full h-12 px-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input 
                    type="password" 
                    name='password' 
                    onChange={(e)=>setPassword(e.target.value)}
                    className="w-full h-12 px-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <button 
                  type='submit'
                  className="w-full py-3 px-6 bg-secondary-600 hover:bg-secondary-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 focus:ring-offset-primary-700 mt-6"
                >
                  Login
                </button>
                <Link href="/register" className="block text-center text-yellow-300 hover:text-yellow-200 transition-colors duration-200 mt-4 underline">
                  Don&apos;t have an account? Register here
                </Link>
              </div>
            </form>
          )
        }
      </div>
    </div>
  )
}

export default UserLogin
