import { useState } from "react";
import { Movie } from "../../typing";
import MovieSlider from "../slider/MovieScroller";
import MovieDescription from "./MovieDescription";

import { PlayIcon } from "@heroicons/react/20/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface Props {
  movies: Movie[];
  children?: JSX.Element | JSX.Element[];
  title: string;
}

export default function HighlightedMovie({ movies, title }: Props) {
  const [highlighted, setHighlighted] = useState<Movie>(movies[0]);

  return (
    <>
      {" "}
      {highlighted ? (
        <section
          className="backdrop-image flex flex-col justify-between min-h-[87vh] transition-all shadow-2xl mb-1"
          id="section--highlighted"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${highlighted?.backdrop_path})`,
          }}
        >
          {/* HIGHLIGHTED MOVIE INFO - CUIDADO COM HEIGHT FIXADA!!!*/}
          <div className="flex flex-col justify-center gap-4 py-4 px-4 md:px-14 h-[300px]">
            <h1 className=" text-smokewt text-5xl pb-2">{highlighted.title}</h1>
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
            setHighlighted={(movie) => {
              setHighlighted(movie);
              console.log("hover", movie);
            }}
          />
        </section>
      ) : (
        <h1>ERROR</h1>
      )}
    </>
  );
}
