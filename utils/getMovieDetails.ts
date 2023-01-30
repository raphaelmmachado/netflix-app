import axios from "axios";
import { Movie } from "../typing";
import { getSecret } from "./getSecret";
const BASE_URL = "https://api.themoviedb.org/3";

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
// https://api.themoviedb.org/3/tv/{tv_id}?api_key=<<api_key>>&language=en-US
interface Props {
  mediaType?: "tv" | "movie";
  selectedMovie: Movie;
}
export default async function getMovieDetails({
  selectedMovie,
  mediaType,
}: Props) {
  try {
    const { secret } = await getSecret().then((res) => res);
    const { data, status, statusText } = await axios
      .get(
        `${BASE_URL}/${!mediaType ? selectedMovie.media_type : mediaType}/${
          selectedMovie.id
        }?api_key=${secret}&language=pt-BR`
      )
      .then((res) => res);

    if (status !== 200) console.warn(statusText);

    return data;
  } catch (err) {
    console.log(err);
  }
}
