import React, { Suspense } from 'react'

function VerificationLayout({children}) {
  return (
    <Suspense>
        {children}
    </Suspense>
  )
}

export default VerificationLayout