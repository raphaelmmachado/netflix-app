interface IComponents {
  [0]: Media[];
  [1]: string;
  [2]?: "tv" | "movie";
}
[];

export interface Media {
  adult: boolean;
  backdrop_path: string | null;
  poster_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  release_date: string;
  title: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  media_type?: string;
  trailer?: IVideo[];
  profile_path?: string | null;
  first_air_date?: Date | string;
  origin_country?: string[];
  original_name?: string;
}
export interface Person {
  profile_path: string | null;
  adult?: boolean;
  id: number;
  media_type?: "person";
  name: string;
  popularity?: number;
  known_for?: Media[];
}
interface Actor {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string | null;
}
// ChatGPT 😂
// prompt: you are a fronend dev. give me an interface of all possivble response for cast property "know for department"
// ele vai criar uma lista então só pedi pra ele criar uma interface typescript

interface KnownForDepartment {
  Acting: string;
  Directing: string;
  Writing: string;
  Producing: string;
  Cinematography: string;
  Editing: string;
  Sound: string;
  ArtDirection: string;
  CostumeDesign: string;
  Makeup: string;
  SpecialEffects: string;
  VisualEffects: string;
  Stunts: string;
  SecondUnitDirecting: string;
  CameraAndElectricalDepartment: string;
  MusicDepartment: string;
  Animation: string;
  Casting: string;
  ProductionManagement: string;
  ArtDepartment: string;
}
export interface Genre {
  id: number;
  name: string;
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
}

interface IRequests {
  apiConfiguration?: string;
  trendingNow: Media[];
  topRatedMovies: Media[];
  comedyMovies: Media[];
  horrorMovies: Media[];
  topRatedSeries: Media[];
  brazilianMovies: Media[];
  actionMovies: Media[];
}

interface IProvider {
  children: JSX.Element | JSX.Element[] | ReactNode;
}
interface IContext {
  selectedMedia: Media | undefined;
  setSelectedMedia: Dispatch<SetStateAction<Media>>;
  showVideoModal: boolean;
  setShowVideoModal: Dispatch<SetStateAction<boolean>>;
  myList: Media[];
  setMyList: Dispatch<SetStateAction<Media[]>>;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}
type MediaType = "movie" | "tv";

type MediaDetails = MovieDetails & SerieDetails;
export interface MovieDetails extends SerieDetails {
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
  genre_ids?: number[];
  trailer?: IVideo[];
}

export interface Genre {
  id: number;
  name: string;
}
interface IDs {
  [key: string | number]: {
    name: string;
    id: number;
    slug: string;
  };
}
interface Slug {
  [key: string]: {
    id: number;
    name: string;
    slug?: string;
  };
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

interface SessionID {
  success: boolean;
  guest_session_id: string;
  expires_at: Date | string;
}
interface GuestSessionIDRequest {
  data: SessionID;
  status: boolean;
  statusText: string;
}
interface TokenRequest {
  data: Token;
  status: number;
  statusText: string;
}
interface Token {
  success: boolean;
  request_token: string;
  expires_at: string | Date;
}
interface Langs {
  [key: string]: string;
}
export interface SerieDetails extends MovieDetails {
  backdrop_path: string;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air: null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Network[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface Genre {
  id: number;
  name: string;
}
export interface MediaCredits {
  cast: MediaCast[];
  crew: MediaCrew[];
}
export interface MediaCast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id?: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface MovieCrew {
  adult?: boolean;
  gender?: number | null;
  id?: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string | null;
  credit_id?: string;
  department?: string;
  job?: string;
}
export interface LastEpisodeToAir {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Network {
  name: string;
  id: number;
  logo_path: null | string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
export interface WatchProvider {
  link: string;
  rent?: {
    display_priority: number;
    logo_path: string;
    provider_id: number;
    provider_name: string;
  }[];
  buy?: {
    display_priority: number;
    logo_path: string;
    provider_id: number;
    provider_name: string;
  }[];
  flatrate?: {
    display_priority: number;
    logo_path: string;
    provider_id: number;
    provider_name: string;
  }[];
}
