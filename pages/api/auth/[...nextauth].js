import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.NEXT_FACEBOOK_ID,
      clientSecret: process.env.NEXT_FACEBOOK_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
});
