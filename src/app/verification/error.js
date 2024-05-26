"use client";
import React from 'react'

function VerificationError() {
  return (
    <section class="bg-white dark:bg-transparent">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">Failed ❌</h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Verification Failed</p>
            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Please retry</p>
        </div>   
    </div>
</section>
  )
}

export default VerificationError