class MovieAPIError {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

interface MovieAPIPrimaryImageCaption {
  plainText: string;
  _typename: string;
}
  
interface MovieAPIPrimaryImage {
  id: string;
  width: number;
  height: number;
  url: string;
  caption: MovieAPIPrimaryImageCaption;
  _typename: string;
}

interface MovieAPITitleType {
  text: string;
  id: string;
  isSeries: boolean;
  isEpisode: boolean;
  __typename: string;
}

interface MovieAPITitleText {
  text: string;
  __typename: string;
}

interface MovieAPIReleaseYear {
  year: number;
  __typename: string;
}

interface MovieAPIReleaseDate {
  year: number;
  month: number;
  day: number;
  __typename: string;
}

interface MovieAPIMovie {
  _id: string;
  id: string;
  primaryImage: MovieAPIPrimaryImage;
  titleType: MovieAPITitleType;
  titleText: MovieAPITitleText;
  originalTitleText: MovieAPITitleText;
  releaseYear: MovieAPIReleaseYear;
  releaseDate: MovieAPIReleaseDate;
}

interface MovieAPIRating {
  tconst: string;
  averageRating: number;
  numVotes: number;
}

interface MovieAPIPaginatedRes<T> {
  page: number;
  next: string; // url
  entries: number;
  results: T[]
}

class MoviesAPI {
  BASE_URL = process.env.NEXT_PUBLIC_MOVIES_API_URL || "";

  private fetch(url: string, options?: RequestInit) {
    let urlString = this.BASE_URL + url;
    options = options ? options : {};

    const headers = new Headers();
    headers.append("X-RapidAPI-Key", process.env.NEXT_PUBLIC_MOVIES_API_KEY || "");
    headers.append("X-RapidAPI-Host", "moviesdatabase.p.rapidapi.com");

    options.headers = headers;

    return fetch(urlString, options); 
  }

  async searchByTitle(title: string): Promise<MovieAPIPaginatedRes<MovieAPIMovie>> {
    try {
      const body = { titleType: "movie" };
      const response = await this.fetch("/titles/search/title/" + title, { body: JSON.stringify(body) });
      const data = await response.json() as MovieAPIPaginatedRes<MovieAPIMovie>;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(new MovieAPIError("Failed to search movies"));
    }
  }

  async rating(imdbId: string): Promise<MovieAPIRating> {
    try {
      const response = await this.fetch("/titles/" + imdbId + "/ratings");
      const data = await response.json() as MovieAPIRating;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(new MovieAPIError("Failed to search movies"));
    }
  }
  
}

let movieAPIInstance: MoviesAPI | null = null

function getMoviesAPISingleton() {
  if (!movieAPIInstance) {
    return new MoviesAPI()
  }

  return movieAPIInstance
}

export { 
  getMoviesAPISingleton, 
  MovieAPIError,
};

export type {
  MovieAPIPrimaryImageCaption,
  MovieAPIPrimaryImage,
  MovieAPITitleType,
  MovieAPITitleText,
  MovieAPIReleaseYear,
  MovieAPIReleaseDate,
  MovieAPIMovie,
  MovieAPIPaginatedRes,
  MovieAPIRating,
}
