import { Dispatch, SetStateAction, useContext } from "react";
import { Context } from "../../context/ContextProvider";
import { Movie } from "../../typing";
import MovieInfoModal from "./info/MovieInfoModal";
import XButton from "./info/XButton";
interface Props {
  showInfoModal: boolean;
  selectedMovie: Movie;
  setShowInfoModal: Dispatch<SetStateAction<boolean>>;
}
//TODO TENTAR MELHORAR ESSA TELA TA MUITO SIMPLES
export default function InfoModal({
  showInfoModal,
  selectedMovie,
  setShowInfoModal,
}: Props) {
  const { setModalOpen } = useContext(Context);
  return (
    <>
      {showInfoModal ? (
        <section
          className="bg-black/70 fixed w-full h-full
        grid place-content-start z-50 top-0 left-0 font-medium"
        >
          <div className="flex flex-col p-4 ">
            <XButton
              setShowInfoModal={() => {
                setShowInfoModal(false);
                setModalOpen(false);
              }}
            />

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
