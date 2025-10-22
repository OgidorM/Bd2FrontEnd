// Presentation Layer: Movie Card Component
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MovieCard.css';

gsap.registerPlugin(ScrollTrigger);

const MovieCard = ({ movie, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: 'power2.out',
          delay: index * 0.05,
          immediateRender: false,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            markers: false,
            once: false
          }
        }
      );
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <div className="movie-card" ref={cardRef}>
      <div className="movie-image-wrapper">
        <img src={movie.image} alt={movie.title} className="movie-image" />
        <div className="movie-overlay">
          <button className="play-button">▶ Watch Trailer</button>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-genre">{movie.genre}</p>
        <p className="movie-description">{movie.description}</p>
        <div className="movie-footer">
          <span className="movie-rating">⭐ {movie.rating}</span>
          <button className="book-button">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
