import { connectMongodb } from "@/lib/mongodb"
import { NextResponse } from "next/server"
import UserModel from "@/models/User";
import bcrypt from 'bcryptjs'

export async function POST(req){
    try {
        const {name, email, username, password}= await req.json()
        const hashedPassword = await bcrypt.hash(password, 10)
        await connectMongodb();
        await UserModel.create({name, email, password: hashedPassword, username})
        return NextResponse.json({message: 'user registered'}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: 'error in creating new user'},{status: 500})
    }
}