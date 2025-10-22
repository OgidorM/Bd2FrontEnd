// Presentation Layer: Cinema Main Page
import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import ScrollProgress from '../components/ScrollProgress';
import ProductCard from '../components/ProductCard';
import SectionBanner from '../components/SectionBanner';
import { GetFeaturedMovies } from '../../domain/usecases/GetFeaturedMovies';
import { GetProducts } from '../../domain/usecases/GetProducts';
import { MovieRepositoryImpl } from '../../data/repositories/MovieRepositoryImpl';
import { ProductRepositoryImpl } from '../../data/repositories/ProductRepositoryImpl';
import { moviesData as fallbackMovies } from '../../data/moviesData';
import { productsData as fallbackProducts } from '../../data/productsData';
import './CinemaMainPage.css';

const CinemaMainPage = () => {
  const [movies, setMovies] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load Movies
        const movieRepository = new MovieRepositoryImpl();
        const getFeaturedMovies = new GetFeaturedMovies(movieRepository);
        const featuredMovies = await getFeaturedMovies.execute();

        // Load Products
        const productRepository = new ProductRepositoryImpl();
        const getProducts = new GetProducts(productRepository);
        const productsResp = await getProducts.execute();

        const finalMovies = Array.isArray(featuredMovies) && featuredMovies.length > 0 ? featuredMovies : fallbackMovies;
        const finalProducts = Array.isArray(productsResp) && productsResp.length > 0 ? productsResp : fallbackProducts;

        console.log('[CinemaMainPage] Movies loaded via repo:', featuredMovies?.length ?? 'n/a');
        console.log('[CinemaMainPage] Products loaded via repo:', productsResp?.length ?? 'n/a');
        console.log('[CinemaMainPage] Using movies:', finalMovies.length, 'products:', finalProducts.length);

        setMovies(finalMovies);
        setProducts(finalProducts);
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback on error
        setMovies(fallbackMovies);
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">🎬</div>
        <p>Loading cinema...</p>
      </div>
    );
  }

  return (
    <div className="cinema-main-page">
      <ScrollProgress />
      {/* Debug counters to verify data loaded */}
      <div style={{position:'fixed', bottom:10, right:10, background:'rgba(0,0,0,0.5)', color:'#fff', padding:'6px 10px', borderRadius:8, fontSize:12, zIndex:999}}>
        movies: {Array.isArray(movies) ? movies.length : 'n/a'} | products: {Array.isArray(products) ? products.length : 'n/a'}
      </div>
      <Hero />

      {/* Movies Banner (snap) */}
      <SectionBanner
        id="movies-banner"
        theme="movies"
        title="Now Showing 🎥"
        subtitle="Discover the latest blockbusters and indie gems playing in our premium theaters"
      />

      {/* Movies Content */}
      <section className="movies-section">
        <div className="container">
          <div style={{textAlign:'center', color:'#7ed6df', marginBottom:'1rem', fontSize:12}}>
            Rendering {movies.length} movies {movies.length > 0 ? `– e.g., ${movies[0].title}` : ''}
          </div>
          {movies.length === 0 ? (
            <p style={{color:'#b0b0b0', textAlign:'center'}}>No movies available right now.</p>
          ) : (
            <div className="movie-grid">
              {movies.map((movie, index) => (
                <MovieCard key={movie.id ?? index} movie={movie} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products Banner (snap) */}
      <SectionBanner
        id="products-banner"
        theme="products"
        title="Cinema Store 🛍️"
        subtitle="Enhance your movie experience with our exclusive products and memberships"
      />

      {/* Products Content */}
      <section className="products-section">
        <div className="container">
          <div style={{textAlign:'center', color:'#ff6ec7', marginBottom:'1rem', fontSize:12}}>
            Rendering {products.length} products {products.length > 0 ? `– e.g., ${products[0].title}` : ''}
          </div>
          {products.length === 0 ? (
            <p style={{color:'#b0b0b0', textAlign:'center'}}>No products available right now.</p>
          ) : (
            <div className="products-grid">
              {products.map((product, index) => (
                <ProductCard key={product.id ?? index} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Banner (snap) */}
      <SectionBanner
        id="features-banner"
        theme="features"
        title="Premium Experience 🌟"
        subtitle="Why thousands choose Cinema Paradise for their movie nights"
      />

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎭</div>
              <h3>4K Ultra HD</h3>
              <p>Crystal clear picture quality for the ultimate viewing experience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔊</div>
              <h3>Dolby Atmos</h3>
              <p>Immersive sound that puts you right in the action</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🪑</div>
              <h3>Luxury Seats</h3>
              <p>Reclining leather seats with maximum comfort</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section (can remain non-snap) */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready for an Unforgettable Experience?</h2>
          <p>Join thousands of movie lovers and book your seats today</p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>
    </div>
  );
};

export default CinemaMainPage;
