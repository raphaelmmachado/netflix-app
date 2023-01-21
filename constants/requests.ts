const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const requests = {
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
export { requests, dinamicRequests, BASE_URL };

// interface Id {
//   id: string | number;
// }

// const dinamicReqs = {
//   trending: reqTrending.results.map(async (item: Id) => {
//     const { url } = dinamicRequests(item.id);
//     return await fetch(url).then((res) => res.json());
//   }),
//   topRated: reqTopRated.results.map(async (item: Id) => {
//     const { url } = dinamicRequests(item.id);
//     return await fetch(url).then((res) => res.json());
//   }),
//   actionMovies: reqActionMovies.results.map(async (item: Id) => {
//     const { url } = dinamicRequests(item.id);
//     return await fetch(url).then((res) => res.json());
//   }),
//   comedyMovies: reqComedyMovies.results.map(async (item: Id) => {
//     const { url } = dinamicRequests(item.id);
//     return await fetch(url).then((res) => res.json());
//   }),
//   horrorMovies: reqHorrorMovies.results.map(async (item: Id) => {
//     const { url } = dinamicRequests(item.id);
//     return await fetch(url).then((res) => res.json());
//   }),
//   trendingSeries: reqTrendingSeries.results.map(async (item: Id) => {
//     const { url } = dinamicRequests(item.id);
//     return await fetch(url).then((res) => res.json());
//   }),
//   popularMovies: reqPopularMovies.results.map(async (item: Id) => {
//     const { url } = dinamicRequests(item.id);
//     return await fetch(url).then((res) => res.json());
//   }),
// };

// const trendingNowTrailers = await Promise.all(dinamicReqs.trending);
// const topRatedTrailers = await Promise.all(dinamicReqs.topRated);
// const actionMoviesTrailers = await Promise.all(dinamicReqs.actionMovies);
// const comedyMoviesTrailers = await Promise.all(dinamicReqs.comedyMovies);
// const horrorMoviesTrailers = await Promise.all(dinamicReqs.horrorMovies);
// const trendingSeriesTrailers = await Promise.all(dinamicReqs.trendingSeries);
// const popularMoviesTrailers = await Promise.all(dinamicReqs.popularMovies);

// // MERGE MOVIE INFO AND VIDEO IN ONE ARRAY
// const trendingNow = reqTrending.results.map((item: Movie, i: number) => ({
//   ...item,
//   trailer: trendingNowTrailers[i],
// }));
// const topRated = reqTopRated.results.map((item: Movie, i: number) => ({
//   ...item,
//   trailer: topRatedTrailers[i],
// }));
// const action = reqActionMovies.results.map((item: Movie, i: number) => ({
//   ...item,
//   trailer: actionMoviesTrailers[i],
// }));
// const comedy = reqComedyMovies.results.map((item: Movie, i: number) => ({
//   ...item,
//   trailer: comedyMoviesTrailers[i],
// }));
// const horror = reqHorrorMovies.results.map((item: Movie, i: number) => ({
//   ...item,
//   trailer: horrorMoviesTrailers[i],
// }));
// const series = reqTrendingSeries.results.map((item: Movie, i: number) => ({
//   ...item,
//   trailer: trendingSeriesTrailers[i],
// }));
// const popular = reqPopularMovies.results.map((item: Movie, i: number) => ({
//   ...item,
//   trailer: popularMoviesTrailers[i],
// }));
