// MovieDetails.tsx

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findMovieById } from "../../services/Movie/Movie.service";

const MovieDetails: React.FC = () => {
  const navigate = useNavigate();
  const { movieId } = useParams<{ movieId: string }>();
  if (!movieId) {
    return <div>Invalid movie ID!!</div>;
  }
  const movie = findMovieById(movieId);
  if (!movie) {
    return <div>Movie not found!!</div>;
  }
  return (
    <div className="movie-details">
      <button className="close-button" onClick={() => navigate(-1)}>
        Back to home
      </button>
      <h2>{movie.title}</h2>
      <img src={movie.posterurl} alt={movie.title} />
      <p>Year: {movie.year}</p>
      <p>Genres: {movie.genres.join(", ")}</p>
      <p>Storyline: {movie.storyline}</p>
      <p>Actors: {movie.actors.join(", ")}</p>
    </div>
  );
};

export default MovieDetails;
