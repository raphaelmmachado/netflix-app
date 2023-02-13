import { useState, useContext, useCallback, lazy, Suspense } from "react";
import { Context } from "../../context/ContextProvider";
import { Media } from "../../typing";
import apiConfiguration from "../../constants/apiConfiguration";
import FormateDateToBR from "../../utils/formatDate";
import { movieGenres, tvGenres } from "../../constants/genres";
const PlayButton = lazy(() => import("./PlayButton"));
const AddToListButton = lazy(() => import("./AddToListButton"));
const DetailsButton = lazy(() => import("../home/banner/DetailsButton"));
const PosterImage = lazy(() => import("./PosterImage"));

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
  const posterSize = apiConfiguration.images.poster_sizes;

  return (
    <>
      <div
        key={media.id}
        className="relative"
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
        onFocus={() => setShowButtons(true)}
      >
        {media.adult && (
          <span className="bg-def_black rounded-md text-smokewt absolute px-2 m-1">
            18
          </span>
        )}
        <Suspense
          fallback={
            <PosterImage
              src={`${url}${posterSize[0]}/${media.poster_path}`}
              alt={media.title ?? media.name}
            />
          }
        >
          <PosterImage
            src={`${url}${posterSize[3]}/${media.poster_path}`}
            alt={media.title ?? media.name}
          />
        </Suspense>

        {showButtons && (
          <Suspense>
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
          </Suspense>
        )}
        <div className="absolute w-full text-center text-sm p-1 text-white/80 line-clamp-3">
          <>
            {media.title ?? media.name}
            {" · "}
            <span className="text-midgray text-sm">
              {media.release_date
                ? FormateDateToBR(media.release_date, {
                    year: "numeric",
                  }).toString()
                : media.first_air_date &&
                  FormateDateToBR(media.first_air_date, {
                    year: "numeric",
                  }).toString()}
            </span>
            {" · "}
            <span className="text-def_green-400 text-sm">
              {media.vote_average.toFixed(1).toString()}
            </span>
            {media.genre_ids.length > 0 &&
              typeof media.genre_ids[0] === "number" &&
              (mediaType === "movie" ? (
                <p className="text-sm text-midgray">
                  {movieGenres[media.genre_ids[0]]?.name}
                </p>
              ) : (
                <p className="text-sm text-midgray">
                  {tvGenres[media.genre_ids[0]]?.name}
                </p>
              ))}
          </>
        </div>
      </div>
    </>
  );
}
