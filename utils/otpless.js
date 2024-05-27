import {magicLink, verifyCode, verifyToken} from "otpless-next-js-auth-sdk"

const signin = async(client_id, client_secret, phone, email) => {
    
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

  const verifycode = async (client_id, client_secret,code) => {
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
      body : JSON.stringify(data)
    })
    const verifyData = await verifyTokenResponse.json();
    if(verifyTokenResponse.status!==200) throw new Error(verifyData.message);
    // console.log(verifyTokenResponse)
    return verifyData;
  }

  export {signin, verify, verifycode};