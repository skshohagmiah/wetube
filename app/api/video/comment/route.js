import { connectToDatabase } from '@/libs/connectToMongodb';
import { Comment } from '@/models/comment';
import { NextResponse } from 'next/server';


export async function POST(req){
    const {content,userId,videoId} = await req.json();
    console.log(content, userId)
    try {
        connectToDatabase()
        const res = await Comment.create({content,userId,videoId})
        console.log(res)
        return new NextResponse(JSON.stringify(res),{message:'succes'})
    } catch (error) {
        console.log(error)
    }
}

