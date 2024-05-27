import { cookies, headers } from "next/headers";
import { verifycode } from "../../../../utils/otpless";
import { NextResponse } from "next/server";

export async function POST(req,res) {
    try {
        const client_id = process.env.OTPLESS_CLIENT_ID;  
        const client_secret = process.env.OTPLESS_CLIENT_SECRET;
        const {code} = await req.json();
        console.log(code)
        if(!code) return NextResponse.json({verified : false, error : "Code Not Found"}, {
            status : 400
        });

        const tokenVerified = await verifycode(client_id, client_secret, code);
        console.log("Verify Code",tokenVerified);          
        const accessToken = tokenVerified["access_token"];
        cookies().delete("otp-token")
        cookies().set("otp-token", accessToken, {
            httpOnly: true,
            secure : true
        })
        // console.log(tokenVerified,response);
        return NextResponse.json({
            verified : true,
            error : null
        }, {
            status : 200 
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({verified : false, error : error.message || "Internal Server Error"}, {
            status : 500
        });
    }

}