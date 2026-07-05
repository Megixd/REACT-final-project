import React from 'react'
import './App.css'
import AppRoutes from "./AppRoutes"
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="main-content">
        <AppRoutes />
      </div>
      <Footer /> 
    </div>
  )
}

export default App