import { useCallback } from 'react';
import { getMovieDetails, getAllPopularMovies } from '../services/api';
import { Cast, Movie } from '../types/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useFilterStore } from '../store/useFilterStore';

export const useMoviesFilter = () => {
  const filterLetter = useFilterStore((state) => state.filterLetter);
  const setFilterLetter = useFilterStore((state) => state.setFilterLetter);

  // Fetch all popular movies (first 10 pages)
  const allMoviesQuery = useQuery({
    queryKey: ['allMovies'],
    queryFn: () => getAllPopularMovies(10),
    staleTime: 1000 * 60 * 10,
  });

  // Get the first relevant letter
const getFirstRelevantLetter = useCallback((title: string): string => {
  return title.trim()[0].toLowerCase();
}, []);

  // Check if the movie has a balanced cast
  const hasBalancedCast = useCallback(async (movie: Movie): Promise<boolean> => {
    try {
      const details = await getMovieDetails(movie.id);

      if (!details.genres || details.genres.length <= 2) {
        return false;
      }

      const cast = details.credits?.cast || [];
      const femaleCount = cast.filter((actor: Cast) => actor.gender === 1).length;
      const maleCount = cast.filter((actor: Cast) => actor.gender === 2).length;

      return femaleCount >= 3 && maleCount >= 3;
    } catch {
      return false;
    }
  }, []);


  // Filter movies by initial letter and validate cast balance
  const getMoviesByLetter = useCallback(async (letter: string): Promise<Movie[]> => {
    if (!letter || !allMoviesQuery.data?.results) {
      return [];
    }
    const normalizedLetter = letter.toLowerCase();

    const filtered = allMoviesQuery.data.results.filter((movie: Movie) => {
      return getFirstRelevantLetter(movie.title) === normalizedLetter;
    });

    const validatedMovies = await Promise.all(
      filtered.map(async (movie: Movie) => (await hasBalancedCast(movie)) ? movie : null)
    );

    return validatedMovies.filter((movie): movie is Movie => Boolean(movie));
  }, [allMoviesQuery.data?.results, getFirstRelevantLetter, hasBalancedCast]);

  return {
    filterLetter,
    setFilterLetter,
    allMoviesQuery,
    hasBalancedCast,
    getFirstRelevantLetter,
    getMoviesByLetter,
  };
};
