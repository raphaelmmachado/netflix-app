// MY INTERFACE FOR FETCHING DATA
export interface DataProps {
  trending: Trending;
}
export interface ITrendingComp {
  results: Result[];
}
export interface IMovieSlider {
  results: Result[];
  poster?: string;
}

// INTERFACES GENERATED FROM JSON OBJECT
export interface Trending {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult?: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
  original_title?: string;
  overview: string;
  poster_path: string;
  release_date?: Date;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  popularity: number;
  first_air_date?: Date;
  name?: string;
  origin_country?: string[];
  original_name?: string;
}
export enum OriginalLanguage {
  En = "en",
  Zh = "zh",
}
