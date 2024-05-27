import { magicLink, verifyCode, verifyOTP, verifyToken } from "otpless-next-js-auth-sdk"

const signin = async (client_id, client_secret, phone, email) => {

  console.log(client_id, client_secret)
  const magicLinkTokens = await magicLink(
    phone,
    email,
    // "http://localhost:3000/verification",
    "https://otpless-next.vercel.app/verification",
    "WHATSAPP",
    client_id,
    client_secret,
  );
  console.log("MagicLink Tokens Details:", magicLinkTokens);
  return magicLinkTokens;
}

const sendOtp = async (clientId, clientSecret, phone, email) => {

  console.log(clientId, clientSecret)
  const otpData = {
    phoneNumber: phone,
    email,
    channel: email.length===0 ? "WHATSAPP" : "EMAIL",
    otpLength: 6,
    expiry: 300
  };

  const headers = {
    "Content-Type": "application/json",
    clientId,
    clientSecret
  };

  const sendOTPResp = await fetch("https://auth.otpless.app/auth/otp/v1/send", {
    method: "POST",
    headers: headers,
    body : JSON.stringify(otpData)
  })

  const response = await sendOTPResp.json();
  console.log(response);
  return response;
}

const verify = async (token) => {
  const verifyTokenResponse = await fetch("https://auth.otpless.app/auth/v1/userinfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
  console.log(verifyTokenResponse)
  return await verifyTokenResponse.json();
}

const verifycode = async (client_id, client_secret, code) => {
  const data = {
    "grant_type": "code",
    "code": code,
    "client_id": client_id,
    "client_secret": client_secret
  };
  const verifyTokenResponse = await fetch("https://auth.otpless.app/auth/v1/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
  console.log(verifyTokenResponse);
  const verifyData = await verifyTokenResponse.json();
  if (verifyTokenResponse.status !== 200) throw new Error(verifyData.message);
  // console.log(verifyTokenResponse)
  return verifyData;
}

const verifyOtp = async(orderId, otp, email, phone, clientId, clientSecret) => {
  const verifyOtpResponse = await verifyOTP(email,phone,orderId,otp,clientId, clientSecret);
  // const verifyOtpData = await verifyOtpResponse.json();
  console.log("Verify OTP(otpless.js) : ",verifyOtpResponse)
  return verifyOtpResponse;
}



export { signin, verify, verifycode, sendOtp, verifyOtp };