export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface DateRange {
  maximum: string;
  minimum: string;
}

export interface MovieRequest {
  results: Movie[];
  page: number;
  total_results: number;
  dates: DateRange;
  total_pages: number;
}

export interface Review {
  id: string;
  movieid: number;
  text: string;
  numstars: number;
  username: string;
}

export type fetchStatus = 'idle' | 'pending' | 'error' | 'success';
