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
        autoplay={false}
      />
      <MovieSlider
        movies={requests.trendingSeries}
        poster={true}
        title="Trending series"
        autoplay={false}
        background={true}
      />
      <MovieSlider
        movies={requests.topRated}
        poster
        title="Top rated"
        autoplay={false}
        background
      />
      <MovieSlider
        movies={requests.comedyMovies}
        poster={true}
        title="Comedy movies"
        autoplay={false}
        background={true}
      />
      <MovieSlider
        movies={requests.horrorMovies}
        poster={true}
        title="Horror movies"
        autoplay={false}
        background={true}
      />
      <MovieSlider
        movies={requests.actionMovies}
        poster={true}
        title="Action movies"
        autoplay={false}
        background={true}
      />
      <MovieSlider
        movies={requests.romanceMovies}
        poster={true}
        title="Romance movies"
        autoplay={false}
        background={true}
      />
      <MovieSlider
        movies={requests.documentaries}
        poster={true}
        title="Documentaries"
        autoplay={false}
        background={true}
      />
    </>
  );
}
