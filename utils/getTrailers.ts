import { getSecret } from "./getSecret";
const BASE_URL = "https://api.themoviedb.org/3";
import axios from "axios";
import { Movie } from "../typing";

// https://api.themoviedb.org/3/tv/{tv_id}/videos?api_key=<<api_key>>&language=pt-BR
// https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=pt-BR

interface Props {
  selectedMovie: Movie;
  mediaType?: "tv" | "movie";
}

export default async function getTrailers({ mediaType, selectedMovie }: Props) {
  try {
    const { secret } = await getSecret().then((res) => res);
    const { data, status, statusText } = await axios
      .get(
        `${BASE_URL}/${!mediaType ? selectedMovie.media_type : mediaType}/${
          selectedMovie.id
        }/videos?api_key=${secret}&language=pt-BR`
      )
      .then((res) => res);
    if (status !== 200) console.warn(statusText);

    return data;
  } catch (e) {
    return console.error(e);
  }
}
