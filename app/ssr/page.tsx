
import { getMoviesAPISingleton } from "../../movies-api/movies-api"

const moviesAPI = getMoviesAPISingleton();
const movieTitleQuery = "pulp fiction"

export default async function SSR() {

  try {
    const response = await moviesAPI.searchByTitle(movieTitleQuery);
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.log(err);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    </main>
  )
}
