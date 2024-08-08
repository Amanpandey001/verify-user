import { dbConfig } from "@/dbConfig/dbConfig";
import Input from "@/models/inputModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from "@/helpers/mailhelper";
import { getDataFromToken } from "@/helpers/getdatafromtoken";

dbConfig(); 

export async function POST(request) {
    try {
        const userId = await getDataFromToken(request);
        const user = await Input.findOne({ _id: userId }).select("-password");
        //check if there is no user
        return NextResponse.json({ message: "User fetched successfully", success: true, data: user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}