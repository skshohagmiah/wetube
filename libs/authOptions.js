import { User } from "@/models/user";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "./connectToMongodb";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        
      }),
      // ...add more providers here
    ],
    callbacks: {
      async signIn({user}) {
        connectToDatabase()
        const userExist = await User.find({email:user.email})
        if(!userExist){
          await User.create({name:user.name,email:user.email,img:user.image})
        }
        return true;
      },
    },
}