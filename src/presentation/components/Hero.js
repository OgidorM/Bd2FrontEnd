// Presentation Layer: Hero Component
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5')
      .from(buttonRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, '-=0.4');
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-content">
        <h1 ref={titleRef} className="hero-title">
          Welcome to Cinema Paradise
        </h1>
        <p ref={subtitleRef} className="hero-subtitle">
          Experience movies like never before
        </p>
        <button ref={buttonRef} className="hero-button">
          🎬 Book Your Tickets Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
