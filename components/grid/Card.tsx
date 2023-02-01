import Image from "next/image";
import { useState, useContext, useCallback } from "react";
import { Context } from "../../context/ContextProvider";
import PlayButton from "./PlayButton";
import AddToListButton from "./AddToListButton";
import Details from "./Details";
import { Movie } from "../../typing";
import apiConfiguration from "../../constants/apiConfiguration";

interface Props {
  movie: Movie;
}

export default function Card({ movie }: Props) {
  const [showButtons, setShowButtons] = useState(false);
  const {
    selectedMovie,
    setSelectedMovie,
    setShowVideoModal,
    setShowInfoModal,
  } = useContext(Context);

  const url = apiConfiguration.images.base_url;
  const posterSize = apiConfiguration.images.poster_sizes[3];

  const selectAMovie = useCallback(
    (movie: Movie) => {
      setSelectedMovie(movie);
    },
    [selectedMovie]
  );
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
                setShowVideoModal(true);
              }}
            />

            <AddToListButton movie={movie} />
            <Details
              showInfo={() => {
                selectAMovie(movie);
                setShowInfoModal(true);
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
