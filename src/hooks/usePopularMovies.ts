import { useInfiniteQuery } from '@tanstack/react-query';
import { getPopularMovies } from '../services/api';
import { MovieResponse } from '../types/movie';

export const usePopularMovies = () => {
  return useInfiniteQuery<MovieResponse>({
    queryKey: ['popularMovies'],
    queryFn: ({ pageParam }) => getPopularMovies(pageParam as number),
    getNextPageParam: (lastPage) => 
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });
};