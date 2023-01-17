const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const movieRequests = {
  page1: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`,
  page2: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=2`,
  page3: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=3`,
  page4: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=4`,
};

export { BASE_URL, movieRequests };
