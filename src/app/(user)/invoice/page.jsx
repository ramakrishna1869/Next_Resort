import { auth } from '@/app/auth'
import UserInvoice from '@/app/components/UserInvoice'
import BookingCountUpdater from '@/app/components/BookingCountUpdater'
import { UserModel } from '@/app/utils/models'
import DBConnection from '@/app/utils/config/db'
import React from 'react'

const InvoicePage = async() => {

  const session = await auth()

  if (!session) {
    return <div>Please log in to view your bookings.</div>;
  }

  await DBConnection();

  const email = session.email

  // Fetch user with populated bookings to get accurate count
  const user = await UserModel.findOne({email:email}).populate('bookings');

  const userId = user?._id.toString();
  const bookingCount = user?.bookings?.length || 0;

  console.log("userId:", userId)
  console.log("Invoice page booking count:", bookingCount)

  return (
    <div>
      <BookingCountUpdater 
        userName={session.username} 
        initialBookingCount={bookingCount}
        userEmail={session.email}
      />
      <UserInvoice userId={userId} />
    </div>
  )
}

export default InvoicePage
