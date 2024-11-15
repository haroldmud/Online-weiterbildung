//[...nextAuth].ts
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";

export const authOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.JWT_SECRET,
}
  export default NextAuth(authOptions);