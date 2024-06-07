import { Movie } from '../../interfaces/Movie.interface';
import moviesData from '../../assets/movies.json';


export const fetchMoviesComing = (): Movie[] => {
  return moviesData["movies-coming"] as Movie[];
};

export const fetchTopRatedMovies = (): Movie[] => {
  return moviesData["top-rated-movies"] as Movie[];
};

export const fetchTopRatedIndia = (): Movie[] => {
  return moviesData["top-rated-india"] as Movie[];
};

export const fetchMoviesInTheaters = (): Movie[] => {
  return moviesData["movies-in-theaters"] as Movie[];;
};


export const findMovieById = (movieId: string): Movie | null => {
  const categories = [
    'movies-coming',
    'top-rated-movies',
    'top-rated-india',
    'movies-in-theaters',
    'favourite'
  ];

  for (const category of categories) {
    const movies: Movie[] = (moviesData as any)[category];
    const foundMovie = movies.find(movie => movie.id === movieId);
    if (foundMovie) {
      return foundMovie;
    }
  }
  return null;
};