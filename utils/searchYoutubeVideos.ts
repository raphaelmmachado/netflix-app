import axios from "axios";
import { readFile } from "fs";
import { getYTAPIsecret } from "./getSecret";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const BASE_URL = "https://www.googleapis.com/youtube/v3/search?";

export async function searchYoutubeVideos(
  query: string,
  part: "id" | "snippet"
) {
  try {
    const { secret } = await getYTAPIsecret().then((res) => res);
    const { data, status, statusText } = await axios(
      `${BASE_URL}key=${secret}&q=${query}&type=video&maxResults=5&regionCode=BR&videoEmbeddable=true&part=${part}`
    ).then((res) => res);
    if (status !== 200) console.warn(statusText);
    return data.items;
  } catch (error) {
    console.error(error);
  }
}
export function searchServerSideYTVideo(query: string, part: "id" | "snippet") {
  return `${BASE_URL}key=${API_KEY}&q=${query}&type=video&maxResults=5&regionCode=BR&videoEmbeddable=true&part=${part}`;
}
