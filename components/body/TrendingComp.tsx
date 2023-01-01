import Image from "next/image";
import { Result, Trending } from "../../types/trending";
import { PlayIcon } from "@heroicons/react/20/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import MovieSlider from "../MovieSlider";

export default function TrendingComp({ results }: any) {
  return (
    // TRENDING MOVIES
    <section id="trending" className="relative">
      {/*HIGHLIGHTED MOVIE BACKDROP IMAGE RELATIVE POS*/}
      <Image
        src={`https://image.tmdb.org/t/p/w1280${results[0].backdrop_path}`}
        alt="highlighted-title"
        width={1440}
        height={810}
        className="object-cover"
      />
      {/* HIGHLIGHTED MOVIE INFO */}
      <div className="absolute top-[0.3%] m-4 max-w-[636px] flex flex-col gap-2">
        <div className="bg-black bg-opacity-40 p-4 rounded-md">
          <h1 className=" text-white text-5xl pb-4">{results[0].title}</h1>
          <p className="text-smokewt">{results[0].overview}</p>
        </div>
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
      <h1 className="font-extrabold text-lg">Popular on Netflix</h1>
      {/* TRENDING MOVIES SLIDER */}
      <div className="w-full grid grid-cols-5" id="slider">
        <MovieSlider results={results} />

        {/* {trending.results.map((item, i) => (
          <Image
            key={i}
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            width={200}
            height={320}
            alt="poster"
          />
        ))} */}
      </div>
    </section>
  );
}
