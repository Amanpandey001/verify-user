import { dbConfig } from "@/dbConfig/dbConfig";
import Input from "@/models/inputModel";
import { NextRequest, NextResponse } from 'next/server';


dbConfig();
export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token);

        const checkUser = await Input.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
        if(!checkUser){
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }else{
            console.log(checkUser);
            checkUser.isVerified = true;
            checkUser.verifyToken = undefined;
            checkUser.verifyTokenExpiry = undefined;
            await checkUser.save();
            return NextResponse.json({ message: "User verified successfully" },{success:true} ,{ status: 200 });
        }
            
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
