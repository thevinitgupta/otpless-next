
import React from 'react'
import Login from '../_components/Login'

function Auth() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {/* <Button text={"Sign In"} callback={"signin"}/>
        <Button text={"Verify"} callback={"verify"}/> */}
        <Login />
      </div>
    </main>
  )
}

export default Auth