import React from 'react'
import { useAppContext } from '../context/AppContextProvider'
import { useNavigate } from "react-router-dom"

const AuthGuard = ({ children }) => {
  const { state } = useAppContext()
  const navigate = useNavigate()

  return (
    state.userIsLoggedIn ? (
      children
    ) : (
      <div>
        <h1>You are not authenticated</h1>
        <p>Please sign in or sign up</p>
  
        <button onClick={() => navigate("/signup")}>Sign Up</button>
        <button onClick={() => navigate("/signin")}>Sign In</button>
      </div>
    )
  )
}

export default AuthGuard;