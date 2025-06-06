export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    release_date: string;
    genre_ids: number[];
    genres?: Genre[];
    vote_average: number;
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  
  export interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    gender: number;
  }
  
  export interface MovieDetails extends Movie {
    genres: Genre[];
    runtime: number;
    credits?: {
      cast: Cast[];
      crew: Crew[];
    };
  }
  
  export interface Crew {
    id: number;
    name: string;
    job: string;
    profile_path: string | null;
  }
  
  export interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }