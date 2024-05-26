"use client";
import React, { useState } from 'react'

function LoginOTP() {
    const [auth, setAuth] = useState("none");
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [phone,setPhone] = useState("");
    const [email,setEmail] = useState("");

    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if(email.length===0 && phone.length===0) throw new Error("Atleast 1 field required")
            if(email.length===0 && phone.length!=10) throw new Error("Invalid Phone No");
            const phoneNumber = phone.length>0 ? `91${phone}` : "";
            const otpData = {
                phone: phoneNumber,
                email: email
            }
            console.log(otpData);
            setAuth("loading");
            const resp = await fetch("/api/signin", {
                method: "POST",
                body : JSON.stringify(otpData),
                headers: {
                    "Content-Type": "application/json; charset=utf8"
                }
            });
            const data = await resp.json();
            if(data.success===false){
                setAuth("failed");
                throw new Error(data.errorMessage);
            }
            else {
                setAuth("success");
            }
        } catch (error) {
            alert(error.message);
        }
    }
    const handleVerification = async (e) => {
        e.preventDefault();
        try {
            setVerifyLoading(true);
            const resp = await fetch("/api/verify", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf8"
                }
            });
            const data = await resp.json();
            setVerifyLoading(false);
            if(data.success===false){
                setVerified(false);
                throw new Error(data.errorMessage);
            }
            else {
                setVerified(true);
            }
        } catch (error) {
            alert(error.message);
        }
    }
    return (
        <section className={`w-full h-full grid place-items-center`}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in easily with OTP
                        </h1>
                        {
                            auth==="none" && auth!=="success" ? 
                            (
                            <form className="space-y-4 md:space-y-6" >
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input value={email} onChange={(e)=> {
                                    setEmail(e.target.value);
                                }} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone No</label>
                                <input value={phone} onChange={(e)=> {
                                    setPhone(e.target.value);
                                }} type="text" name="phone" id="phone" placeholder="9857832216" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <button type="button" onClick={(e) => {
                                handleLogin(e);
                                }} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in with Link 🔗</button>

                        </form> )
                        : (
                            <form className="space-y-4 md:space-y-6" >
                            <p className={`text-lg text-primary-400`}> Check your Email/Whatapp for Verification OTP </p>
                            <div>
                                <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">OTP</label>
                                <input value={phone} onChange={(e)=> {
                                    setPhone(e.target.value);
                                }} type="text" name="otp" id="otp" placeholder="OTP HERE" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                            </div>
                            <button type="button" onClick={(e) => {
                                handleVerification(e);
                                }} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{
                                    !verifyLoading && !verified ? <span>Verify</span> :
                                    verifyLoading ? 
                                    <span className={`animate-spin`}>♻︎</span> :
                                    verified ? 
                                    <span>Verified ✅</span> : <span>Verification Failed ⚠️</span>
                                }</button>

                        </form>
                        )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginOTP