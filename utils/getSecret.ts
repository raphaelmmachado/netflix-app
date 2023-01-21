const base_url = "https://api.themoviedb.org/3/movie/";
const getSecret = async () => {
  const res = await fetch("api/requestSecret");
  const data = await res.json();
  return data;
};
const getYTAPIsecret = async () => {
  const res = await fetch("api/ytapisecret");
  const data = await res.json();
  return data;
};

export { getSecret, getYTAPIsecret, base_url };
