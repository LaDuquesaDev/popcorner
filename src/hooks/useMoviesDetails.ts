import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from '../services/api';
import { Cast, MovieDetails } from '../types/interfaces';

interface MovieDetailsProps {
  data?: MovieDetails;
  isLoading: boolean;
  isError: boolean;
  smartCast: Cast[];
}

export const useMovieDetails = (movieId: number): MovieDetailsProps => {
const { data, isLoading, isError } = useQuery({
    queryKey: ['movieDetails', movieId],
    queryFn: () => getMovieDetails(movieId),
  });

  const cast = data?.credits?.cast || [];

  // Filter cast with profile photo
  const castWithPhoto = cast.filter(actor => actor.profile_path);

  // Extract N actors by gender (1: female, 2: male)
  const extractActorsByGender = (list: Cast[], gender: number, count: number) =>
    list.filter(actor => actor.gender === gender).slice(0, count);

  const women = extractActorsByGender(castWithPhoto, 1, 3);
  const men = extractActorsByGender(castWithPhoto, 2, 3);

  // Mix alternating women and men
  const mixed: Cast[] = [];
  for (let i = 0; i < 3; i++) {
    if (women[i]) {mixed.push(women[i]);}
    if (men[i]) {mixed.push(men[i]);}
  }

  // Fill up to 10 with remaining actors without repeating
  const usedIds = new Set(mixed.map(a => a.id));
  const remaining = castWithPhoto.filter(actor => !usedIds.has(actor.id)).slice(0, 10 - mixed.length);

  const smartCast = [...mixed, ...remaining];

  return { data, isLoading, isError, smartCast };
};
