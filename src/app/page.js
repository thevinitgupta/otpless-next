"use client";
import { useEffect , useRef, useState} from "react";
import Button from "./_components/Button";
import Login from "./_components/Login";
import { useRouter } from "next/navigation";
import User from "./_components/User";
export default function Home() {
 const router = useRouter();

 const [user,setUser] = useState(null);
 const checkUser = async () => {
    const userData = await fetch("/api/userinfo", {
      method: "POST",
      headers : {
        "Content-Type": "application/json",
      }
    });
    const data = await userData.json();
    console.log(data);
    if(data.errorMessage) router.replace("/auth");
    setUser(data.username)
    return data;
 }

    useEffect(() => {
      checkUser();
    }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {/* <Button text={"Sign In"} callback={"signin"}/>
        <Button text={"Verify"} callback={"verify"}/> */}
       {user && <User name={user}/>}
      </div>
    </main>
  );
}
