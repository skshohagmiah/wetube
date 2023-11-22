import { connectToDatabase } from "@/libs/connectToMongodb";
import { Channel } from "@/models/channel";
import { User } from "@/models/user";
import { Video } from "@/models/video";
import { NextResponse } from 'next/server';


export async function POST(req) {
    
    const { title, description, thumbnail, videoUrl, email, channelId : chan } = await req.json();
    try {
        await connectToDatabase();

        const channel = await Channel.findOne({ _id: chan });
        const channelId = channel?._id;

        const newUser = await User.findOne({ email: email });
        const userId = newUser?._id;

        await Video.create({ title, description, thumbnail, videoUrl, userId, channelId});

        return new NextResponse({ message: "Video upload successful" }, { status: 201 });
    } catch (error) {
        console.error(error);
    }
}
