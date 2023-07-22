'use client';

import { MovieAPIMovie, getMoviesAPISingleton } from "../../movies-api/movies-api"
import { useState } from 'react';

export default function SPA() {
  const moviesAPI = getMoviesAPISingleton();

  const [movieTitleQuery, setMovieTitleQuery] = useState("");
  const [movies, setMovies] = useState<MovieAPIMovie[]>([]);

  // TODO: create a wrapper around fetch that injects the omdb api that should come from a .env file
  const getMovies = async () => {
    if (movieTitleQuery) {
      try {
        const moviesRes = await moviesAPI.searchByTitle(movieTitleQuery);
        setMovies(moviesRes.results);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-24 gap-10">
      <div className="h-10">
        <input className="h-full w-45 text-slate-950 p-1" type="text" 
          value={movieTitleQuery} 
          onChange={e => setMovieTitleQuery(e.target.value)}
        />
        <button className="text-center h-full w-20 font-bold bg-[]" onClick={() => getMovies()}>Search</button>
      </div>

      <div className="grid grid-cols-4 gap-8 place-content-center">
        { movies.map(movie => {
          {/* TODO placeholder when image is missing. Entries without a poster are hidden for now */} 
          if (movie.primaryImage?.url) {
            return (
              <div className="flex flex-col gap-4 items-center" key={movie._id}>
                <div className="h-60 w-60 overflow-hidden flex justify-center items-center">
                  <img className="max-h-full max-w-full" src={ movie.primaryImage?.url } alt={movie.titleText.text}/>
                </div>
                <span className="text-center">{ movie.titleText.text }</span>
              </div>
            )
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}
