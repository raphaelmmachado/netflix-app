import { Dispatch, SetStateAction, useState, useContext } from "react";
import Header from "./header/Header";
import Image from "next/image";
import { Context } from "../../context/ContextProvider";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowLongUpIcon";
import MovieSlider from "./slider/MovieSlider";
import BannerText from "./banner/BannerText";
import PlayButton from "./banner/PlayButton";
import ListButton from "./banner/ListButton";
import DetailsButton from "./banner/DetailsButton";
import VerticalScroller from "./banner/VerticalScroller";
import { Movie } from "../../typing";
import movieFound from "../../utils/movieFound";
import FormateDateToBR from "../../utils/formatDate";
import checkIfHasDate from "../../utils/checkIfHasDate";

interface Props {
  movies: Movie[];
  children?: JSX.Element | JSX.Element[];
  title: string;
  bars: number;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

export default function MovieContainer({
  movies,
  title,
  bars,
  index,
  setIndex,
}: Props) {
  const [selectedMovie, setSelectedMovie] = useState<Movie>(movies[0]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { myList, setMyList } = useContext(Context);

  const handleAddToList = (movie: Movie) => {
    if (myList.some((item) => item.id === movie.id)) {
      setMyList((myList: Movie[]) =>
        [...myList].filter((item) => item.id !== movie.id)
      );
    } else {
      setMyList((myList: Movie[]) => [...myList, movie]);
    }
  };
  // const check = () => {
  //   let date;
  //   if (checkIfHasDate(selectedMovie)) {
  //     date = FormateDateToBR(selectedMovie.release_date);
  //   } else {
  //     return (date = "");
  //   }
  //   return date;
  // };
  // const date = check();
  return (
    <>
      {selectedMovie ? (
        <main
          className="backdrop-image flex flex-col justify-between
           min-h-[100vh] transition-all shadow-2xl"
          id="section--highlighted relative"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${selectedMovie?.backdrop_path})`,
          }}
        >
          {" "}
          <div className=" bg-gradient-to-r from-black via-black/70 to-black/25 absolute">
            {/* NAV BAR */}
            <Header setIndex={(i: number) => setIndex(i)} />
            <div className="flex justify-between items-center">
              <div
                className="flex flex-col justify-center gap-4 py-4 px-4
           md:px-14 h-[300px]"
              >
                <BannerText
                  title={selectedMovie.title ?? selectedMovie.name}
                  description={selectedMovie.overview}
                  rating={selectedMovie.vote_average.toFixed(1)}
                  release_date={selectedMovie?.release_date}
                  typeOfShow={selectedMovie.media_type}
                />
                {/* PLAY / INFO BUTTONS */}
                <div className="flex gap-6 items-center justify-start">
                  <PlayButton
                    play={movieFound(selectedMovie) ? true : false}
                    showModal={() => setShowVideoModal(true)}
                  />
                  <ListButton
                    added={myList.some((item) => item.id === selectedMovie.id)}
                    addToList={() => handleAddToList(selectedMovie)}
                  />
                  <DetailsButton showModal={() => setShowInfoModal(true)} />
                </div>
              </div>

              <VerticalScroller
                bars={bars}
                index={index}
                setIndex={(i) => setIndex(i)}
                goUp={() =>
                  setIndex((prev: number) => (prev - 1 < 0 ? prev : --prev))
                }
                goDown={() =>
                  setIndex((prev: number) =>
                    prev + 1 > bars - 1 ? prev : ++prev
                  )
                }
              />
            </div>
            {/* SLIDER */}
            <MovieSlider
              movies={movies}
              title={title}
              selectedMovie={selectedMovie}
              setSelectedMovie={(movie) => setSelectedMovie(movie)}
              showInfoModal={showInfoModal}
              showVideoModal={showVideoModal}
              setShowVideoModal={setShowVideoModal}
              setShowInfoModal={setShowInfoModal}
            />
          </div>
        </main>
      ) : (
        // IN CASE SELECTED MOVIE CAN NOT BE ACESSED
        <main className=" bg-black">
          <section className="min-h-[100vh] w-full flex flex-col items-center justify-center gap-4">
            <Image
              src="/assets/NetflixLogoSvg.svg"
              alt="netflix-logo"
              width={200}
              height={100}
            />
            <h1>Lista de filmes vazia</h1>
            <button
              className="bg-white rounded-md text-black font-bold px-6 gap-2 py-2"
              onClick={() => setIndex(0)}
            >
              <ArrowUpIcon />
              <>Voltar</>
            </button>
          </section>
        </main>
      )}
    </>
  );
}
