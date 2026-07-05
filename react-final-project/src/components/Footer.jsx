import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-links">
        <div className="footer-column">
          <Link to="/" className="footer-link">FAQ</Link>
          <Link to="/" className="footer-link">Investor Relations</Link>
          <Link to="/" className="footer-link">Privacy</Link>
        </div>
        <div className="footer-column">
          <Link to="/" className="footer-link">Help Center</Link>
          <Link to="/" className="footer-link">Jobs</Link>
          <Link to="/" className="footer-link">Terms of Use</Link>
        </div>
        <div className="footer-column">
          <Link to="/products" className="footer-link">Movies Catalogue</Link>
          <Link to="/" className="footer-link">Media Center</Link>
          <Link to="/" className="footer-link">Contact Us</Link>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 LETFLIX. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer