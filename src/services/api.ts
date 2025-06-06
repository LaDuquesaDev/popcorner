import { Config } from 'react-native-config';
import { QueryClient } from '@tanstack/react-query';
import { Movie, MovieDetails, MovieResponse } from '../types/movie';

const API_KEY = Config.TMDB_API_KEY || '';
const BASE_URL = 'https://api.themoviedb.org/3';

console.log('API KEY', API_KEY);


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      retry: 1,
    },
  },
});

const fetchFromAPI = async <T>(endpoint: string, params: Record<string, string> = {}): Promise<T> => {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'es-ES',
    ...params,
  });

  const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`);
  
  if (!response.ok) {
    throw new Error(`Error en la API: ${response.status}`);
  }
  
  return response.json();
};

export const getPopularMovies = (page = 1): Promise<MovieResponse> => {
  return fetchFromAPI('/movie/popular', { page: page.toString() });
};

export const getMovieDetails = (movieId: number): Promise<MovieDetails> => {
  return fetchFromAPI(`/movie/${movieId}`, { append_to_response: 'credits' });
};

export const searchMoviesByLetter = (letter: string, page = 1): Promise<MovieResponse> => {
  return fetchFromAPI('/search/movie', { 
    query: `^${letter}`, 
    page: page.toString() 
  });
};