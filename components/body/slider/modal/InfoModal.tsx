import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Movie } from "../../../../typing";
import LangIcon from "@heroicons/react/24/solid/LanguageIcon";
import StarIcon from "@heroicons/react/24/solid/StarIcon";
import ChartIcon from "@heroicons/react/24/solid/ChartBarIcon";
import RocketIcon from "@heroicons/react/24/solid/RocketLaunchIcon";
import HandIcon from "@heroicons/react/24/solid/HandThumbUpIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import apiConfiguration from "../../../../utils/apiConfiguration";
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
  useEffect(() => {
    if (window !== undefined) {
      window.removeEventListener("whell", () => {});
    }
  }, []);
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
                  <div className="inline-flex items-center gap-1">
                    <p>
                      Data de lançamento:{" "}
                      <span className="text-gray">
                        {selectedMovie.release_date.toLocaleString("pt-BR")}
                      </span>{" "}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1">
                    <p>
                      Media de Avaliação:{" "}
                      <span className="text-gray">
                        {Math.ceil(selectedMovie.vote_average)}
                      </span>
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1">
                    <p>
                      Votos:{" "}
                      <span className="text-gray">
                        {selectedMovie.vote_count}
                      </span>
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1">
                    <p>
                      Idioma Original:{" "}
                      <span className="text-gray">
                        {selectedMovie.original_language}
                      </span>
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1">
                    <p>
                      Popularidade:{" "}
                      {
                        <span className="text-gray">
                          {selectedMovie.popularity}
                        </span>
                      }
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <h1 className="text-xl p-1">{selectedMovie.title}</h1>
                <p className="tracking-wide">{`${selectedMovie.overview}`}</p>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
