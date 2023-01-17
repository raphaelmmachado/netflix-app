import ArrowUpIcon from "@heroicons/react/24/solid/ArrowLongUpIcon";
import { Dispatch, SetStateAction, useState, useContext } from "react";
import { useSwipeable } from "react-swipeable";
import Header from "./header/Header";
import Image from "next/image";
import { Context } from "../../context/ContextProvider";
import MovieSlider from "./slider/MovieSlider";
import BannerText from "./banner/BannerText";
import PlayButton from "./banner/PlayButton";
import ListButton from "./banner/ListButton";
import DetailsButton from "./banner/DetailsButton";
import VerticalScroller from "./banner/VerticalScroller";
import { Movie } from "../../typing";
import IMG_BASE_URL from "../../utils/bgImageBaseUrl";
import movieFound from "../../utils/movieFound";

interface Props {
  movies: Movie[];
  children?: JSX.Element | JSX.Element[];
  title: string;
  bars: number;
  index: number;
  mediaType?: "tv" | "movie";
  setIndex: Dispatch<SetStateAction<number>>;
}

export default function MainContainer({
  movies,
  title,
  mediaType,
  bars,
  index,
  setIndex,
}: Props) {
  const [selectedMovie, setSelectedMovie] = useState<Movie>(movies[0]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { myList, setMyList } = useContext(Context);

  // change index when user swipes
  const swipeHandler = useSwipeable({
    onSwipedUp: () =>
      setIndex((prev) => (prev + 1 > bars - 1 ? prev : prev + 1)),
    onSwipedDown: () => setIndex((prev) => (prev - 1 < 0 ? prev : prev - 1)),
  });

  //add movie to a list when
  const handleAddToList = (movie: Movie) => {
    if (myList.some((item) => item.id === movie.id)) {
      setMyList((myList: Movie[]) =>
        [...myList].filter((item) => item.id !== movie.id)
      );
    } else {
      setMyList((myList: Movie[]) => [...myList, movie]);
    }
  };

  //
  return (
    <>
      {selectedMovie ? (
        // banner
        <main
          {...swipeHandler}
          id="banner"
          className="banner"
          style={{
            backgroundImage: `url(${IMG_BASE_URL}${selectedMovie?.backdrop_path})`,
          }}
        >
          {" "}
          <div className="banner-wrapper" id="banner-wrapper">
            <Header setIndex={(i: number) => setIndex(i)} />
            <div className="banner-center" id="banner-center">
              <section className="banner-center-left" id="banner-center-left">
                <BannerText
                  title={selectedMovie.title ?? selectedMovie.name}
                  description={selectedMovie.overview}
                  rating={selectedMovie.vote_average.toFixed(1)}
                  release_date={selectedMovie?.release_date}
                  typeOfShow={selectedMovie.media_type}
                />
                <div className="banner-center-left-buttons">
                  <PlayButton
                    showModal={() => {
                      setShowVideoModal(true);
                    }}
                  />
                  <ListButton
                    added={myList.some((item) => item.id === selectedMovie.id)}
                    addToList={() => handleAddToList(selectedMovie)}
                  />
                  <DetailsButton showModal={() => setShowInfoModal(true)} />
                </div>
              </section>

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
            <MovieSlider
              movies={movies}
              title={title}
              mediaType={mediaType}
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
