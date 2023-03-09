// function to add media to list context
import { Dispatch, SetStateAction } from "react";
import { Media } from "../typing";

const handleAddToList = (
  media: Media,
  myList: Media[],
  setMyList: Dispatch<SetStateAction<Media[]>>
) => {
  if (myList.some((item) => item.id === media.id)) {
    setMyList((prevList: Media[]) =>
      [...prevList].filter((item) => item.id !== media.id)
    );
  } else {
    setMyList((prevList: Media[]) => [...prevList, media]);
  }
};

export default handleAddToList;
