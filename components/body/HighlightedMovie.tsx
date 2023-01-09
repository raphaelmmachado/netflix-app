import { useState, useContext } from "react";
import { Context } from "../../context/ContextProvider";
import { IVideoRequest, Movie } from "../../typing";
import MovieSlider from "../slider/MovieScroller";
import { PlayIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface Props {
  movies: Movie[];
  trailers: IVideoRequest[];
  children?: JSX.Element | JSX.Element[];
  title: string;
}

export default function HighlightedMovie({ movies, title, trailers }: Props) {
  const [highlighted, setHighlighted] = useState<Movie>(movies[0]);
  const { setShowModal, video } = useContext(Context);
  return (
    <>
      {" "}
      {highlighted ? (
        <section
          className="backdrop-image flex flex-col justify-between
           min-h-[87vh] transition-all shadow-2xl mb-6"
          id="section--highlighted"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${highlighted?.backdrop_path})`,
          }}
        >
          {/* HIGHLIGHTED MOVIE INFO - CUIDADO COM HEIGHT FIXADA!!!*/}
          <div
            className="flex flex-col justify-center gap-4 py-4 px-4
           md:px-14 h-[300px]"
          >
            <h1 className=" text-white font-bold text-5xl pb-2">
              {highlighted.title || highlighted.name}
            </h1>
            <p
              className={`text-white max-w-fit
              md:max-w-[50vw] line-clamp-6 font-base tracking-wide`}
            >
              {highlighted?.overview}
            </p>

            {/* PLAY / INFO BUTTONS */}
            <div className="flex gap-6 items-center justify-start">
              <button
                onClick={() => setShowModal(video ? true : false)}
                className={`flex items-center justify-around gap-2
              ${
                video ? "bg-smokewt" : "bg-midgray"
              } text-black font-bold py-2 px-6
              rounded-md`}
              >
                {video ? (
                  <PlayIcon className="text-black h-5 w-5" />
                ) : (
                  <ExclamationTriangleIcon className="text-black h-5 w-5" />
                )}
                <>{video ? "Play" : "Indisponível"}</>
              </button>
              <button
                className="flex items-center justify-around gap-2
              bg-midgray text-smokewt font-bold py-2 px-6
                rounded-md"
              >
                <InformationCircleIcon className="text-smokewt h-5 w-5" />
                <>More Info</>
              </button>
            </div>
          </div>
          {/* TRENDING MOVIES SLIDER */}
          <MovieSlider
            movies={movies}
            title={title}
            setHighlighted={(movie) => setHighlighted(movie)}
            trailers={trailers}
          />
        </section>
      ) : (
        <h1>ERROR</h1>
      )}
    </>
  );
}
