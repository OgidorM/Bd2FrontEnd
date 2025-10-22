// Presentation Layer: Movie List Component
import React from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';

const MovieList = ({ movies, title }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <>
      {title && <h2 className="section-title">{title}</h2>}
      <div className="movie-list-grid">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </div>
    </>
  );
};

export default MovieList;
