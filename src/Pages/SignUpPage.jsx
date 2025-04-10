import React from 'react'
import { SignUp } from '@clerk/clerk-react';


const SignUpPage = () => {
  return (
    <div>
      <SignUp
        afterSignupUrl="/signin" // redirect to your sign-up route
        signinUrl="/signin" // show a sign-up link below the sign-in form
      />
  </div>
  )
}

export default SignUpPage
