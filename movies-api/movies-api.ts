
class MoviesAPI {
    BASE_URL = "http://www.omdbapi.com/";

    private fetch(url: string, options?: RequestInit) {

        let urlString = this.BASE_URL + url;
        let reqUrl = new URL(urlString);

        if (reqUrl.searchParams.size <= 0) {
           urlString += "?";
        } else {
           urlString += "&";
        }

        urlString += "apiKey=" + process.env.NEXT_PUBLIC_MOVIES_API_KEY;

        return fetch(urlString, options);
    }

    searchByTitle(title: string) {
        return this.fetch("?t=" + title);
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
