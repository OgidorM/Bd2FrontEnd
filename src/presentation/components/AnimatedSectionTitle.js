// Presentation Layer: Animated Section Title
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AnimatedSectionTitle.css';

gsap.registerPlugin(ScrollTrigger);

const AnimatedSectionTitle = ({ title, subtitle }) => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from(lineRef.current, {
        scaleX: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3')
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4');
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="animated-section-title">
      <h2 ref={titleRef} className="section-main-title">{title}</h2>
      <div ref={lineRef} className="title-line"></div>
      <p ref={subtitleRef} className="section-subtitle">{subtitle}</p>
    </div>
  );
};

export default AnimatedSectionTitle;

