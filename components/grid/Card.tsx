import { useState, useContext, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Context } from "../../context/ContextProvider";

// utils
import { Media } from "../../typing";
import apiConfiguration from "../../constants/apiConfiguration";
import FormateDateToBR from "../../utils/formatters/formatDate";
import { movieGenres, tvGenres } from "../../constants/genres";
//components
import Picture from "../Picture";
import Play from "../home/banner/PlayButton";
import Add from "../home/banner/ListButton";
import Details from "../home/banner/DetailsButton";

interface Props {
  media: Media;
  mediaType: "tv" | "movie";
}

export default function Card({ media, mediaType }: Props) {
  const {
    selectedMedia,
    setSelectedMedia,
    setShowVideoModal,
    myList,
    setMyList,
  } = useContext(Context);

  const selectAMovie = useCallback(
    (media: Media) => {
      setSelectedMedia(media);
    },
    [selectedMedia]
  );
  const url = apiConfiguration.images.secure_base_url;
  const poster = apiConfiguration.images.poster_sizes;
  const backdrop = apiConfiguration.images.backdrop_sizes;

  return (
    <>
      {/* CONTAINER */}
      <main
        className="flex relative p-4 min-h-max max-w-full gap-1"
        key={media.id}
      >
        {/*ABSOLUTE POS BACKGROUND IMAGE */}
        <Image
          className="absolute grayscale opacity-10 rounded-md object-cover "
          fill
          alt={media.title ?? media.name}
          src={`${url}${backdrop[0]}${media.backdrop_path}`}
        />
        {/* PLUS 18 BADGE */}
        {media.adult && (
          <span className="bg-def_black rounded-md text-smokewt absolute px-2 m-1">
            18
          </span>
        )}
        {/* POSTER */}
        <section className="relative z-10">
          <Picture
            title={media.title ?? media.name}
            priority={true}
            width={170}
            height={250}
            src={`${url}${poster[2]}/${media.poster_path}`}
            alt={media.title ?? media.name}
            className="rounded-md shadow-md border-2 border-gray/20 "
          />
        </section>
        {/* INFO */}
        <section className="w-full flex flex-col  gap-1 text-sm p-1 text-white/80 z-10">
          <>
            <h1 className="uppercase">{media.title ?? media.name}</h1>

            <div className="flex justify-start gap-4">
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
                className="flex gap-1 items-center flex-wrap
             text-smokewt"
              >
                {media.genre_ids.map((item, i) => {
                  return (
                    <Link
                      href={{
                        pathname: `/[type]/[genre]/1`,
                        query: {
                          type: mediaType === "tv" ? "series" : "filmes",
                          genre: `${
                            movieGenres[item]?.slug ?? tvGenres[item]?.slug
                          }`,
                        },
                      }}
                      key={i}
                      className="text-sm bg-midgray items-center
                        px-1 rounded-md  cursor-pointer"
                    >
                      {movieGenres[item]?.name ?? tvGenres[item]?.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </>
          <div className="grid grid-cols-3 gap-1">
            <Play
              minimalist={true}
              showModal={() => {
                selectAMovie(media);
                setShowVideoModal(true);
              }}
            />
            <Add
              minimalist={true}
              added={myList && myList.some((item) => item.id === media.id)}
              addToList={() => {
                import("../../utils/addMediaToList").then((module) =>
                  module.default(media, myList, setMyList)
                );
              }}
            />
            <Details
              minimalist={true}
              id={media.id}
              mediaType={mediaType}
              selectedMediaType={mediaType}
              iconType={"solid"}
              slug={media.title ?? media.name}
            />
          </div>
        </section>
      </main>
    </>
  );
}
