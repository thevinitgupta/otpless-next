import { NextResponse } from "next/server";
import { signin } from "../../../../utils/otpless";
import { cookies } from "next/headers";

export async function POST(req, res) {
    
    const type = req.method;

    const {email, phone} = await req.json();
    if(!email && !phone) return NextResponse.json({error : "Atleast 1 field required"}, {status : 400});
    // console.log(req)
    const client_id = process.env.OTPLESS_CLIENT_ID;  
    const client_secret = process.env.OTPLESS_CLIENT_SECRET;
    const singinResp = await signin(client_id,client_secret, phone, email);
    // console.log("Sign In Resp",singinResp);
    cookies().set("otp-type", singinResp.requestIds[0].type);
    cookies().set("otp-token", singinResp.requestIds[0].value, {
        httpOnly : true
    });
    console.log(cookies().getAll())
    const response = {
        success : singinResp.success,
        errorMessage : singinResp.errorMessage || null,
    }
    console.log(singinResp,response);
    return NextResponse.json(response, {
        status : singinResp.success ? 200 : 500
    });
}