// Use Case: Get Featured Movies
export class GetFeaturedMovies {
  constructor(movieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute() {
    return await this.movieRepository.getFeaturedMovies();
  }
}

