import { useCallback, useEffect, useState } from 'react';
import { queryClient } from '../services/api';
import { useAllMovies } from '../hooks/useAllMovies';
import { useMoviesFilter } from '../hooks/useMoviesFilter';
import { Movie } from '../types/interfaces';

export const useHome = () => {
  const allMoviesQueryPaginated = useAllMovies();
  const {
    filterLetter,
    setFilterLetter,
    allMoviesQuery,
    getMoviesByLetter,
  } = useMoviesFilter();

  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [isLoadingFilter, setIsLoadingFilter] = useState(false);

const handleFilterSubmit = useCallback(async () => {
  if (!filterLetter.trim()) {return;}

  setIsFiltering(true);
  setIsLoadingFilter(true);
  setFilteredMovies([]);

  try {
    const movies = await getMoviesByLetter(filterLetter);
    setFilteredMovies(movies);
  } catch (error) {
    console.error('Error filtering movies:', error);
  } finally {
    setIsLoadingFilter(false);
  }
}, [filterLetter, getMoviesByLetter]);

useEffect(() => {
  if (filterLetter) {
    handleFilterSubmit();
  }
}, [filterLetter, handleFilterSubmit]);

  const handleClearFilter = async () => {
    setFilterLetter('');
    setIsFiltering(false);
    setFilteredMovies([]);
    setIsLoadingFilter(false);

    await queryClient.invalidateQueries({ queryKey: ['allMovies'] });
  };

  const isLoading = allMoviesQueryPaginated.isLoading || isLoadingFilter || allMoviesQuery.isLoading;
  const isError = allMoviesQueryPaginated.isError || allMoviesQuery.isError;
  const movies = isFiltering
    ? filteredMovies
    : allMoviesQueryPaginated.data?.pages.flatMap(page => page.results) || [];
  const isEmpty = movies.length === 0 && !isLoading;

  return {
    filterLetter,
    setFilterLetter,
    handleFilterSubmit,
    handleClearFilter,
    isFiltering,
    filteredMovies,
    isLoading,
    isError,
    movies,
    isEmpty,
    hasNextPage: allMoviesQueryPaginated.hasNextPage,
    fetchNextPage: allMoviesQueryPaginated.fetchNextPage,
  };
};
