import { IRequests } from "../../typing";
import MovieScroller from "../slider/MovieScroller";
interface Props {
  requests: IRequests;
}
export default function SliderStacks({ requests }: Props) {
  return (
    <>
      <MovieScroller
        movies={requests.trendingNow}
        poster={true}
        title="Trending now"
        background={true}
      />
      <MovieScroller
        movies={requests.trendingSeries}
        poster={true}
        title="Trending series"
        background={true}
      />
      <MovieScroller
        movies={requests.topRated}
        poster
        title="Top rated"
        background
      />
      <MovieScroller
        movies={requests.comedyMovies}
        poster={true}
        title="Comedy movies"
        background={true}
      />
      <MovieScroller
        movies={requests.horrorMovies}
        poster={true}
        title="Horror movies"
        background={true}
      />
      <MovieScroller
        movies={requests.actionMovies}
        poster={true}
        title="Action movies"
        background={true}
      />
    </>
  );
}
