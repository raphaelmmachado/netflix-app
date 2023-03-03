const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const requests = {
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&region=BR&include_image_language=pt&with_genres=28&include_video=true&page=1`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&region=BR&include_image_language=pt&with_genres=35&include_video=true&certification_country=BR&certification=16&page=1`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&region=BR&include_image_language=pt&with_genres=27&include_video=true&page=1`,
  fecthRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&region=BR&include_image_language=pt&with_genres=10749&include_video=true`,
  fetchBrazilianMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&region=BR&include_image_language=pt&sort_by=popularity.desc&certification_country=BR&certification=16&include_adult=false&include_video=true&page=1&without_genres=99&with_original_language=pt&with_watch_monetization_types=flatrate`,
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&region=BR&language=pt-BR`,
  fetchTopRatedSeries: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=pt-BR&region=BR&page=1&include_image_language=pt&include_video=true`,
  fecthTopRatedMovies: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&region=BR&include_image_language=pt&language=pt-BR`,
};

export { requests, BASE_URL };
