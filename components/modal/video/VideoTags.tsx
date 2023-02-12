import SpeakerWaveIcon from "@heroicons/react/20/solid/SpeakerWaveIcon";
import { Context } from "../../../context/ContextProvider";
import { useContext } from "react";
import { movieGenres, tvGenres } from "../../../constants/genres";

import mostSpokenLanguages from "../../../constants/mostSpokenLanguages";
const langs = mostSpokenLanguages;
interface Props {
  mediaType?: "tv" | "movie";
}
export default function VideoTags({ mediaType }: Props) {
  const { selectedMedia } = useContext(Context);
  return (
    <>
      {" "}
      <div className="flex gap-1 place-self-center">
        {selectedMedia?.original_language && (
          <span className="flex items-center gap-1 bg-midgray w-fit font-thin text-sm  px-2 rounded-md ">
            <SpeakerWaveIcon className="text-white w-5 h-5" />{" "}
            {langs[selectedMedia.original_language]}
          </span>
        )}

        {selectedMedia?.release_date && (
          <span className="bg-midgray w-fit font-thin text-sm  p-1 rounded-md">
            {selectedMedia?.release_date.substring(0, 4)}
          </span>
        )}
        {selectedMedia?.first_air_date && (
          <span className="bg-midgray w-fit font-thin text-sm   p-1 rounded-md">
            {selectedMedia?.first_air_date.toString().substring(0, 4)}
          </span>
        )}
        {selectedMedia?.genre_ids &&
          selectedMedia.genre_ids.map((genre, i) => (
            <span
              key={i}
              className="bg-midgray w-fit font-thin text-sm  p-1 rounded-md"
            >
              {mediaType === "movie"
                ? movieGenres[genre].name
                : tvGenres[genre].name}
            </span>
          ))}
      </div>
    </>
  );
}
