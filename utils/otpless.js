import {magicLink, verifyCode, verifyToken} from "otpless-next-js-auth-sdk"

const signin = async(client_id, client_secret, phone, email) => {
    
    console.log(client_id, client_secret)  
    const magicLinkTokens = await magicLink(
      phone,
      email,
      "https://otpless-next.vercel.app/verification",
      "WHATSAPP",
      client_id,
      client_secret, 
      );
      console.log("MagicLink Tokens Details:", magicLinkTokens);
      return magicLinkTokens;
  }

  const verify = async (client_id, client_secret,token) => {
    
    const verifyTokenResponse = await verifyToken(
        token,
        client_id,
        client_secret,
        );
    console.log(verifyTokenResponse)
    return verifyTokenResponse;
  }

  const verifycode = async (client_id, client_secret,code) => {
    
    const verifyTokenResponse = await verifyCode(
        code,
        client_id,
        client_secret,
        );
    console.log(verifyTokenResponse)
    return verifyTokenResponse;
  }

  export {signin, verify, verifycode};