import { connectToDatabase } from "@/libs/connectToMongodb";
import { Video } from "@/models/video";
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const { id } = params;
    console.log('video id',id)
    try {
      await connectToDatabase();
      const video = await Video.findOne({ _id: id.toString() }).populate('channelId');
      console.log(video)
      return new NextResponse({video},{message:"succesfull"});
    } catch (error) {
      console.error(error);
    }
  }
  
  
