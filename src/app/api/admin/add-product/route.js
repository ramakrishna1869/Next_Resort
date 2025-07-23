import DBConnection from "@/app/utils/config/db";
import { NextResponse } from "next/server";
import {writeFile} from 'fs/promises'
import path from 'path'
import ProductModel from "@/app/utils/models/Product";


export async function GET(){
    await DBConnection()

    const records = await ProductModel.find({})

    return NextResponse.json({data:records})
}

export async function POST(request){
    await DBConnection();

    const data = await request.formData();
    const title = data.get('title');
    const price = data.get('price');
    const offer = data.get('offer');
    const amen = data.get('amen');
    const desc = data.get('desc');
    const image = data.get('image')

    const bufferData = await image.arrayBuffer();
    const buffer = Buffer.from(bufferData);
    const imagePath = path.join(process.cwd(), 'public', 'uploads', image.name)

    try {
            await writeFile(imagePath, buffer);
            const newProduct = new ProductModel({
                    title: title,
                    price: price,
                    offer: offer,
                    amen: amen,
                    desc: desc,
                    image: `/uploads/${image.name}`
            })
            await newProduct.save()
            return NextResponse.json({response: 'Successfully Uploaded', success:true},
                {status: 201}
            )

    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false}, {status:500})
    }

}

export async function PUT(request) {
    await DBConnection();
    // Example seed data
    const products = [
        {
            title: "Deluxe Room",
            price: 150,
            offer: "10",
            amen: "Ac, Wi-Fi, TV, Elevator, Breakfast",
            desc: "A deluxe room with all modern amenities.",
            image: "/uploads/1.jpeg"
        },
        {
            title: "Suite Room",
            price: 250,
            offer: "15",
            amen: "Ac, Wi-Fi, TV, Elevator, Breakfast, Pool",
            desc: "A luxury suite with pool access.",
            image: "/uploads/14.jpeg"
        },
        {
            title: "Family Room",
            price: 200,
            offer: "12",
            amen: "Ac, Wi-Fi, TV, Elevator, Breakfast, Extra Bed",
            desc: "Spacious room for families.",
            image: "/uploads/3-bed.jpeg"
        },
        {
            title: "Budget Room",
            price: 80,
            offer: "5",
            amen: "Wi-Fi, TV, Breakfast",
            desc: "Affordable room for short stays.",
            image: "/uploads/5.jpeg"
        },
        {
            title: "Premium Room",
            price: 300,
            offer: "20",
            amen: "Ac, Wi-Fi, TV, Elevator, Breakfast, Jacuzzi",
            desc: "Premium experience with jacuzzi.",
            image: "/uploads/6.jpeg"
        }
    ];
    try {
        for (const prod of products) {
            await ProductModel.create(prod);
        }
        return NextResponse.json({success:true, message: 'Seeded products'});
    } catch (error) {
        return NextResponse.json({success:false, error: error.message}, {status:500});
    }
} 
