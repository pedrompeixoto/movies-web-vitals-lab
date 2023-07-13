
interface MovieAPISearchFilters {
  type?: "movies" | "series" | "espisode";
  year?: number;
}

class MoviesAPI {
  BASE_URL = "http://www.omdbapi.com/";

  private fetch(url: string, searchParams?: URLSearchParams, options?: RequestInit) {

    let urlString = this.BASE_URL + url;

    if (!searchParams) {
      searchParams = new URLSearchParams()
    } 

    if (process.env.NEXT_PUBLIC_MOVIES_API_KEY) {
      searchParams.append("apiKey", process.env.NEXT_PUBLIC_MOVIES_API_KEY)
    }

    const urlParamsStr = searchParams.toString();
    if (urlParamsStr) {
      urlString += "?" + urlParamsStr;
    }

    return fetch(urlString, options); 
  }

  getMovieByTitle(title: string) {
    const searchParams = new URLSearchParams();

    searchParams.append("t", title);

    return this.fetch("", searchParams);
  }

  getMovieByID(id: string) {
    const searchParams = new URLSearchParams();

    searchParams.append("i", id);

    return this.fetch("", searchParams);
  }

  search(title: string, filters?: MovieAPISearchFilters, page: number = 1) {
    const searchParams = new URLSearchParams();

    searchParams.append("s", title);
    searchParams.append("p", page.toString());

    if (filters) {
      if (filters.type) {
        searchParams.append("t", filters.type);
      }

      if (filters.year) {
        searchParams.append("y", filters.year.toString());
      }
    }

    return this.fetch("", searchParams);
  }
}

let movieAPIInstance: MoviesAPI | null = null

function getMoviesAPISingleton() {
  if (!movieAPIInstance) {
    return new MoviesAPI()
  }

  return movieAPIInstance
}

export { getMoviesAPISingleton };
export type MovieAPISearchFilter = MovieAPISearchFilters;
