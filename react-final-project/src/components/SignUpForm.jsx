import React, { useState } from 'react'
import auth from '../api/auth'
import { useNavigate, Link} from "react-router-dom"
import routes from "../constants/routes"
import Loader from "./Loader"


const SignUpForm = () => {
   const [user, setUser] = useState({email: "", userName: "", password: ""})
   const [isLoading, setIsLoading] = useState(false)
   const navigate = useNavigate()

   const submitHandler = (e) => {
    e.preventDefault()
    setIsLoading(true)

    auth(user, "register")
      .then((data) => {
      navigate(routes.SignIn, {state: {success: true}})
      })
      .catch ((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
   } 

   const userHandler = (e) => {
    const {name, value} = e.target;

    setUser((prev) => ({...prev, [name] : value}))
   }


  return (
  <div className="auth-wrapper">
    <div className="auth-card">
      <h2>Sign Up</h2>
      
      <form onSubmit={submitHandler}>
        {isLoading && <Loader />}
        
        <div className="auth-field">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Email" 
            name="email" 
            onChange={userHandler} 
            required
          />
        </div>

        <div className="auth-field">
          <label>Username</label>
          <input 
            type="text" 
            placeholder="Username" 
            name="userName" 
            onChange={userHandler} 
            required
          />
        </div>
        
        <div className="auth-field">
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            onChange={userHandler} 
            required
          />
        </div>

        <button type="submit" className="btn-auth" disabled={isLoading}>
          Sign Up
        </button>
      </form>

      <div className="auth-switch">
        <span>Already have an account? </span>
        <Link to="/signin">Sign in here</Link>
      </div>
    </div>
  </div>
)
}

export default SignUpForm