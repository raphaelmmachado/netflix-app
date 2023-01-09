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
  adult: boolean;
  video?: boolean;
  media_type?: boolean;
  vote_average: number;
  vote_count: number;
  popularity: number;
  release_date: Date | string;
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
  romanceMovies?: Movie[];
  documentaries?: Movie[];
  discoverMovie?: Movie[];
  trendingSeries: Movie[];
  popularMovies: Movie[];
  trendingNowTrailers: IResultsTrailers[];
  netflixOriginalsTrailers: IResultsTrailers[];
  topRatedTrailers: IResultsTrailers[];
  actionMoviesTrailers: IResultsTrailers[];
  comedyMovieTrailers: IResultsTrailers[];
  horrorMovieTrailers: IResultsTrailers[];
  romanceMoviesTrailers: IResultsTrailers[];
  trendingSeriesTrailers: IResultsTrailers[];
  popularMoviesTrailers: IResultsTrailers[];
}
interface IHighCtx {
  highlighted: Movie | undefined;
  setHighlighted: (newState: Movie) => void;
}
interface IProvider {
  children: JSX.Element | JSX.Element[] | ReactNode;
}
interface IContext {
  showModal: boolean;
  setShowModal: (newState: boolean) => void;
  showInfoModal: boolean;
  setShowInfoModal: (newState: boolean) => void;
  video: IVideo | null;
  setVideo: (newVideo: IVideo | null) => void;
  selectedMovieCtx: Movie | null;
  setSelectedMovieCtx: (newMovie: Movie) => void;
}
interface IVideoRequest {
  id: string | number;
  results: IVideo[];
}

interface IVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string | Date;
  id: string;
}
