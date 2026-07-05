import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import routes from '../../constants/routes'
import '../../App.css'

const ProductInfo = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [movie, setMovie] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'bb4e2ec8b3mshbd8bd8e919b7d2dp154b1fjsn077cb4aa1af5',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
      .then(data => setMovie(data.results))
      .catch(err => setError(err.message || err))
      .finally(() => setIsLoading(false))
  }, [id])

  return (
    <div className="info-wrapper">
      <button onClick={() => navigate(routes.Products || '/products')} className="btn-back">
        ➔ Back to Catalogue
      </button>

      {error || !movie ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="info-layout">
          <div className="info-poster-column">
            <img src={movie.primaryImage?.url || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=500"}/>
          </div>

          <div className="info-details-column">
            <span className="info-badge">{movie.titleType.text}</span>
            <h1 className="info-main-title">{movie.titleText.text}</h1>
            
            <div className="info-row">
              <span className="release-year">Year: {movie.releaseYear?.year || 'N/A'}</span>
              <span className="rating-pill">HD 1080p</span>
            </div>

            <p className="info-text">
              No description available for this upcoming title yet.
            </p>

            <button className="btn-play" style={{ width: 'fit-content' }}>▶ Stream Now</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductInfo