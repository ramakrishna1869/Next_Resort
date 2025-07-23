import DBConnection from "@/app/utils/config/db";
import { UserModel } from "@/app/utils/models";
import { NextResponse } from "next/server";

export async function GET(request) {
    await DBConnection();
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    try {
        // If email is provided, fetch specific user
        if (email) {
            const user = await UserModel.findOne({ email }).populate('bookings');
            
            if (!user) {
                return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
            }
            
            return NextResponse.json({ success: true, data: user });
        }
        
        // If no email, fetch all non-admin users
        const users = await UserModel.find({role:{$ne:'admin'}}, {password:0});
        
        if (!users || users.length === 0) {
            return NextResponse.json({success: false, message: 'No users found'}, {status: 404});
        }

        return NextResponse.json({success: true, users}, {status: 200});

    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}