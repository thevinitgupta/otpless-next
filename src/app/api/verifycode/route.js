import { cookies } from "next/headers";
import { verifycode } from "../../../../utils/otpless";
import { NextResponse } from "next/server";

export async function POST(req,res) {
    try {
        const client_id = process.env.OTPLESS_CLIENT_ID;  
        const client_secret = process.env.OTPLESS_CLIENT_SECRET;
        const {code} = await req.json();
        console.log(code)
        if(!code) return NextResponse.json({error : "Code Not Found"}, {
            status : 400
        });

        const tokenVerified = await verifycode(client_id, client_secret, code);
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