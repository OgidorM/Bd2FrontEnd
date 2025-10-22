// Presentation Layer: Film Reel Animation Component
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PopcornAnimation.css';

gsap.registerPlugin(ScrollTrigger);

const FilmReelAnimation = () => {
  const containerRef = useRef(null);
  const reelsRef = useRef([]);

  useEffect(() => {
    // Clear refs array
    reelsRef.current = [];

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      reelsRef.current.forEach((reel, index) => {
        if (reel) {
          // Initial random position
          const startX = Math.random() * (window.innerWidth - 100);
          const startY = -100 - Math.random() * 200;

          gsap.set(reel, {
            x: startX,
            y: startY,
            rotation: Math.random() * 360,
            opacity: 0.3 + Math.random() * 0.2
          });

          // Continuous floating animation
          gsap.to(reel, {
            y: `+=${60 + Math.random() * 40}`,
            x: `+=${(Math.random() - 0.5) * 80}`,
            rotation: `+=${180 + Math.random() * 180}`,
            duration: 4 + Math.random() * 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.4
          });

          // Scroll-based vertical movement
          gsap.to(reel, {
            scrollTrigger: {
              trigger: document.body,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
              invalidateOnRefresh: true
            },
            y: `+=${window.innerHeight + 400}`,
            ease: 'none'
          });
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf(reelsRef.current);
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !reelsRef.current.includes(el)) {
      reelsRef.current.push(el);
    }
  };

  return (
    <div className="film-reel-container" ref={containerRef}>
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          ref={addToRefs}
          className="film-reel"
        >
          <svg width="50" height="50" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="28" stroke="#ffd700" strokeWidth="2" fill="#1a1a2e" opacity="0.8"/>
            <circle cx="30" cy="30" r="18" stroke="#ffd700" strokeWidth="1" fill="none"/>
            <circle cx="15" cy="15" r="3" fill="#ffd700"/>
            <circle cx="45" cy="15" r="3" fill="#ffd700"/>
            <circle cx="15" cy="45" r="3" fill="#ffd700"/>
            <circle cx="45" cy="45" r="3" fill="#ffd700"/>
            <line x1="30" y1="12" x2="30" y2="48" stroke="#ffd700" strokeWidth="1"/>
            <line x1="12" y1="30" x2="48" y2="30" stroke="#ffd700" strokeWidth="1"/>
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FilmReelAnimation;
