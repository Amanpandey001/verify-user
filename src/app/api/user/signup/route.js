import { dbConfig } from "@/dbConfig/dbConfig";
import Input from "@/models/inputModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from "@/helpers/mailhelper";

dbConfig();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const {username , email, password} = reqBody;
    //validation
    console.log(reqBody);

    const checkUser = await Input.findOne({ email });
    if(checkUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }
    else{
        try {
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt); 
            const newUser = new Input({
                username,
                email,
                password: hashedPassword,
            });
            const savedUser=await newUser.save();
            console.log(savedUser);
            //send verification mail
            const mailRes=await sendEmail({email:email,emailType:"verification",userId:savedUser._id});
            // console.log(mailRes);
            
            return NextResponse.json({ message: "User created successfully" , success: true, savedUser, status: 201 });
        } catch (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
