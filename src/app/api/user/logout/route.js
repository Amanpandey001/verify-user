import { dbConfig } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from 'next/server';

dbConfig();

export async function GET(request) {
    try {
        const response = NextResponse.json({ message: "User logged out successfully", success: true }, { status: 200 });
        // response.cookies.delete("token");
        response.cookies.set("token", "", {
            httpOnly: true,
            expiresIn: new Date(0)
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
