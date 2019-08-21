import {Movie, MovieRequest} from "../types";
import * as config from '../config.json';

const getMovieRequestPath = (page: number) => {
  return `https://api.themoviedb.org/3/movie/now_playing?api_key=${config.apiKey}&page=${page}`;
}

export default function(): Promise<Movie[]> {
  return fetch(getMovieRequestPath(1))

      // Extract json from response object.
      .then((res: Response) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Response not ok");
      })

      // The json includes a field 'total_pages' with the total amount of pages
      // to query on.
      .then((json: MovieRequest) => {
        const numPages = json.total_pages;

        // If the field is not given, the response must be erroneous. Else
        // continue with all queries.
        if (!numPages) {
          return Promise.reject("Error in requesting movie data");
        } else {

          // Create an array with consecutive numbers from 1 to the total amount
          // of pages.
          const arr: number[] = Array.from(Array(numPages).keys());
          arr.shift();

          // Out of the given array, create an array with queries on all pages.
          // Every number in the array is the page to query.
          const fetchArr = arr.map((n: number) => fetch(getMovieRequestPath(n)));

          // Return a promise combining all the queries.
          return Promise.all(fetchArr);

        }
      })

      // Converting the resulting array of responses into an array of the
      // promised json documents.
      .then((res: Response[]) => {
        return Promise.all(res.map((r: Response) => r.json()));
      })

      // Extract the array of movies out of the request data and merge all to
      // get a complete list of movies.
      .then((movReqs: MovieRequest[]) => {
        return movReqs.map((mr: MovieRequest) => mr.results).flat();
      })

}