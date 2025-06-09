import { Config } from 'react-native-config';
import { QueryClient } from '@tanstack/react-query';
import { MovieDetails, MovieResponse } from '../types/interfaces';
import { DEFAULT_LANGUAGE } from '../constants/language';
import { ENDPOINTS } from '../constants/endpoints';

const API_KEY = Config.TMDB_API_KEY || '';
const BASE_URL = 'https://api.themoviedb.org/3';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

// Generic function to fetch data from TMDB API
const fetchFromAPI = async <T>(endpoint: string, params: Record<string, string> = {}): Promise<T> => {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    language: DEFAULT_LANGUAGE,
    ...params,
  });

  try {
    const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Fetch failed: ${(error as Error).message}`);
  }
};

// Fetch movie details
export const getMovieDetails = (movieId: number): Promise<MovieDetails> => {
  return fetchFromAPI(ENDPOINTS.movieDetails(movieId), { append_to_response: 'credits' });
};

// Fetch popular movies with pagination
export const getAllMovies = (page = 1): Promise<MovieResponse> => {
  return fetchFromAPI(ENDPOINTS.popularMovies, { page: page.toString() });
};


// Fetches a single page or all pages of popular movies from TMDB.
export const getAllPopularMovies = async (maxPages = 10): Promise<MovieResponse> => {
  const allResults = [];
  const seenIds = new Set<number>();
  let totalPages = 1;
  let totalResults = 0;

  for (let page = 1; page <= maxPages; page++) {
    const response = await getAllMovies(page);

    const uniqueResults = response.results.filter(movie => {
      if (seenIds.has(movie.id)) {
        return false;
      }
      seenIds.add(movie.id);
      return true;
    });

    allResults.push(...uniqueResults);
    totalPages = response.total_pages;
    totalResults = response.total_results;

    if (page >= totalPages) {break;}
  }

    return {
    page: 1,
    results: allResults,
    total_pages: totalPages,
    total_results: totalResults,
  };
};
