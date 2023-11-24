import { connectToDatabase } from "@/libs/connectToMongodb";
import { Channel } from "@/models/channel";
import { Video } from "@/models/video";
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const { id } = params;
    console.log('video id',id)
    try {
      await connectToDatabase();
      // referencing channel model otherwise get error
      Channel 
      const video = await Video.findOne({ _id: id.toString() }).populate('channelId');
      console.log(video)
      return new NextResponse({video},{message:"succesfull"});
    } catch (error) {
      console.error(error);
    }
  }
  
  
