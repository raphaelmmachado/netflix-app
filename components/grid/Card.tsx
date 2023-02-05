import Image from "next/image";
import { useState, useContext, useCallback } from "react";
import { Context } from "../../context/ContextProvider";
import PlayButton from "./PlayButton";
import AddToListButton from "./AddToListButton";
import Details from "./Details";
import { Media } from "../../typing";
import apiConfiguration from "../../constants/apiConfiguration";

interface Props {
  media: Media;
}

export default function Card({ media }: Props) {
  const [showButtons, setShowButtons] = useState(false);
  const {
    selectedMedia,
    setSelectedMedia,
    setShowVideoModal,
    setShowInfoModal,
  } = useContext(Context);

  const url = apiConfiguration.images.base_url;
  const posterSize = apiConfiguration.images.poster_sizes[3];

  const selectAMovie = useCallback(
    (media: Media) => {
      setSelectedMedia(media);
    },
    [selectedMedia]
  );
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
            <Details
              showInfo={() => {
                selectAMovie(media);
                setShowInfoModal(true);
              }}
            />
          </>
        )}
        <p className="absolute w-full text-center text-sm p-1 text-white/80 line-clamp-3">
          {media.title ?? media.name}
          {" · "}
          <span className="text-midgray text-sm">
            {media.release_date.substring(0, 4)}
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
