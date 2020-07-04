import _ from 'lodash';
import http from "./http-service";
import { baseApiUrl } from "../config.json";
const apiUrl = baseApiUrl + "movies/";
const movieUrl = id => `${apiUrl}/${id}`;

export function getMovies() {
  return http.get(apiUrl);
}

export async function searchMovies(pageNumber, pageSize, genreId, sort, liked = [], deleted = [], query) {
  const startIndex = (pageNumber - 1) * pageSize;
  let totalCount = 0;

  const movies = await getMovies();
  const result = _
    .chain(movies)
    .filter((movie =>
      (genreId == null || genreId <= 0 || movie.genre._id === genreId) &&
      (query == null || movie.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) >= 0) &&
      (deleted.indexOf(movie) < 0))
    )
    .orderBy([sort?.path], [sort?.order])
    .tap((movies) => {
      movies.forEach(movie => { if (liked.indexOf(movie) >= 0) movie.liked = true; })
      totalCount = movies.length;
    })
    .slice(startIndex)
    .take(pageSize)
    .value();

  return {
    movies: result,
    totalCount: totalCount,
  }
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export async function saveMovie(movie) {
  if (movie._id) {
    const id = movie._id;
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(id), body);
  }
  else {
    return http.post(apiUrl, movie);
  }

}

export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}

export async function toggleLikeMovie(id) {
  const movie = await getMovie(id);
  if (movie) {
    movie.like = !movie.like;
    return await saveMovie(movie);
  }
}

export default {
  deleteMovie,
  getMovie,
  getMovies,
  saveMovie,
  searchMovies,
};