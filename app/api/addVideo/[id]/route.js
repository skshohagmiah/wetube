import { connectToDatabase } from "@/libs/connectToMongodb";
import { Video } from "@/models/video";
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const { id } = params;
    try {
      await connectToDatabase();
      const video = await Video.findOne({ '_id': id }).populate('channelId');
      console.log(video)
      return new NextResponse({video});
    } catch (error) {
      console.error(error);
    }
  }
  
  
