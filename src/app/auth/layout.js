"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  const pathname = usePathname();
  const [active,setActive] = useState("auth");
  
  useEffect(()=> {
    if(pathname.includes("otp")) {
      setActive("otp");
    }
    else if(pathname.includes("link")){
      setActive("link");
    }
    else setActive("auth");
  },[pathname])
  return (
    <section className="flex min-h-screen flex-col items-center justify-start p-24">
      <nav className="bg-white border-gray-200 dark:bg-transparent">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">OTPLESS NEXT</span>
          </a>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-transparent dark:border-gray-700">
              <li>
                <Link href={"/auth"} className={`block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent ${active==="auth"? "md:text-blue-700" : ""} md:p-0 dark:text-white 
                ${active==="auth"? "md:dark:text-blue-500" : ""} ml-10`} aria-current="page">Home</Link>
              </li>
              <li>
                <Link href={"/auth/link"} className={`block py-2 px-3 text-gray-900 rounded ${active==="link"? "md:text-blue-700" : ""} md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white ${active==="link"? "md:dark:text-blue-500" : ""}  md:dark:hover:text-blue-500  dark:hover:text-white`}>Magic Link</Link>
              </li>
              <li>
                <Link href={"/auth/otp"} className={`block py-2 px-3 text-gray-900 rounded ${active==="link"? "md:text-blue-700" : ""} hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white  ${active==="otp"? "md:dark:text-blue-500" : ""} md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}>OTP Based</Link>
              </li>
              {/* <li>
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
        </li> */}
            </ul>
          </div>
        </div>
      </nav>


      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {/* <Button text={"Sign In"} callback={"signin"}/>
        <Button text={"Verify"} callback={"verify"}/> */}

        {children}
      </div>
    </section>
  )
}