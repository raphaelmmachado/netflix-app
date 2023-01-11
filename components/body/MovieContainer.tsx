import { Dispatch, SetStateAction, useState, useContext } from "react";
import { Context } from "../../context/ContextProvider";
import { IVideo, IVideoRequest, Movie } from "../../typing";
import MovieSlider from "./slider/MovieSlider";

import ThumbUpIconOut from "@heroicons/react/24/outline/HandThumbUpIcon";
import ThumbUpIconSol from "@heroicons/react/24/solid/HandThumbUpIcon";
import ThumbDownIconOut from "@heroicons/react/24/outline/HandThumbDownIcon";
import ThumbDOwnIconSol from "@heroicons/react/24/solid/HandThumbDownIcon";
import {
  ExclamationTriangleIcon,
  PlayIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid/";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Header from "../header/Header";

interface Props {
  movies: Movie[];
  trailers: IVideoRequest[];
  children?: JSX.Element | JSX.Element[];
  title: string;
  bars: number;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

export default function MovieContainer({
  movies,
  title,
  trailers,
  bars,
  index,
  setIndex,
}: Props) {
  const [selectedMovie, setSelectedMovie] = useState<Movie>(movies[0]);
  const [selectedVideo, setSelectedVideo] = useState<IVideo | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  //TODO como fazer o botao de like
  const { liked, disliked, setDisliked, setLiked } = useContext(Context);

  return (
    <>
      {" "}
      {selectedMovie ? (
        <main
          className="backdrop-image flex flex-col justify-between
           min-h-[100vh] transition-all shadow-2xl"
          id="section--highlighted"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${selectedMovie?.backdrop_path})`,
          }}
        >
          {/* NAV BAR */}
          <Header />

          <div className="flex justify-between items-center">
            {/* SELECTED MOVIE INFO - CUIDADO COM HEIGHT FIXADA!!!*/}
            <div
              className="flex flex-col justify-center gap-4 py-4 px-4
           md:px-14 h-[300px]"
            >
              <h1 className=" text-white font-bold text-5xl pb-2">
                {selectedMovie.title || selectedMovie.name}
              </h1>
              <p
                className={`text-white max-w-fit
              md:max-w-[50vw] line-clamp-6 font-base tracking-wide`}
              >
                {selectedMovie.overview}
              </p>

              {/* PLAY / INFO BUTTONS */}
              <div className="flex gap-6 items-center justify-start">
                <button
                  onClick={() => setShowVideoModal(true)}
                  className={`flex items-center justify-around gap-2
              ${
                selectedVideo ? "bg-smokewt" : "bg-midgray"
              } text-black font-bold py-2 px-6
              rounded-md`}
                >
                  {selectedVideo ? (
                    <PlayIcon className="text-black h-5 w-5" />
                  ) : (
                    <ExclamationTriangleIcon className="text-black h-5 w-5" />
                  )}
                  <>{selectedVideo ? "Play" : "Indisponível"}</>
                </button>
                <button
                  onClick={() => setShowInfoModal(true)}
                  className="flex items-center justify-around gap-2
              bg-midgray text-smokewt font-bold py-2 px-6
                rounded-md"
                >
                  <InformationCircleIcon className="text-smokewt h-5 w-5" />
                  <>Detalhes</>
                </button>
              </div>
            </div>

            {/* VERTICAL NAVIGATION BAR */}
            <div className="flex flex-col items-center gap-2 px-8">
              <div
                className="cursor-pointer"
                onClick={() =>
                  setIndex((prev) => (prev - 1 < 0 ? prev : --prev))
                }
              >
                <ChevronUpIcon className="w-5 h-5 text-center" />
              </div>
              {[...Array(bars).fill(" ")].map((bar, i) => (
                <div
                  onClick={() => setIndex(i)}
                  key={i}
                  className={`w-6 h-2 hover:cursor-pointer ${
                    index === i ? "bg-red" : "bg-white/50"
                  } `}
                ></div>
              ))}
              <div
                className="cursor-pointer"
                onClick={() =>
                  setIndex((prev) => (prev + 1 > bars - 1 ? prev : ++prev))
                }
              >
                <ChevronDownIcon className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* TRENDING MOVIES SLIDER */}
          <MovieSlider
            movies={movies}
            title={title}
            trailers={trailers}
            selectedMovie={selectedMovie}
            setSelectedMovie={(movie) => setSelectedMovie(movie)}
            selectedVideo={selectedVideo}
            setSelectedVideo={setSelectedVideo}
            showInfoModal={showInfoModal}
            showVideoModal={showVideoModal}
            setShowVideoModal={setShowVideoModal}
            setShowInfoModal={setShowInfoModal}
          />
        </main>
      ) : (
        <h1>Alguma coisa deu errado!</h1>
      )}
    </>
  );
}
