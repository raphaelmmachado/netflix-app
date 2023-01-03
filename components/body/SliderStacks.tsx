import { IRequests } from "../../typing";
import MovieSlider from "../MovieSlider";
interface Props {
  requests: IRequests;
}
export default function SliderStacks({ requests }: Props) {
  return (
    <>
      <MovieSlider
        movies={requests.trendingNow}
        poster={true}
        title="Trending now"
        background={true}
      />
      <MovieSlider
        movies={requests.trendingSeries}
        poster={true}
        title="Trending series"
        background={true}
      />
      <MovieSlider
        movies={requests.topRated}
        poster
        title="Top rated"
        background
      />
      <MovieSlider
        movies={requests.comedyMovies}
        poster={true}
        title="Comedy movies"
        background={true}
      />
      <MovieSlider
        movies={requests.horrorMovies}
        poster={true}
        title="Horror movies"
        background={true}
      />
      <MovieSlider
        movies={requests.actionMovies}
        poster={true}
        title="Action movies"
        background={true}
      />
      <MovieSlider
        movies={requests.romanceMovies}
        poster={true}
        title="Romance movies"
        background={true}
      />
      <MovieSlider
        movies={requests.documentaries}
        poster={true}
        title="Documentaries"
        background={true}
      />
    </>
  );
}
