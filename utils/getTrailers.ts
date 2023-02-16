import { getSecret } from "./getSecret";
import axios from "axios";
import { MediaType } from "../typing";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

//TODO SE DER MERDA RESTAURA ISSO AQUI
export async function getTrailers(
  id: string | number,
  type: MediaType,
  mediaType?: MediaType
) {
  try {
    const { secret } = await getSecret().then((res) => res);
    const { data, status, statusText } = await axios
      .get(
        `${BASE_URL}/${
          mediaType ?? type
        }/${id}/videos?api_key=${secret}&language=pt-BR`
      )
      .then((res) => res);

    if (status !== 200) console.warn("Failed to get trailers");

    return data;
  } catch (e) {
    return console.warn("Failed to get trailers");
  }
}
export async function getServerSideTrailers(
  id: string | number,
  mediaType: MediaType
) {
  try {
    const { data, status, statusText } = await axios
      .get(
        `${BASE_URL}/${mediaType}/${id}/videos?api_key=${API_KEY}&language=pt-BR`
      )
      .then((res) => res);

    if (status !== 200) console.warn("Failed to get trailers");

    return data;
  } catch (e) {
    return console.error("Failed to get trailers");
  }
}
