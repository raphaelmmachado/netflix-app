import { Movie } from "../typing";

const checkIfHasDate = (selectedMovie: Movie) => {
  if (
    Object.hasOwn(selectedMovie, "release_date") ||
    "release_date" in selectedMovie ||
    selectedMovie["release_date"]
  ) {
    return true;
  } else {
    return false;
  }
};

export default checkIfHasDate;
