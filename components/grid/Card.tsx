import { useState, useContext, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Context } from "../../context/ContextProvider";
// utils
import { Media } from "../../typing";
import apiConfiguration from "../../constants/apiConfiguration";
import FormateDateToBR from "../../utils/formatters/formatDate";
import { movieGenres, tvGenres } from "../../constants/genres";
//components
import Picture from "../Picture";
const PlayButton = dynamic(() => import("./PlayButton"), { ssr: false });
const AddToListButton = dynamic(() => import("./AddToListButton"), {
  ssr: false,
});
const DetailsButton = dynamic(() => import("../home/banner/DetailsButton"), {
  ssr: false,
});

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
      <main
        key={media.id}
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
        onFocus={() => setShowButtons(true)}
      >
        {media.adult && (
          <span className="bg-def_black rounded-md text-smokewt absolute px-2 m-1">
            18
          </span>
        )}
        <section className="relative">
          <Picture
            title={media.title ?? media.name}
            priority={true}
            width={170}
            height={250}
            src={`${url}${posterSize[2]}/${media.poster_path}`}
            fallBackImage={`${url}${posterSize[0]}/${media.poster_path}`}
            alt={media.title ?? media.name}
            className="rounded-md shadow-md border-2 border-gray/20"
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
                slug={media.title ?? media.name}
              />
            </>
          )}
        </section>
        <section className="w-full flex flex-col gap-1 text-sm p-1 text-white/80 ">
          <>
            <h1 className="">{media.title ?? media.name}</h1>

            <div className="flex justify-start items-center gap-4">
              {" "}
              <span className="text-midgray text-sm">
                {media.release_date
                  ? FormateDateToBR(media.release_date, {
                      year: "numeric",
                      month: "2-digit",
                      day: "numeric",
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
            </div>

            {media.genre_ids.length > 0 && (
              <div
                className="flex gap-1 justify-start items-center flex-wrap
             text-midgray"
              >
                {mediaType === "movie"
                  ? media.genre_ids.map((item, i) => {
                      return (
                        <Link
                          href={{
                            pathname: `/[type]/[genre]/1`,
                            query: {
                              type: "filmes",
                              genre: `${movieGenres[item].slug}`,
                            },
                          }}
                          key={i}
                          className="text-sm bg-midgray/20 items-center
                        px-1 rounded-md  cursor-pointer"
                        >
                          {movieGenres[item]?.name}
                        </Link>
                      );
                    })
                  : media.genre_ids.map((item, i) => {
                      return (
                        <Link
                          href={{
                            pathname: `/[type]/[genre]/1`,
                            query: {
                              type: "series",
                              genre: `${tvGenres[item].slug}`,
                            },
                          }}
                          key={i}
                          className="text-sm bg-midgray/20 items-center
                      p-1 rounded-md cursor-pointer"
                        >
                          {tvGenres[item]?.name}
                        </Link>
                      );
                    })}
              </div>
            )}
          </>
        </section>
      </main>
    </>
  );
}
