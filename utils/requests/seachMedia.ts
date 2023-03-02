import axios from "axios";
import { Media } from "../../typing";
import { getSecret } from "./getSecret";

interface Results {
  data: {
    page: number;
    results: Media[];
    total_pages: number;
    total_results: number;
  };
}
interface Props {
  query: string;
  mediaType: "tv" | "movie";
}
const BASE_URL = "https://api.themoviedb.org/3/search/";
export async function searchMedia({ query, mediaType }: Props) {
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
export async function searchMultiMedia(query: string) {
  try {
    const { secret } = await getSecret().then((res) => res);
    const url = `${BASE_URL}multi?api_key=${secret}&language=pt-BR&query=${query}&page=1&include_adult=false`;
    const { data }: Results = await axios(url);
    const { page, results, total_pages, total_results } = data;
    return { page, results, total_pages, total_results };
  } catch (err) {
    console.error("Failed to search Media on TMDB");
  }
}
