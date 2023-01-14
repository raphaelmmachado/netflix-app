import { IVideoRequest, Movie } from "../typing";
import { getSecret } from "./getSecret";
import { BASE_URL } from "./requests";

const getVideo = async (selectedMovie: Movie) => {
  try {
    const { secret } = await getSecret().then((res) => res);

    const [tv, movie] = await Promise.all([
      fetch(
        `${BASE_URL}/tv/${selectedMovie.id}/videos?api_key=${secret}&language=pt-BR`
      ),
      fetch(
        `${BASE_URL}/movie/${selectedMovie.id}/videos?api_key=${secret}&language=pt-BR`
      ),
    ]);

    const seriesTrailer: IVideoRequest = await tv.json();
    const movieTrailer: IVideoRequest = await movie.json();
    if (
      Object.hasOwn(seriesTrailer, "results") &&
      seriesTrailer.results.length > 0 &&
      seriesTrailer.results.map((item) =>
        item.name.includes(selectedMovie.title ?? selectedMovie.name)
      )
    )
      return seriesTrailer;
    if (
      Object.hasOwn(movieTrailer, "results") &&
      seriesTrailer.results.length > 0 &&
      movieTrailer.results.map((item) =>
        item.name.includes(selectedMovie.title ?? selectedMovie.name)
      )
    ) {
      return movieTrailer;
    }
  } catch (e) {
    console.error(e);
  }
};
export default getVideo;
