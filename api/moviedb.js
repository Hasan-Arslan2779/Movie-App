import axios from "axios";
import { apiKey } from "../constant";

// endpoint
const baseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndPoint = `${baseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndPoint = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndPoint = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint = `${baseUrl}/search/movie?api_key=${apiKey}`;

// dynamic endpoints
const movieDetailsEndPoint = (id) => `${baseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndPoint = (id) =>
  `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMovieEndPoint = (id) =>
  `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`;

// Perso Screen Api
const personDetailsEndPoint = (id) =>
  `${baseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndPoint = (id) =>
  `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndPoint);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndPoint);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndPoint);
};
// Burada Kaldım 1:11:36 saniye
export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndPoint(id));
};
export const fetchMovieCredit = (id) => {
  return apiCall(movieCreditsEndPoint(id));
};
export const fetchSimilarMovies = (id) => {
  return apiCall(similarMovieEndPoint(id));
};

export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndPoint(id));
};

export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEndPoint(id));
};

export const searchMovies = (params) => {
  return apiCall(searchMoviesEndpoint, params);
};
