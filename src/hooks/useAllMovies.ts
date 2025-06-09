import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllMovies } from '../services/api';
import { MovieResponse } from '../types/interfaces';

export const useAllMovies = () => {
  return useInfiniteQuery<MovieResponse>({
    queryKey: ['popularMovies'],
    queryFn: ({ pageParam }) => getAllMovies(pageParam as number),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });
};
