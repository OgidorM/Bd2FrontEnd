// Presentation Layer: Product Card Component
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProductCard.css';

gsap.registerPlugin(ScrollTrigger);

const ProductCard = ({ product, index }) => {
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
    <div className="product-card" ref={cardRef}>
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.title} className="product-image" />
        <div className="product-badge">{product.category}</div>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button className="buy-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
