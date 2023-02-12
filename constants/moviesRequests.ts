const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
interface Props {
  page: number;
  mediaType: "tv" | "movie";
}
const movieRequests = ({ page, mediaType }: Props) => {
  return `${BASE_URL}/${mediaType}/popular?api_key=${API_KEY}&language=pt-BR&region=BR&page=${page}`;
};
export { BASE_URL, movieRequests };
