'use client';

import { getMoviesAPISingleton } from "../../movies-api/movies-api"
import { useEffect, useState } from 'react';

export default function SPA() {
  const moviesAPI = getMoviesAPISingleton();

  const [movieTitleQuery, setMovieTitleQuery] = useState("");
  const [movie, setMovie] = useState<any>({});

  // TODO: create a wrapper around fetch that injects the omdb api that should come from a .env file
  useEffect(() => {
    const getMovies = async () => {
      if (movieTitleQuery) {
        try {
          const response = await moviesAPI.searchByTitle(movieTitleQuery);
          const result = await response.json();

          const response2 = await moviesAPI.search(movieTitleQuery);
          const result2 = await response2.json();

          console.log(result2);

          setMovie(result);
        } catch (err) {
          console.log(err);
        }
      }
    };

    getMovies();
  }, [movieTitleQuery]);

  return (
    <main className="flex flex-col items-center p-24">
      <button onClick={() => setMovieTitleQuery("pulp fiction")}>search</button>
      <p className="mt-8">{movie.Title}</p>
    </main>
  );
}
