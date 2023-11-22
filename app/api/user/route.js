import { connectToDatabase } from "@/libs/connectToMongodb"
import { getUser } from "@/libs/getUser"
import { User } from "@/models/user"
import { NextResponse } from 'next/server'

export async function GET(){
    try {
        const user = await getUser()
        connectToDatabase()
        console.log(user)
        const newUser = await User.find({email:user?.email});
        console.log("user is", newUser)
       return new NextResponse({user});
    } catch (error) {
        console.log(error)
    }
}