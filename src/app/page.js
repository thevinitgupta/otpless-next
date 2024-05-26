"use client";
import { useEffect } from "react";
import Button from "./_components/Button";
import Login from "./_components/Login";
import { useRouter } from "next/navigation";
import User from "./_components/User";
export default function Home() {
 const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) {
      router.replace("/auth");
    }
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {/* <Button text={"Sign In"} callback={"signin"}/>
        <Button text={"Verify"} callback={"verify"}/> */}
        <User/>
      </div>
    </main>
  );
}
