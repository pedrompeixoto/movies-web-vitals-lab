
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

  searchByTitle(title: string) {
    const searchParams = new URLSearchParams();

    searchParams.append("t", title);

    return this.fetch("", searchParams);
  }

  search(title: string, page: number = 1) {
    const searchParams = new URLSearchParams();

    searchParams.append("s", title);
    searchParams.append("p", page.toString());

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
