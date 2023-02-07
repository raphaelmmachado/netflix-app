import Image from "next/image";
import { useState, useContext, useCallback } from "react";
import { Context } from "../../context/ContextProvider";
import PlayButton from "./PlayButton";
import AddToListButton from "./AddToListButton";
import { Media } from "../../typing";
import apiConfiguration from "../../constants/apiConfiguration";
import FormateDateToBR from "../../utils/formatDate";
import DetailsButton from "../home/banner/DetailsButton";

interface Props {
  media: Media;
  mediaType: "tv" | "movie";
}

export default function Card({ media, mediaType }: Props) {
  const [showButtons, setShowButtons] = useState(false);
  const { selectedMedia, setSelectedMedia, setShowVideoModal } =
    useContext(Context);
  const selectAMovie = useCallback(
    (media: Media) => {
      setSelectedMedia(media);
    },
    [selectedMedia]
  );

  const url = apiConfiguration.images.base_url;
  const posterSize = apiConfiguration.images.poster_sizes[3];

  return (
    <>
      <div
        key={media.id}
        className="relative"
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
        onFocus={() => setShowButtons(true)}
      >
        <Image
          className="rounded-sm  border-2 border-gray/20"
          src={`${url}${posterSize}/${media.poster_path}`}
          width={185}
          height={185}
          alt={media.name ?? media.original_title}
        />
        {showButtons && (
          <>
            <PlayButton
              showVideo={() => {
                selectAMovie(media);
                setShowVideoModal(true);
              }}
            />

            <AddToListButton media={media} />
            <DetailsButton
              className="rounded-full absolute flex items-center justify-center
       bg-black border-2 border-gray w-10 h-10  -top-4 -left-4 hover:cursor-pointer"
              id={media.id}
              mediaType={mediaType}
              selectedMediaType={media.media_type}
              iconType={"solid"}
            />
          </>
        )}
        <p className="absolute w-full text-center text-sm p-1 text-white/80 line-clamp-3">
          {media.title ?? media.name}
          {" · "}
          <span className="text-midgray text-sm">
            {media.release_date
              ? FormateDateToBR(media.release_date).toString().substring(6)
              : media.first_air_date &&
                FormateDateToBR(media.first_air_date).toString().substring(6)}
          </span>
          {" · "}
          <span className="text-def_green-400 text-sm">
            {media.vote_average}
          </span>
        </p>
      </div>
    </>
  );
}
