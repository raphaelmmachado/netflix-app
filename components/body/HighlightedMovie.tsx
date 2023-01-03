import { useContext } from "react";
import { Context } from "../../context/ContextProvider";
import { Movie } from "../../typing";
import MovieSlider from "../MovieSlider";
import MovieDescription from "./MovieDescription";

import { PlayIcon } from "@heroicons/react/20/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface Props {
  movies: Movie[];
  children?: JSX.Element | JSX.Element[];
}

export default function HighlightedMovie({ movies }: Props) {
  const { highlighted } = useContext(Context);

  return (
    <>
      {" "}
      {highlighted ? (
        <section
          className="backdrop-image flex flex-col min-h-[100vh] transition-all"
          id="section--highlighted"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${highlighted?.backdrop_path})`,
          }}
        >
          {/* HIGHLIGHTED MOVIE INFO - CUIDADO COM HEIGHT FIXADA!!!*/}
          <div className="flex flex-col gap-4 py-4 px-8 h-[300px]">
            <h1 className=" text-white text-5xl pb-2">{highlighted.title}</h1>
            <MovieDescription text={highlighted.overview} />

            {/* PLAY / INFO BUTTONS */}
            <div className="flex gap-6 items-center justify-start">
              <button
                className="flex items-center justify-around gap-2
      bg-smokewt text-black font-bold py-2 px-6
      rounded-md"
              >
                <PlayIcon className="text-black h-5 w-5" />
                <>Play</>
              </button>
              <button
                className="flex items-center justify-around gap-2
      bg-midgray text-white font-bold py-2 px-6
      rounded-md"
              >
                <InformationCircleIcon className="text-white h-5 w-5" />
                <>More Info</>
              </button>
            </div>
          </div>

          {/* TRENDING MOVIES SLIDER */}
          <MovieSlider
            movies={movies}
            title="Netflix Originals"
            background={false}
            poster={false}
          />
        </section>
      ) : (
        <h1>ERROR</h1>
      )}
    </>
  );
}
