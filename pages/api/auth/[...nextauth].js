import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.NEXT_FACEBOOK_ID,
      clientSecret: process.env.NEXT_FACEBOOK_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
});
