import DBConnection from "@/app/utils/config/db";
import { UserModel, BookingModel } from "@/app/utils/models";
import { NextResponse } from "next/server";



export async function GET(request, {params}){
    await DBConnection()

    const {id} = params

    console.log("dynamic Id:", id)

    try {
            if(!id){
                return NextResponse.json({success:false, message: 'no user found'}, {status:404})
            }

            const user = await UserModel.findById(id).populate('bookings')

            return NextResponse.json({success:true, data:user})

    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false, message:'ID Is missing'})
    }

}

export async function DELETE(request, { params }) {
    await DBConnection();

    const { id } = params;  

    try {
        if (!id) {
            return NextResponse.json({ success: false, message: "ID is missing" });
        }

        // First, find the booking to get the user ID
        const booking = await BookingModel.findById(id);
        
        if (!booking) {
            return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
        }

        // Delete the booking
        await BookingModel.findByIdAndDelete(id);

        // Remove the booking reference from the user's bookings array
        await UserModel.findByIdAndUpdate(
            booking.user,
            { $pull: { bookings: id } },
            { new: true }
        );

        return NextResponse.json({ success: true, message: "Booking deleted successfully" });

    } catch (error) {
        console.error('Error deleting booking:', error);
        return NextResponse.json({ success: false, message: "Server error", error: error.message }, { status: 500 });
    }
}
