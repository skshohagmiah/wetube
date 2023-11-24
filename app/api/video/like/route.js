import { connectToDatabase } from '@/libs/connectToMongodb';
import { Video } from '@/models/video';
import { NextResponse } from 'next/server';


export async function PUT(req){
    const data = await req.json();
    try {
        connectToDatabase()
        const video = await Video.findByIdAndUpdate(data._id, data)
        console.log(video)
        return new NextResponse(JSON.stringify(video),{message:'succes'})
    } catch (error) {
        console.log(error)
    }
}