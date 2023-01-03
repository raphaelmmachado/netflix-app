import { PlayIcon } from "@heroicons/react/20/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Movie } from "../../typing";
import MovieSlider from "../MovieSlider";

interface Props {
  movies: Movie[];
  children?: JSX.Element | JSX.Element[];
}

export default function HighlightedMovie({ movies }: Props) {
  const [highlighted, setHighlighted] = useState<Movie | null>();

  useEffect(() => {
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    setHighlighted(randomMovie);
    console.log(highlighted);
  }, []);

  const handleHover = () => {};

  return (
    <>
      {highlighted ? (
        <section
          className="backdrop-image flex flex-col justify-around min-h-[90vh]"
          id="section--highlighted"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${highlighted?.backdrop_path})`,
          }}
        >
          {/* HIGHLIGHTED MOVIE INFO */}
          <div className="flex flex-col gap-4 max-w-[50vw]  px-8">
            <h1 className=" text-white text-5xl pb-2">{highlighted.title}</h1>
            <p className=" text-white">{highlighted.overview}</p>
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
