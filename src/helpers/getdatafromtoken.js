import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return decodedToken.userId
    } catch (error) {
        throw new Error(error)
    }
}