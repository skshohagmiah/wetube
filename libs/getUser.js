import { getServerSession } from "next-auth/next"
import { authOptions } from "./authOptions"

export async function getUser(){
    const session = await getServerSession(authOptions)
    return session?.user

}