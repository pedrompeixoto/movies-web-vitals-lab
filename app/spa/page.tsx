'use client';

import { getMoviesAPISingleton } from "../../movies-api/movies-api"
import { useEffect, useState } from 'react';

export default function spa() {
  const moviesAPI = getMoviesAPISingleton();

  const [movieTitleQuery, setMovieTitleQuery] = useState("");

  // TODO: create a wrapper around fetch that injects the omdb api that should come from a .env file
  useEffect(() => {
    const getMovies = async () => {
      if (movieTitleQuery) {
        try {
          const response = await moviesAPI.searchByTitle(movieTitleQuery);
          const result = await response.json();
          console.log(result);
        } catch (err) {
          console.log(err);
        }
      }
    };

    getMovies();
  }, [movieTitleQuery]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => setMovieTitleQuery("pulp fiction")}>search</button>
    </main>
  );
}
