import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/ContextProvider";
import { MediaType, MovieDetails } from "../../typing";
import Details from "./info/Details";
import XButton from "./info/XButton";
import getMovieDetails from "../../utils/getMovieDetails";

//TODO TENTAR MELHORAR ESSA TELA TA MUITO SIMPLES
// FAZER CLIENT SIDE FETCH...
export default function InfoModal({ mediaType }: MediaType) {
  const { selectedMovie, showInfoModal, setShowInfoModal, setModalOpen } =
    useContext(Context);

  return (
    <>
      {showInfoModal && selectedMovie && (
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
              <Details
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
      )}
    </>
  );
}
