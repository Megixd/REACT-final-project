import React, { useState } from 'react'
import auth from '../api/auth'
import {useAppContext} from "../context/AppContextProvider"
import { loginActions } from '../context/actionsCreator'
import routes from "../constants/routes"
import {useNavigate} from "react-router-dom"
import Loader from "./Loader"
import { Link } from 'react-router-dom'


const SignInForm = () => {
  const [user, setUser] = useState({email: "", password: ""})
  const [isLoading, setIsLoading] = useState(false)
  const {state, dispatch} = useAppContext()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault() 
    setIsLoading(true)

    auth(user, "login")
    .then((data) => {
      const tokenToSave = data.token || data
      dispatch(loginActions({token: tokenToSave}))
      navigate(routes.Products)
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setIsLoading(false)
    }) 
  }

  const userHandler = (e) => {
    const {name, value} = e.target

    setUser((prev) => ({ ...prev, [name]: value}))
  }

  return (
  <div className="auth-wrapper">
    <div className="auth-card">
      <h2>Sign In</h2>
      
      <form onSubmit={submitHandler}>
        {isLoading && <Loader />}
        
        <div className="auth-field">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Enter Your Email" 
            name="email" 
            onChange={userHandler} 
            required
          />
        </div>
        
        <div className="auth-field">
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter Your Password" 
            name="password" 
            onChange={userHandler} 
            required
          />
        </div>

        <button type="submit" className="btn-auth" disabled={isLoading}>
          Sign In
        </button>
      </form>

      <div className="auth-switch">
        <span>New to LETFLIX? </span>
        <Link to="/signup">Sign up now</Link>
      </div>
    </div>
  </div>
)
}

export default SignInForm