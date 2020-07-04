import http from "./http-service";
import { baseApiUrl } from "../config.json";

const apiUrl = baseApiUrl + "genres/";
const genreUrl = id => `${apiUrl}/${id}`;

export function getGenres() {
  return http.get(apiUrl);
}

export function getGenre(id) {
  return http.get(genreUrl(id));
}

export default {
  getGenre,
  getGenres,
};