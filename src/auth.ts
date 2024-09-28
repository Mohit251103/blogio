import NextAuth, { CredentialsSignin, NextAuthResult } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import ForwardEmail from "next-auth/providers/forwardemail"

class InvalidLoginError extends CredentialsSignin {
    code = "Invalid identifier or password"
}

export const { handlers, signIn, signOut, auth }: NextAuthResult = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        GithubProvider,
        ForwardEmail({
            apiKey: process.env.AUTH_FORWARDEMAIL_KEY,
            from: "mnegi1433@gmail.com"
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // console.log("user: ",user)
            // console.log("account:", account)
            // console.log("profile:", profile);
            const { email } = user;
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: email as string
                }
            })

            const existingAccount = await prisma.account.findUnique({
                where: {
                    provider_providerAccountId: { provider: account?.provider as string, providerAccountId: account?.providerAccountId as string } 
                }
            })

            if (existingUser && !existingAccount) {
                await prisma.account.create({
                    data: {
                        userId: existingUser?.id,
                        provider: account?.provider as string,
                        providerAccountId: account?.providerAccountId as string,
                        type: account?.type as string,
                        access_token: account?.access_token as string,
                        refresh_token: account?.refreshToken as string,
                    }
                })

            }
            if (account?.provider === "github") {
                await prisma.user.update({
                    where: {
                        email: email as string
                    },
                    data: {
                        image: profile?.avatar_url as string
                    }
                })
            }
            else {
                await prisma.user.update({
                    where: {
                        email: email as string
                    },
                    data: {
                        image: profile?.picture as string
                    }
                })
            }
            return true;
        },
        session({ session, user }) {
            // console.log("session : ",session)
            // console.log("user : ",user)
            return session
        }
    },
    pages: {
        signIn:"/sign-in"
    },
    secret:process.env.AUTH_SECRET
})