import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({token, user, account}: {token: any, user: any, account: any}) { // user parameter should be there according to the documentation yet it's not used
      if(account) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session({session, token, user}: {session: any, token: any, user: any}) { //user parameter should be there according to the documentation yet it's not used  
      session.accessToken = token.accessToken;
      return session;
    }
  }
}
  export default NextAuth(authOptions);