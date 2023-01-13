import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { Movie } from "../../../../typing";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import apiConfiguration from "../../../../utils/apiConfiguration";
import Paragraph from "./info/Paragraph";
import MovieInfoModal from "./info/MovieInfoModal";
import formatDate from "../../../../utils/formatDate";
import FormateDateToBR from "../../../../utils/formatDate";
interface Props {
  showInfoModal: boolean;
  selectedMovie: Movie;
  setShowInfoModal: Dispatch<SetStateAction<boolean>>;
}
export default function InfoModal({
  showInfoModal,
  selectedMovie,
  setShowInfoModal,
}: Props) {
  const date = FormateDateToBR(selectedMovie?.release_date);
  return (
    <>
      {showInfoModal ? (
        <section
          className="bg-black/70 fixed w-full h-full
        flex flex-col justify-center items-center z-50 top-0 left-0  font-medium"
        >
          <div className="max-w-[600px] min-h-[480px] flex flex-col">
            <button
              className="self-end"
              onClick={() => setShowInfoModal(false)}
            >
              <span>
                {" "}
                <XMarkIcon
                  className="h-8 w-8 rounded-sm hover:bg-gray/30
             p-1 transition-colors"
                />
              </span>
            </button>

            <div className="flex flex-col justify-around gap-6 bg-black p-4 rounded-sm">
              <div className="flex justify-around">
                <div className="relative">
                  {selectedMovie.adult ? (
                    <Image
                      src={"/assets/adult.png"}
                      width={30}
                      height={30}
                      alt="+18"
                      className="absolute"
                    />
                  ) : null}

                  <Image
                    src={`${apiConfiguration.images.secure_base_url}/${apiConfiguration.images.poster_sizes[3]}/${selectedMovie.poster_path}`}
                    width={180}
                    height={300}
                    alt={selectedMovie.title}
                  />
                </div>

                <div className="max-w-[50%] flex flex-col gap-2">
                  <Paragraph title="Data de lançamento" value={date} />
                  <Paragraph
                    title="Media de avaliação"
                    value={Math.ceil(selectedMovie.vote_average)}
                  />
                  <Paragraph title="Votos" value={selectedMovie.vote_count} />
                  <Paragraph
                    title="Idioma original"
                    value={selectedMovie.original_language}
                  />
                  <Paragraph
                    title="Popularidade"
                    value={selectedMovie.popularity}
                  />
                </div>
              </div>
              <MovieInfoModal
                title={selectedMovie.title}
                overview={selectedMovie.overview}
              />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
