// MovieCard.tsx

import React from "react";
import { Movie } from "../../interfaces/Movie.interface";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="movie-card">
      <img src={movie.posterurl} alt={movie.title} />
      <div className="movie-title">{movie.title}</div>
      <button
        onClick={(e) => {
          if (e.defaultPrevented) return;
          e.preventDefault();
          onToggleFavorite();
        }}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default MovieCard;
