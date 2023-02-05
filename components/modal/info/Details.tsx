import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { Context } from "../../../context/ContextProvider";
import mostSpokenLanguages from "../../../constants/mostSpokenLanguages";
import apiConfiguration from "../../../constants/apiConfiguration";
import ArrowUpRightIcon from "@heroicons/react/24/solid/ArrowUpRightIcon";
import { MediaType } from "../../../typing";

export default function Details({ mediaType }: MediaType) {
  const { selectedMedia } = useContext(Context);
  const base_url = apiConfiguration.images.secure_base_url;
  const size = apiConfiguration.images.poster_sizes[2];
  const langs = mostSpokenLanguages;
  return (
    <div>
      <header
        className="flex justify-center text-center text-xl border-b
       border-midgray text-white mb-8 no-underline hover:underline
        underline-offset-2 hover:cursor-pointer"
      >
        {" "}
        <Link
          href={
            mediaType
              ? mediaType === "movie"
                ? `filmes/filme/${selectedMedia?.id}`
                : `series/serie/${selectedMedia?.id}`
              : selectedMedia?.media_type === "movie"
              ? `filmes/filme/${selectedMedia?.id}`
              : `series/serie/${selectedMedia?.id}`
          }
        >
          {" "}
          {selectedMedia?.title ?? selectedMedia?.name}
        </Link>
        <ArrowUpRightIcon className="h-6 w-6 text-white" />
      </header>
      <Image
        src={`${base_url}${size}/${selectedMedia?.poster_path}`}
        width={170}
        height={285}
        alt="poster image"
        className="float-left mr-4 my-1"
      />
      {selectedMedia?.overview && (
        <p className="clear-right tracking-wide font-light line indent-8 leading-relaxed">
          {selectedMedia.overview}
        </p>
      )}
      <footer className="flex justify-center clear-both gap-3">
        {selectedMedia?.original_language && (
          <div className="flex items-center gap-2 border-gray border w-fit font-thin px-2 rounded-md ">
            {langs[selectedMedia.original_language]}
          </div>
        )}
        {selectedMedia?.media_type && (
          <div className="border-gray border w-fit font-thin px-2 rounded-md">
            {selectedMedia?.media_type === "movie" ? "Filme" : "Serie"}
          </div>
        )}
        {selectedMedia?.release_date && (
          <div className="border-gray border w-fit font-thin px-2 rounded-md">
            {selectedMedia?.release_date.substring(0, 4)}
          </div>
        )}
        {selectedMedia?.origin_country &&
          selectedMedia.origin_country.map((country, i) => {
            return (
              <div
                key={i}
                className="border-gray border w-fit font-thin px-2 rounded-md flex items-center"
              >
                <Image
                  src={`https://flagcdn.com/24x18/${country.toLowerCase()}.png`}
                  alt="flag"
                  width={24}
                  height={18}
                />
              </div>
            );
          })}
      </footer>
    </div>
  );
}
