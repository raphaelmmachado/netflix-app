const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const requests = {
  fetchImages: `${BASE_URL}/configuration?api_key${API_KEY}`,
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=pt-BR`,
  fetchNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-B&with_networks=213`,
  fecthTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=pt-BR`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=27`,
  fecthRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=99`,
  fetchDiscoverMovie: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`,
  fetchTrendingSeries: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=pt-BR&page=1`,
  fetchPopularMovies: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`,
};
const dinamicRequests = (movie_id: string | number) => {
  return {
    url: `${BASE_URL}/movie/${movie_id}/videos?api_key=${API_KEY}&language=pt-BR`,
  };
};
export { requests, dinamicRequests };
