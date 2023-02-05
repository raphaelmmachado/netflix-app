import { Media } from "../typing";

const checkIfHasDate = (selectedMedia: Media) => {
  if (
    Object.hasOwn(selectedMedia, "release_date") ||
    "release_date" in selectedMedia ||
    selectedMedia["release_date"]
  ) {
    return true;
  } else {
    return false;
  }
};

export default checkIfHasDate;
