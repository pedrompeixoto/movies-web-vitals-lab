'use client';

import MovieEntry from "@/components/movie-entry";
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
        <button className="text-center h-full w-20 font-bold bg-[]" onClick={() => getMovies()}>
          Search
        </button>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 xl:grid-cols-4  gap-8 place-content-center">
        { movies.map(movie => {
          {/* TODO placeholder when image is missing. Entries without a poster are hidden for now */} 
          if (movie.primaryImage?.url) {
            return (<MovieEntry key={movie._id} movie={movie}></MovieEntry>);
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}
