import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import {db} from "@/db";
import Github from "next-auth/providers/github";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if(!GITHUB_CLIENT_SECRET || !GITHUB_CLIENT_ID) {
  throw new Error('missing oauth credentials');
}

export const { handlers: {GET, POST}, auth, signOut, signIn} =  NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session ({session, user}: any) {
      if(session && session.user &&user) {
        session.user.id = user.id;
      }
      return session
    }
  }
})
