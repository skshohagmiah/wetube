import GoogleProvider from "next-auth/providers/google"

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
      async signin( user ) {
        console.log(user)
        // Persist the OAuth access_token to the token right after signin
        return user
      },
  }
}