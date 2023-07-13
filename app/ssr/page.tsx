
import { getMoviesAPISingleton } from "../../movies-api/movies-api"

export const dynamic = "force-dynamic"

const moviesAPI = getMoviesAPISingleton();
const movieTitleQuery = "pulp fiction"

export default async function SSR() {
  const response = await moviesAPI.getMovieByTitle(movieTitleQuery);
  const movie = await response.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{ movie.Title }</p>
    </main>
  )
}
