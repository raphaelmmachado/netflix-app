import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import apiConfiguration from "../../constants/apiConfiguration";
import { Movie } from "../../typing";
import AddToListButton from "./AddToListButton";
import Details from "./Details";
import PlayButton from "./PlayButton";

interface Props {
  movie: Movie;
  setShowVideo: Dispatch<SetStateAction<boolean>>;
  setShowInfo: Dispatch<SetStateAction<boolean>>;
  selectAMovie: (movie: Movie) => void;
}

export default function Card({
  movie,
  setShowVideo,
  selectAMovie,
  setShowInfo,
}: Props) {
  const [showButtons, setShowButtons] = useState(false);
  const url = apiConfiguration.images.base_url;
  const posterSize = apiConfiguration.images.poster_sizes[3];

  return (
    <>
      <div
        key={movie.id}
        className="relative"
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
        onFocus={() => setShowButtons(true)}
      >
        <Image
          className="rounded-sm  border-2 border-gray/20"
          src={`${url}${posterSize}/${movie.poster_path}`}
          width={185}
          height={185}
          alt={movie.name ?? movie.original_title}
        />
        {showButtons && (
          <>
            <PlayButton
              showVideo={() => {
                selectAMovie(movie);
                setShowVideo(true);
              }}
            />

            <AddToListButton movie={movie} />
            <Details
              showInfo={() => {
                selectAMovie(movie);
                setShowInfo(true);
              }}
            />
          </>
        )}
        <p className="absolute w-full text-center text-sm p-1 text-white/80">
          {movie.title ?? movie.name}
          {" · "}
          <span className="text-def_green-400 text-sm">
            {movie.vote_average}
          </span>
        </p>
      </div>
    </>
  );
}
