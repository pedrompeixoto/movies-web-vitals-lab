import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getMoviesAPISingleton } from "../../movies-api/movies-api"

export const dynamic = "error"

const moviesAPI = getMoviesAPISingleton();

export default async function SSG() {
  const movieRes = await moviesAPI.searchByTitle("pulp fiction")
  const movie = await movieRes.json();
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{ movie.Title }</p>
    </main>
  )
}
