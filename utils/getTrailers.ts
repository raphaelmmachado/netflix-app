import { getSecret } from "./getSecret";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";
import axios from "axios";

// https://api.themoviedb.org/3/tv/{tv_id}/videos?api_key=<<api_key>>&language=pt-BR
// https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=pt-BR

interface Props {
  mediaType?: "tv" | "movie";
  type: string | boolean | undefined;
  id: number | string;
}

export async function getTrailers({ mediaType, type, id }: Props) {
  try {
    const { secret } = await getSecret().then((res) => res);
    const { data, status, statusText } = await axios
      .get(
        `${BASE_URL}/${
          !mediaType ? type : mediaType
        }/${id}/videos?api_key=${secret}&language=pt-BR`
      )
      .then((res) => res);

    if (status !== 200) console.warn("Failed to get trailers");

    return data;
  } catch (e) {
    return console.warn("Failed to get trailers");
  }
}
export async function getServerSideTrailers({ mediaType, type, id }: Props) {
  try {
    const { data, status, statusText } = await axios
      .get(
        `${BASE_URL}/${
          !mediaType ? type : mediaType
        }/${id}/videos?api_key=${API_KEY}&language=pt-BR`
      )
      .then((res) => res);

    if (status !== 200) console.warn("Failed to get trailers");

    return data;
  } catch (e) {
    return console.error("Failed to get trailers");
  }
}
