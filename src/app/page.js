import React from 'react'
import DBConnection from './utils/config/db'
import { auth } from './auth'
import { redirect } from 'next/navigation'
import BookingCountUpdater from './components/BookingCountUpdater'
import AdminPage from './admin/page'
import ProductCollection from './components/ProductCollection'
import { UserModel } from './utils/models'

const HomePage = async() => {

  const session = await auth()

  await DBConnection()
 
  if(!session){
    redirect("/login")
  }

  console.log("role check;:", session.role)
  console.log("username chekc:", session.username)

  const userName = session.username

  // Fetch user data to get booking count
  let bookingCount = 0;
  if (session.role === 'user') {
    try {
      const user = await UserModel.findOne({ email: session.email }).populate('bookings');
      bookingCount = user?.bookings?.length || 0;
      console.log('Server-side booking count:', bookingCount);
    } catch (error) {
      console.error('Error fetching user data:', error);
      bookingCount = 0;
    }
  }

  return (
    <div>
      {session.role === 'user' &&  (
        <>
        <BookingCountUpdater 
          userName={userName} 
          initialBookingCount={bookingCount}
          userEmail={session.email}
        />
        <img src='banner.jpg' alt='banner' className='banner-image'/>
        <ProductCollection />
        </>
      ) }
      {session.role === 'admin' &&
        <AdminPage /> 
    }
    </div>
  )
}

export default HomePage
