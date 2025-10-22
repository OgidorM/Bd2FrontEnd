// Data Layer: Movie Repository Implementation
import { MovieRepository } from '../../domain/repositories/MovieRepository';
import { Movie } from '../../domain/entities/Movie';
import { moviesData } from '../moviesData';

export class MovieRepositoryImpl extends MovieRepository {
  async getFeaturedMovies() {
    // Convert data to Movie entities
    return moviesData.map(movie =>
      new Movie(
        movie.id,
        movie.title,
        movie.description,
        movie.image,
        movie.rating,
        movie.genre
      )
    );
  }

  async getNowShowing() {
    return await this.getFeaturedMovies();
  }
}
