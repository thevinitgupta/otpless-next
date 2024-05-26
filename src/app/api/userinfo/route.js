import { cookies } from "next/headers";
import { verify } from "../../../../utils/otpless";
import { NextResponse } from "next/server";

export async function GET(req,res) {
    try {
        const client_id = process.env.OTPLESS_CLIENT_ID;  
        const client_secret = process.env.OTPLESS_CLIENT_SECRET;
        
        const token = cookies().get("otp-token");
        console.log(token)
        if(!token.value) return NextResponse.json({error : "Token Not Found"}, {
            status : 400
        });

        const tokenVerified = await verify(client_id, client_secret, token.value);
        console.log(tokenVerified);
        const response = {
            success : tokenVerified.success,
            errorMessage : tokenVerified.errorMessage || null,
        }
        console.log(tokenVerified,response);
        return NextResponse.json(response, {
            status : tokenVerified.success ? 200 : 500
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({error : error.message || "Internal Server Error"}, {
            status : 500
        });
    }

}