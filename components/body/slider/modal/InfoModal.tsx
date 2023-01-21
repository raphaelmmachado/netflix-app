import { Dispatch, SetStateAction } from "react";
import { Movie } from "../../../../typing";
import apiConfiguration from "../../../../constants/apiConfiguration";
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
        grid place-content-start z-50 top-0 left-0 font-medium"
        >
          <div className="flex flex-col p-4 ">
            <XButton setShowInfoModal={() => setShowInfoModal(false)} />

            <div
              className="flex flex-col-reverse md:flex-row gap-4
             bg-black p-4 rounded-sm shadow-md shadow-black/30 min-h-full"
            >
              <MovieInfoModal
                title={
                  selectedMovie.title ??
                  selectedMovie.name ??
                  selectedMovie.original_name
                }
                overview={selectedMovie.overview}
              />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
