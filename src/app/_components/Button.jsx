"use client";

import React from 'react'


function Button({text, callback}) {
    const handleSignin = async() => {
        console.log("Handle Signin")
        const resp = await fetch("/api/signin", {
            method: "POST",
            headers :{
                "Content-Type": "application/json"
            }
        });
        console.log(resp)
        const data = await resp.json();
        console.log(data);
    }
   const handleClick = () => {
    if(callback==="signin") handleSignin();
    // else if(callback==="verify") verify("1f008ead6baa4fb38b8d635a765944d2");
   } 
  return (
    <button onClick={handleClick} className="text-lg py-2 px-4 bg-white rounded-md text-black">{text}</button>
  )
}

export default Button