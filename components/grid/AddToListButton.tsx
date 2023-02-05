import { Context } from "../../context/ContextProvider";
import { useContext } from "react";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";
import { Media } from "../../typing";
import addMovieToList from "../../utils/addMediaToList";

interface Props {
  media: Media;
}
export default function PlayButton({ media }: Props) {
  const { myList, setMyList } = useContext(Context);
  const added = myList && myList.some((item) => item.id === media.id);

  return (
    <div
      onClick={() => addMovieToList(media, myList, setMyList)}
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
