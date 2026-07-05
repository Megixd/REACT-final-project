import React from 'react'
import { useLocation } from 'react-router-dom'
import SignInForm from '../../components/SignInForm'


const SignIn = () => {
  const params = useLocation()
  return (
   <div> 
    <SignInForm/>
    {params.state?.success && <p>Registration successful!</p>}
  </div>
  )
}


export default SignIn;