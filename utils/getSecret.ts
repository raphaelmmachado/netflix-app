import axios from "axios";

const base_url = "https://api.themoviedb.org/3/movie/";

const getSecret = async () => {
  const fetch = axios.create({ baseURL: "/" });
  const { data } = await fetch("api/requestSecret");
  return data;
};
const getYTAPIsecret = async () => {
  const fetch = axios.create({ baseURL: "/" });
  const { data } = await fetch("api/ytapisecret");
  return data;
};

export { getSecret, getYTAPIsecret, base_url };
