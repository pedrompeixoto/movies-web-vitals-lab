
import { getMoviesAPISingleton } from "../../movies-api/movies-api"

export const dynamic = "force-dynamic"

const moviesAPI = getMoviesAPISingleton();
const movieTitleQuery = "Oppenheimer";

export default async function SSR() {
  const movies = await moviesAPI.searchByTitle(movieTitleQuery);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{ movies.results[0].titleText.text }</p>
    </main>
  )
}
