import { useContext } from "react";
import { Context } from "../../context/ContextProvider";
import { MediaType } from "../../typing";
import Details from "./info/Details";
import XButton from "./info/XButton";

//TODO TENTAR MELHORAR ESSA TELA TA MUITO SIMPLES
// FAZER CLIENT SIDE FETCH...
export default function InfoModal({ mediaType }: MediaType) {
  const { selectedMedia, showInfoModal, setShowInfoModal, setModalOpen } =
    useContext(Context);

  return (
    <>
      {showInfoModal && selectedMedia && (
        <section
          onClick={() => {
            setShowInfoModal(false);
            setModalOpen(false);
          }}
          className="bg-black/70 fixed w-full h-full
        grid place-content-start z-50 top-0 left-0 font-medium"
        >
          <div className="flex flex-col p-4 ">
            <XButton />

            <div
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col-reverse md:flex-row gap-4
             bg-black p-4 rounded-sm shadow-md shadow-black/30 min-h-full"
            >
              <Details mediaType={mediaType} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
