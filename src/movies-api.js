import axios from "axios";

// axios.defaults.baseURL = "https://api.themoviedb.org/3";

// const options = {
//     headers: {
//         Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTVjNmFlNmI5NmM3ZTkwNGI3OGFmMWI3YTVhYTM1NSIsIm5iZiI6MTcyMTc0NjQ5NS4wNzg4ODEsInN1YiI6IjY2OWZjMTRmZjE1NTY4YTExYjAxZjE3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SqiDHZynAZ_aUTec_GrlXF2dQUwILAtteZzx9G_54zw"
//     }
// }

// export const getMoviesTrending = async () => {
//     const response = await axios.get("/trending/movie/day", options);
//     return response.data;
// }


const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTVjNmFlNmI5NmM3ZTkwNGI3OGFmMWI3YTVhYTM1NSIsIm5iZiI6MTcyMTc0NjQ5NS4wNzg4ODEsInN1YiI6IjY2OWZjMTRmZjE1NTY4YTExYjAxZjE3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SqiDHZynAZ_aUTec_GrlXF2dQUwILAtteZzx9G_54zw';
const BASE_URL = 'https://api.themoviedb.org/3';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getMoviesTrending = async () => {
  try {
    const { data } = await instance.get('/trending/movie/day');
    return data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error.message);
    console.error('Error response:', error.response?.data || error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const { data } = await instance.get('/search/movie', {
      params: { query, include_adult: false },
    });
    if (!data.results) {
      throw new Error('Invalid data structure for search results');
    }
    return data.results;
  } catch (error) {
    console.error('Error searching movies:', error.message);
    console.error('Error response:', error.response?.data || error);
    throw error;
  }
};

export const getMoviesById = async (movieId) => {
  try {
    const { data } = await instance.get(`/movie/${movieId}`);
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    console.error('Error response:', error.response?.data || error);
    throw error;
  }
};

export const getCast = async (movieId) => {
  try {
    const { data } = await instance.get(`/movie/${movieId}/credits`);
    if (!data.cast) {
      throw new Error('Invalid data structure for movie credits');
    }
    return data.cast;
  } catch (error) {
    console.error('Error fetching movie credits:', error.message);
    console.error('Error response:', error.response?.data || error);
    throw error;
  }
};

export const getRewies = async (movieId) => {
  try {
    const { data } = await instance.get(`/movie/${movieId}/reviews`);
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    console.error('Error response:', error.response?.data || error);
    throw error;
  }
};