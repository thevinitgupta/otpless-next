import { NextResponse } from "next/server";
import { sendOtp } from "../../../../utils/otpless";
import { cookies } from "next/headers";

export async function POST(req, res) {
    
    const type = req.method;

    const {email, phone} = await req.json();
    if(!email && !phone) return NextResponse.json({error : "Atleast 1 field required"}, {status : 400});
    // console.log(req)
    const client_id = process.env.OTPLESS_CLIENT_ID;  
    const client_secret = process.env.OTPLESS_CLIENT_SECRET;
    const sendOtpResp = await sendOtp(client_id,client_secret, phone, email);
    // console.log("Sign In Resp",singinResp);
    // cookies().set("otp-type", singinResp.requestIds[0].type);
    // cookies().set("otp-token", singinResp.requestIds[0].value, {
    //     httpOnly : true
    // });
    console.log(cookies().getAll())
    const response = {
        success : sendOtpResp.success,
        errorMessage : sendOtpResp.errorMessage || null,
        orderId : sendOtpResp.orderId || null
    }
    console.log(sendOtpResp,response);
    return NextResponse.json(response, {
        status : sendOtpResp.success ? 200 : 500
    });
}