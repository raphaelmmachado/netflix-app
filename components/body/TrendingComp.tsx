import Image from "next/image";
import { PlayIcon } from "@heroicons/react/20/solid";
import { StarIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import MovieSlider from "../MovieSlider";
import { ITrendingComp } from "../../typing";

export default function TrendingComp({ results }: ITrendingComp) {
  const MOVIE_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";
  const MOVIE_POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    // TRENDING MOVIES
    <section
      className="backdrop-image flex flex-col justify-around p-4 min-h-screen"
      id="trending"
      style={{
        backgroundImage: `url(${MOVIE_BACKDROP_BASE_URL}${results[0].backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* HIGHLIGHTED MOVIE INFO */}
      <div className="flex flex-col gap-4">
        <h1 className=" text-white text-5xl pb-2">{results[0].title}</h1>
        {/* INFO */}
        <div className="flex text-white/70 gap-6 ">
          <div className="flex  gap-2 items-center">
            <StarIcon className="h-5 w-5" />
            <p>Rating : {results[0].vote_average}</p>
          </div>
          <div className="flex  gap-2 items-center">
            <HandThumbUpIcon className="h-5 w-5" />
            <p>Popularity : {results[0].popularity}</p>
          </div>
        </div>
        {/* PLAY / INFO BUTTONS */}
        <div className="flex gap-6 items-center justify-start">
          {" "}
          <button
            className="flex items-center justify-around gap-2
          bg-smokewt text-black font-bold py-2 px-6
          rounded-md"
          >
            <PlayIcon className="text-black h-5 w-5" /> Play
          </button>
          <button
            className="flex items-center justify-around gap-2
          bg-midgray text-white font-bold py-2 px-6
          rounded-md"
          >
            {" "}
            <InformationCircleIcon className="text-white h-5 w-5" />
            More Info
          </button>
        </div>
      </div>

      {/* TRENDING MOVIES SLIDER */}
      <div>
        <h1 className="font-bold text-lg text-white border-l-4 pl-1 my-1 border-red">
          Popular on Netflix
        </h1>
        <MovieSlider results={results} poster={MOVIE_POSTER_BASE_URL} />
      </div>
    </section>
  );
}
