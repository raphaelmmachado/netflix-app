import { Movie } from "../typing";

const movieFound = (selectedMovie: Movie) => {
  if (!selectedMovie.trailer) {
    return false;
  } else if (selectedMovie.trailer && selectedMovie.trailer.length < 1) {
    return false;
  } else {
    return true;
  }
};

export default movieFound;
