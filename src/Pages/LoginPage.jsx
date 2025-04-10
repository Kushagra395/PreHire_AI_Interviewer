import React from 'react'
import { SignIn } from '@clerk/clerk-react';


const LoginPage = () => {
    return (
        <div>
          <SignIn
        afterSignInUrl="/signup" // redirect to your sign-up route
        signUpUrl="/signup" // show a sign-up link below the sign-in form
      />
        </div>
      )
}

export default LoginPage
