import { Dispatch, SetStateAction } from "react";
import { Movie } from "../../typing";

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
  return (
    <>
      {showInfoModal ? (
        <section
          className="bg-black/70 fixed w-full h-full
flex justify-center items-center z-50 top-0 left-0"
        >
          <div
            className="bg-transparent min-w-[800px] min-h-[500px]
    rounded-sm  flex flex-col"
          >
            <h1>{selectedMovie.title}</h1>
            <button onClick={() => setShowInfoModal(false)}>fechar</button>
          </div>
        </section>
      ) : null}
    </>
  );
}
