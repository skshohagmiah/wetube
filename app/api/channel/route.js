import { connectToDatabase } from "@/libs/connectToMongodb";
import { Channel } from "@/models/channel";
import { User } from "@/models/user";
import { NextResponse } from 'next/server';

export async function GET(){

    try {
        await connectToDatabase()
        const channels = await Channel.find();
        console.log('api',channels)
        return new NextResponse({channels},{status:200});
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req){
    const {name,thumbnailUrl,email} = await req.json()
    try {
        await connectToDatabase()
        const user = await User.findOne({email:email})
        const userId = user?._id
        const img = thumbnailUrl;
        console.log(user,name,userId,img)
        const chan = await new Channel({name,img,userId});
        await chan.save();
        
        return new NextResponse({chan},{status:200});
    } catch (error) {
        console.log(error);
    }
}