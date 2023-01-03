export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  name?: string;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  genre_ids: number[];
  adult?: boolean;
  video?: boolean;
  media_type?: boolean;
  vote_average: number;
  vote_count: number;
  popularity: number;
  release_date?: Date | string;
  first_air_date?: Date | string;
  original_language: string;
  original_title: string;
  origin_country?: string[];
  original_name?: string;
}

export interface Element {
  type:
    | "Bloopers"
    | "Featurette"
    | "Behind the Scenes"
    | "Clip"
    | "Trailer"
    | "Teaser";
}

interface IRequests {
  apiConfiguration?: string;
  trendingNow: Movie[];
  netflixOriginals: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  discoverMovie: Movie[];
  trendingSeries: Movie[];
}
interface IContext {
  highlighted: Movie;
  setHighlighted: (newState: Movie) => void;
}
interface IProvider {
  children: JSX.Element | JSX.Element[] | ReactNode;
}
