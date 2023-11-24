import { connectToDatabase } from '@/libs/connectToMongodb';
import { Comment } from '@/models/comment';
import { NextResponse } from 'next/server';

export async function GET(req,{params}){
    const {id} = params
    console.log(id)
    try {
        connectToDatabase()
        const res = await Comment.find({videoId:id}).populate('userId')
        console.log(res)
        return new NextResponse(JSON.stringify(res),{status:200})
    } catch (error) {
        console.log(error)
    }
}