'use client';

import { useEffect, useState } from 'react';

export default function spa() {

  const [movieTitleQuery, setMovieTitleQuery] = useState("");

  // TODO: create a wrapper around fetch that injects the omdb api that should come from a .env file
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch("http://www.omdbapi.com/?t=" + movieTitleQuery + "&apikey=<>");
        const result = await response.json();
        console.log(result);
      } catch (err) {
        console.log(err);
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
