import React, { useState, useEffect } from 'react'
import Loader from '../../components/Loader'
import { useNavigate } from 'react-router-dom'
import '../../App.css'

const Products = () => {
  const [moviesList, setMoviesList] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
 
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedYear, setSelectedYear] = useState('All')
  const [selectedGenre, setSelectedGenre] = useState('All')
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true)
    setError(null)

    fetch('https://moviesdatabase.p.rapidapi.com/titles/x/upcoming?limit=40', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'bb4e2ec8b3mshbd8bd8e919b7d2dp154b1fjsn077cb4aa1af5',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        const fetchedMovies = data.results || []
        setMoviesList(fetchedMovies)
        setFilteredMovies(fetchedMovies)
      })
      .catch((err) => {
        console.error('Fetch Error:', err)
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const handleSearchFilter = () => {
  const filtered = moviesList.filter((movie) => {
    const matchesTerm = movie.titleText.text.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear = selectedYear === 'All' || movie.releaseYear.year.toString() === selectedYear
    const matchesType = selectedGenre === 'All' || movie.titleType.text.toLowerCase().includes(selectedGenre.toLowerCase())
    return matchesTerm && matchesYear && matchesType
  })
  setFilteredMovies(filtered)
}

  return (
    <div className="catalogue-wrapper">

      <div className="filter-control">
        <div className="control-group">
          <label>Search</label>
          <input 
            type="text" 
            placeholder="Search movie..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="control-group">
          <label>Year</label>
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="All">All Years</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>

        <div className="control-group">
          <label>Type</label>
          <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            <option value="All">All Types</option>
            <option value="Movie">Movie</option>
            <option value="Series">Series</option>
            <option value="Podcast">Podcast</option>
          </select>
        </div>

        <button onClick={handleSearchFilter} className="btn-search">Search</button>
      </div>

      <div className="catalogue-container">
        <h2 className="catalogue-section-title">Latest Added</h2>

        {!isLoading && !error && (
          filteredMovies.length === 0 ? (
            <p className="no-results-message">No titles matched your specific filter choices.</p>
          ) : (
            <div className="movie-display-grid">
              {filteredMovies.map((movie) => (
              <div 
              key={movie.id} 
              className="movie-display-card" 
              onClick={() => navigate(`/products/${movie.id}`)}
              style={{ cursor: 'pointer' }} 
            >
              <div className="movie-poster-frame">
                <img 
                  src={movie.primaryImage?.url || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=500"} 
                  alt={movie.titleText?.text} 
                />
              </div>
              <div className="movie-poster-meta">
                <h3 className="movie-card-title">{movie.titleText?.text || "Movie Title"}</h3>
                <span className="movie-card-year">{movie.releaseYear?.year || 'N/A'}</span>
              </div>
            </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  )
}
        
export default Products