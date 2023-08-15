import { connectMongodb } from "@/lib/mongodb";
import UserModel from "@/models/User";
import NextAuth from "next-auth/next";
import bcrypt from 'bcryptjs'

import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},

            async authorize(credentials){
                const {username, password} = credentials
                try {
                    await connectMongodb()
                    const user = await UserModel.findOne({username})
                    if(!user){
                        return null
                    }
                    const passwordMatch = await bcrypt.compare(password, user.password)
                    if(!passwordMatch){
                        return null
                    }
                    return user
                } catch (error) {
                    console.log(error)
                    return null
                }
            }
        })
    ],
    session: {
        strategy:"jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    }
}


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST}