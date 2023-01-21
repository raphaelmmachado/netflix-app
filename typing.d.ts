export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  poster_path: string | null;
  adult: boolean;
  id: number;
  name?: string;
  title: string;
  overview: string;
  backdrop_path: string | null;
  genre_ids: number[];
  video?: boolean;
  trailer: IVideo[];
  media_type?: boolean | string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  release_date: string;
  first_air_date?: Date | string;
  original_language: string;
  original_title: string;
  origin_country?: string[];
  original_name?: string;
}

interface IVideoRequest {
  id: string | number;
  results: IVideo[];
}
interface BadRequest {
  success: boolean;
  status_message: string;
  status_code: number;
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
  published_at?: string | Date;
  id: number;
}
interface YTitems {
  items: YTIds[];
}
interface YTIds {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      height: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent?: string;
    publishTime: string | Date;
  };
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

interface IProvider {
  children: JSX.Element | JSX.Element[] | ReactNode;
}
interface IContext {
  liked: number[];
  setLiked: Dispatch<SetStateAction<number[]>>;
  disliked: number[];
  setDisliked: Dispatch<SetStateAction<number[]>>;
  myList: Movie[];
  setMyList: Dispatch<SetStateAction<Movie[]>>;
}

interface IComponents {
  [0]: Movie[];
  [1]: string;
  [2]?: "tv" | "movie";
}
[];

export interface IMovie {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | {};
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}
