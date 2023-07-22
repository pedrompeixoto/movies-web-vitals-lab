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
          const moviesRes = await moviesAPI.searchByTitle(movieTitleQuery);
          setMovie(moviesRes.results[0]);
        } catch (err) {
          console.log(err);
        }
      }
    };

    getMovies();
  }, [movieTitleQuery]);

  return (
    <main className="flex flex-col items-center p-24">
      <input className="" type="text" value={movieTitleQuery}/>
      <button onClick={() => setMovieTitleQuery("Oppenheimer")}>search</button>
      <p className="mt-8">{movie.titleText?.text || ""}</p>
    </main>
  );
}
