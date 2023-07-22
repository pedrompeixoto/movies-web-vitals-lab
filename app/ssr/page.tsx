
import MovieEntry from "@/components/movie-entry";
import { getMoviesAPISingleton } from "../../movies-api/movies-api"

export const dynamic = "force-dynamic"

const moviesAPI = getMoviesAPISingleton();
const movieTitleQuery = "Oppenheimer";

export default async function SSR() {
  const movies = await moviesAPI.searchByTitle(movieTitleQuery);

  return (
    <div className="flex flex-col items-center p-24 gap-10">
      <div className="grid grid-cols-4 gap-8 place-content-center">
        { movies.results.map(movie => {
        {/* TODO placeholder when image is missing. Entries without a poster are hidden for now */} 
          if (movie.primaryImage?.url) {
            return (<MovieEntry key={movie._id} movie={movie}></MovieEntry>);
          } else {
            return null;
          }
        })}
      </div>
    </div>
  )
}
