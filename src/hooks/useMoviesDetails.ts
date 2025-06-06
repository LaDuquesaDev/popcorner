import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../services/api";

export const useMovieDetails = (movieId: number) => {
    return useQuery({
      queryKey: ['movieDetails', movieId],
      queryFn: () => getMovieDetails(movieId),
    });
  };