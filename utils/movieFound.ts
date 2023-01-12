import { Movie } from "../typing";

const movieFound = (selectedMovie: Movie) => {
  if (!selectedMovie.trailer["results"]) {
    return false;
  } else if (
    selectedMovie.trailer["results"] &&
    selectedMovie.trailer["results"].length < 1
  ) {
    return false;
  } else {
    return true;
  }
};

export default movieFound;
