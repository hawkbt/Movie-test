import React from 'react'
import {Link} from 'react-router-dom'

export default function MoviesPoster({movie}) {
  return (
    <div className="moviePoster">
      <Link to={`/movie/${movie.id}`}>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}/>
      </Link>
  </div>
  )
}
