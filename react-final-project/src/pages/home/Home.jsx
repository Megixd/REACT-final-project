import React, { useState, useEffect } from 'react'
import Loader from '../../components/Loader'
import '../../App.css'

const Home = () => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  fetch('https://moviesdatabase.p.rapidapi.com/titles/x/upcoming?limit=40', {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'bb4e2ec8b3mshbd8bd8e919b7d2dp154b1fjsn077cb4aa1af5',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`)
      }
        return response.json()
      })
      .then((data) => {
        setMovies(data.results || [])
      })
      .catch((err) => {
        console.error('Error:', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
}, [])

const heroMovie = movies[0]
const carouselMovies = movies.slice(1, 8)

return (
  <div className="home-wrapper">
    {heroMovie && (
      <section 
        className="hero-banner"
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.3)), url(${heroMovie.primaryImage.url})` 
        }}
      >
        <div className="hero-banner-content">
          <span className="hero-trending">PREMIERE SPOTLIGHT</span>
          <h1 className="hero-title">{heroMovie.titleText.text}</h1>
          
          <div className="hero">
            <span className="hero-year">{heroMovie.releaseYear.year}</span>
            <span className="hero-age-rating">18+</span>
            <span className="hero-genre">{heroMovie.titleType.text}</span>
          </div>

          <p className="hero-description">
            Discover the latest cinematic breakthrough tracking exclusively on LETFLIX. Full details, casts and real-time community insights available instantly.
          </p>

          <div className="hero-actions">
            <button className="btn-play">▶ Play Now</button>
            <button className="btn-info">More Information</button>
          </div>
        </div>
      </section>
    )}

    <section className="carousel-section">
      <div className="carousel-header">
        <h2>You Might Also Like</h2>
      </div>
      
      <div className="carousel-row">
        {carouselMovies.map((movie) => (
          <div key={movie.id} className="carousel-card">
            <div className="card-image-wrapper">
              <img 
                src={movie.primaryImage?.url || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=500"} 
              />
            </div>
            <div className="card-details">
              <h3>{movie.titleText.text}</h3>
              <p>{movie.titleType.text} • {movie.releaseYear.year}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
)}

export default Home