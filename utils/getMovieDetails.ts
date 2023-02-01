import axios from "axios";
import { Movie } from "../typing";
import { getSecret } from "./getSecret";
const BASE_URL = "https://api.themoviedb.org/3";

interface Props {
  mediaType: "tv" | "movie";
  id?: number | string | string[];
}
export default async function getMovieDetails({ id, mediaType }: Props) {
  try {
    const { secret } = await getSecret().then((res) => res);
    const { data, status, statusText } = await axios
      .get(`${BASE_URL}/${mediaType}/${id}?api_key=${secret}&language=pt-BR`)
      .then((res) => res);

    if (status !== 200) console.warn(statusText);

    return data;
  } catch (err) {
    console.log(err);
  }
}
