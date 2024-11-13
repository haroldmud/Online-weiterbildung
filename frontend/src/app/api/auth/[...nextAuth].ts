import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  // pages: {
  //   signIn: "/auth/login",
  // },
  // callbacks: {
  //   async signIn(user, account, profile) {
  //     return true;
  //   },
  //   async redirect(url, baseUrl) {
  //     return url.startsWith(baseUrl) ? url : baseUrl;
  //   },
  //   async session(session, user) {
  //     return session;
  //   },
  //   async jwt(token, user, account, profile, isNewUser) {
  //     return token;
  //   },
  }

  export default NextAuth(authOptions);