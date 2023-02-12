import axios from "axios";
import { Media, MediaType } from "../typing";
import { getSecret } from "./getSecret";

interface Props {
  query: string;
  mediaType: "tv" | "movie";
  page?: string | number;
  include_adult?: boolean;
  region?: string;
  year?: number;
  primary_release_year?: number;
}
interface Results {
  data: {
    page: number;
    results: Media[];
    total_pages: number;
    total_results: number;
  };
}
const BASE_URL = "https://api.themoviedb.org/3/search/";
export default async function searchMedia({
  query,
  page,
  include_adult,
  region,
  year,
  primary_release_year,
  mediaType,
}: Props) {
  try {
    const { secret } = await getSecret().then((res) => res);
    const url = `${BASE_URL}${mediaType}?api_key=${secret}&language=pt-BR&query=${query}&page=1&include_adult=false`;
    const { data }: Results = await axios(url);
    const { page, results, total_pages, total_results } = data;
    return { page, results, total_pages, total_results };
  } catch (err) {
    console.error("Failed to search Media on TMDB");
  }
}
