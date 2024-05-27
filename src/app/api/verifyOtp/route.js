import { cookies, headers } from "next/headers";
import { verifyOtp } from "../../../../utils/otpless";
import { NextResponse } from "next/server";

export async function POST(req,res) {
    try {
        const client_id = process.env.OTPLESS_CLIENT_ID;  
        const client_secret = process.env.OTPLESS_CLIENT_SECRET;
        const {orderId, otp, phone, email} = await req.json();
        console.log(otp)
        if(!otp) return NextResponse.json({error : "OTP Not Found"}, {
            status : 400
        });

        const tokenVerified = await verifyOtp(orderId,otp,email,phone,client_id,client_secret);
        console.log("Verify OTP",tokenVerified);          
        const {isOTPVerified, reason, success, errorMessage} = tokenVerified;
        if(success!=null && success===false) throw new Error(errorMessage); 
        
        // console.log(tokenVerified,response);
        return NextResponse.json({
            verified : isOTPVerified,
            message : reason
        }, {
            status : 200 
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({error : error.message || "Internal Server Error"}, {
            status : 500
        });
    }

}