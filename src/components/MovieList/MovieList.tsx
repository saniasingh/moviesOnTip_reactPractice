import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Movie } from "../../interfaces/Movie.interface";
import {
  addToFavorites,
  getFavoriteMovies,
  isFavorite,
  removeFromFavorites,
} from "../../services/Favorite/Favorite.service";
import {
  fetchMoviesComing,
  fetchMoviesInTheaters,
  fetchTopRatedIndia,
  fetchTopRatedMovies,
} from "../../services/Movie/Movie.service";
import MovieCard from "../MovieCard";
import "./MovieList.style.css";

const MovieList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("movies-coming");
  const [movies, setMovies] = useState<Movie[]>(fetchMoviesComing());
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchMovies = useCallback(() => {
    console.log("Fetching movies");
    switch (activeTab) {
      case "movies-coming":
        setMovies(fetchMoviesComing().slice());
        break;
      case "top-rated-movies":
        setMovies(fetchTopRatedMovies().slice());
        break;
      case "top-rated-india":
        setMovies(fetchTopRatedIndia().slice());
        break;
      case "movies-in-theaters":
        setMovies(fetchMoviesInTheaters().slice());
        break;
      case "favourite":
        setMovies(getFavoriteMovies().slice());
        break;
      default:
        setMovies([]);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home">
      <div className="tabs">
        <button onClick={() => setActiveTab("movies-coming")}>
          Movies Coming
        </button>
        <button onClick={() => setActiveTab("top-rated-movies")}>
          Top Rated Movies
        </button>
        <button onClick={() => setActiveTab("top-rated-india")}>
          Top Rated India
        </button>
        <button onClick={() => setActiveTab("movies-in-theaters")}>
          Movies In Theaters
        </button>
        <button onClick={() => setActiveTab("favourite")}>Favorites</button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="movie-grid">
        {filteredMovies.length === 0 ? "No movies to show" : ""}
        {filteredMovies.map((movie) => (
          <NavLink to={`/movies/${movie.id}`}>
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={isFavorite(movie.id)}
              onToggleFavorite={() => {
                if (isFavorite(movie.id)) {
                  removeFromFavorites(movie.id);
                  toast.success(
                    `Movie ${movie.title} - removed from favorites`
                  );
                } else {
                  addToFavorites(movie);
                  toast.success(`Movie ${movie.title} - added to favorites`);
                }
                fetchMovies();
              }}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
