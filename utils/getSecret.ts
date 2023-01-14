const getSecret = async () => {
  const res = await fetch("api/requestSecret");
  const data = await res.json();
  return data;
};
const base_url = "https://api.themoviedb.org/3/movie/";

export { getSecret, base_url };
