import {Review} from '../types';
import * as config from '../config.json';

const createReviewsOfMovieQuery = (movieid: number) => `query {
  reviewsOfMovie(movieid:${movieid}) {
    id
    text
    numstars
    username
  }
}`;

export const getReviewsOfMovie = (movieid: number): Promise<Review[]> => {
  const body = {
    query: createReviewsOfMovieQuery(movieid),
  };
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(body),
  };
  return fetch(config.gqlPath, options)
    .then((res: Response) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Response not ok');
    })
    .then((json: any) => json.data.reviewsOfMovie);
};

const createCreateReviewMutation = (
  movieid: number,
  text: string,
  numstars: number,
  username: string,
) => `mutation {
  createReview(movieid:${movieid},text:"${text}",numstars:${numstars},username:"${username}")
}`;

export const createReview = (
  movieid: number,
  text: string,
  numstars: number,
  username: string,
): Promise<boolean> => {
  const body = {
    query: createCreateReviewMutation(movieid, text, numstars, username),
  };
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(body),
  };
  return fetch(config.gqlPath, options)
    .then((res: Response) => {
      console.log(res);
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Response not ok');
    })
    .then((json: any) => json.data.createReview);
};

const createUnapprovedReviewsQuery = () => `query {
  unapprovedReviews {
    id
    movieid
    text
    numstars
    username
  }
}`;

export const getUnapprovedReviews = (): Promise<Review[]> => {
  const body = {
    query: createUnapprovedReviewsQuery(),
  };
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(body),
  };
  return fetch(config.gqlPath, options)
    .then((res: Response) => {
      console.log(res);
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Response not ok');
    })
    .then((json: any) => json.data.unapprovedReviews);
};

const createApproveReviewMutation = (id: string) => `mutation {
  approveReview(id:"${id}")
}`;

export const approveReview = (id: string): Promise<boolean> => {
  const body = {
    query: createApproveReviewMutation(id),
  };
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(body),
  };
  return fetch(config.gqlPath, options)
    .then((res: Response) => {
      console.log(res);
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Response not ok');
    })
    .then((json: any) => json.data.approveReview);
};
