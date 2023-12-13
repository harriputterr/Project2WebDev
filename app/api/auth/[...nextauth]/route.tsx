import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const authOptions: any = {
    session: {
        strategy: "jwt",
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials: any) {
                console.log(credentials);
                if (!credentials.email || !credentials.password){
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                });

                console.log(user);
                if (!user){
                    return null;
                }

                const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

                if (!passwordsMatch){
                    return null;
                }

                return user;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user}: any) {
            return { ...token, ...user };
          },
          async session({ session, token, user}: any) {
            session.user.isAdmin = token.isAdmin;
            session.user.id = token.id;
            return session;
          }
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}