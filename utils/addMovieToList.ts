import { Dispatch, SetStateAction } from "react";
import { Movie } from "../typing";

const handleAddToList = (
  movie: Movie,
  myList: Movie[],
  setMyList: Dispatch<SetStateAction<Movie[]>>
) => {
  if (myList.some((item) => item.id === movie.id)) {
    setMyList((prevList: Movie[]) =>
      [...prevList].filter((item) => item.id !== movie.id)
    );
  } else {
    setMyList((prevList: Movie[]) => [...prevList, movie]);
  }
};

export default handleAddToList;
