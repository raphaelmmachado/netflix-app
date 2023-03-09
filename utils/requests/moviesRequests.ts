const BASE_URL = "https://api.themoviedb.org/3/discover/";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
interface Props {
  page: number;
  mediaType: "tv" | "movie";
  id?: number;
}
const movieRequests = ({ page, mediaType, id }: Props) => {
  return `${BASE_URL}${mediaType}?api_key=${API_KEY}&page=${page}&${
    id !== 0 ? `with_genres=${id}` : ""
  }&language=pt-BR&include_image_language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=true&with_watch_monetization_types=flatrate`;
};
export { BASE_URL, movieRequests };
