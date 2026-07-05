import React from 'react'
import { useAppContext } from '../context/AppContextProvider'
import { logoutAction } from '../context/actionsCreator'
import { useNavigate, Link } from 'react-router-dom'
import '../App.css'

const NavBar = () => {
  const { state, dispatch } = useAppContext()
  const navigate = useNavigate()

  const isLoggedIn = state?.isAuthorized || localStorage.getItem('token')

  const handleLogout = () => {
    dispatch(logoutAction())
    localStorage.removeItem('token')
    navigate('/')
    }

  return (
    <nav className="navbar-container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">LETFLIX</Link>
      </div>
      
      <div className="navbar-menu">
        {isLoggedIn ? (
          <div>
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/products" className="navbar-link">Movies</Link>
            <button onClick={handleLogout} className="navbar-logout-btn">
              Log Out
            </button>
          </div>
        ) : (
          <div>
            <Link to="/signin" className="navbar-link">Sign In</Link>
            <Link to="/signup" className="navbar-link navbar-signup-btn">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar;