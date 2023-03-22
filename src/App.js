import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    // fetch("https://swapi.dev/api/films/")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     const transformedMovies = data.results.map((movieData) => {
    //       return {
    //         id: movieData.episode_id,
    //         title: movieData.title,
    //         openingText: movieData.opening_crawl,
    //         releaseDate: movieData.release_date,
    //       };
    //     });
    //     setMovies(transformedMovies);
    //   });
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something Went Wrong!...Retrying");
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }
  let content = <p>Found No Movies!</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (error) {
    let id = setTimeout(() => {
      fetchMoviesHandler();
    }, 5000);
    localStorage.setItem("settimeoutid", id);
    // console.log(id)
  }
  const cancelFetchMoviesHandler = () => {
    const id = localStorage.getItem("settimeoutid");
    clearTimeout(id);
    setError(null);
  };
  useEffect(fetchMoviesHandler, [])

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        <button onClick={cancelFetchMoviesHandler}>Cancel Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
