/* eslint-disable no-extend-native */
// favorite.service.ts

import { Movie } from '../../interfaces/Movie.interface';



const favoriteMovies: Movie[] = [];

export const addToFavorites = (movie: Movie): void => {
  if (!isFavorite(movie.id)) {
    favoriteMovies.push(movie);
  } 
};

export const removeFromFavorites = (movieId: string): void => {
  let movieIndex = favoriteMovies.findIndex((movie) => movie.id === movieId)
  favoriteMovies.splice(movieIndex, 1)
};

export const isFavorite = (movieId: string): boolean => {
  return favoriteMovies.some((movie) => movie.id === movieId);
};

export const getFavoriteMovies = (): Movie[] => {
  return favoriteMovies;
};

