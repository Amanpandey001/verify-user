import { dbConfig } from "@/dbConfig/dbConfig";
import Input from "@/models/inputModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
dbConfig();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const {email,password } = reqBody;
        console.log(reqBody);
        const checkUser = await Input.findOne({email});
        if(!checkUser){
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }
        console.log(checkUser);
        const validatePassword = await bcryptjs.compare(password, checkUser.password);
        if(!validatePassword){
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }
        const tokenData = {
            userId: checkUser._id,
            email: checkUser.email,
            username: checkUser.username
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        const response= NextResponse.json({ message: "User logged in successfully", success: true }, { status: 200 });
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}