import { useContext } from "react";
import useList from "../../hooks/useList";
import { Context } from "../../context/ContextProvider";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";
import addMovieToList from "../../utils/addMediaToList";
import { Media } from "../../typing";

interface Props {
  media: Media;
}
export default function PlayButton({ media }: Props) {
  const { myList, setMyList } = useContext(Context);
  const { writeUserList } = useList();
  const added = myList && myList.some((item) => item.id === media.id);

  return (
    <div
      onClick={() => {
        addMovieToList(media, myList, setMyList);
        writeUserList();
      }}
      className={`${
        added ? "bg-def_gray-400" : "bg-black"
      } rounded-full absolute w-10 h-10
     flex items-center justify-center -top-4 -right-4 border-2 border-gray hover:cursor-pointer`}
    >
      {added ? (
        <CheckIcon
          className={`w-5 h-5 ${added ? "text-black" : "text-white"}`}
        />
      ) : (
        <PlusIcon
          className={`w-5 h-5 ${added ? "text-black" : "text-white"}`}
        />
      )}
    </div>
  );
}
