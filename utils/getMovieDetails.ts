import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
interface Props {
  mediaType: "tv" | "movie";
  id?: number | string | string[];
}
export default async function getMovieDetails({ id, mediaType }: Props) {
  try {
    const { data, status, statusText } = await axios
      .get(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&language=pt-BR`)
      .then((res) => res);

    if (status !== 200) console.warn(statusText);

    return data;
  } catch (err) {
    console.log(err);
  }
}
