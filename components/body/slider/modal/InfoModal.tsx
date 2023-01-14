import { Dispatch, SetStateAction, useState } from "react";
import { Movie } from "../../../../typing";
import apiConfiguration from "../../../../utils/apiConfiguration";
import Paragraph from "./info/Paragraph";
import MovieInfoModal from "./info/MovieInfoModal";
import FormateDateToBR from "../../../../utils/formatDate";
import XButton from "./info/XButton";
import MoviePoster from "./info/MoviePoster";
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
        grid place-content-center z-50 top-0 left-0 font-medium"
        >
          <div className="flex flex-col px-8">
            <XButton setShowInfoModal={() => setShowInfoModal(false)} />

            <div className="flex flex-col-reverse md:flex-row gap-4 bg-black p-4 rounded-sm">
              <div className="flex flex-col gap-4">
                <MoviePoster
                  adult={selectedMovie.adult}
                  title={selectedMovie.title}
                  url={`${apiConfiguration.images.secure_base_url}/${apiConfiguration.images.poster_sizes[3]}/${selectedMovie.poster_path}`}
                />

                <div
                  className=" flex flex-col gap-2"
                  id="info-modal-paragraphs"
                >
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
