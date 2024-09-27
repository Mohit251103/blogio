import NextAuth, { CredentialsSignin, NextAuthResult } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"

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
        Credentials({
            credentials: {
                username: { label: "Username" },
                password: { label: "Password", type: "password" },
            },
            async authorize({ request }) {
                try {
                    const response = await fetch(request)
                    if (!response.ok) return null
                    return (await response.json()) ?? null
                } catch (error) {
                    throw new InvalidLoginError()
                }
            },
        }),
    ],
    callbacks: {
        authorized: async ({ auth }) => {
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth
        },
    },
})