import { connectToDatabase } from "@/libs/connectToMongodb";
import { Video } from "@/models/video";
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const { id } = params;
    console.log('video id',id)
    try {
      await connectToDatabase();
      const video = await Video.findOne({ "_id": id }).populate('channelId');
      console.log(video)
      return new NextResponse(JSON.stringify(video));
    } catch (error) {
      console.error(error);
    }
  }
  
  
