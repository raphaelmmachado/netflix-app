import {
  useState,
  useEffect,
  CSSProperties,
  Dispatch,
  SetStateAction,
} from "react";
import Image from "next/image";
import apiConfiguration from "../../../utils/apiConfiguration";
import { Movie } from "../../../typing";
import useWindowSize from "../../../hooks/useWindowSize";
import InfoModal from "./modal/InfoModal";
import VideoModal from "./modal/VideoModal";

interface IMovieSlider {
  movies: Movie[];
  selectedMovie: Movie;
  title: string;
  setSelectedMovie: Dispatch<SetStateAction<Movie>>;
  showVideoModal: boolean;
  showInfoModal: boolean;
  setShowInfoModal: Dispatch<SetStateAction<boolean>>;
  setShowVideoModal: Dispatch<SetStateAction<boolean>>;
}

export default function MovieSlider({
  movies,
  title,
  selectedMovie,
  setSelectedMovie,
  showVideoModal,
  showInfoModal,
  setShowInfoModal,
  setShowVideoModal,
}: IMovieSlider) {
  const [itemsPerScreen, setItemsPerScreen] = useState(4);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [progressBarItems, setProgressBarItems] = useState(0);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width !== undefined) {
      setItemsPerScreen(width);
      const math = Math.ceil(movies.length / itemsPerScreen);
      setProgressBarItems(math);
    }
  }, [movies.length, width, itemsPerScreen]);

  const incrementSliderIndex = () => {
    setSliderIndex((prev) => {
      if (prev + 1 >= progressBarItems) return 0;
      else return prev + 1;
    });
  };
  const decrementSliderIndex = () => {
    setSliderIndex((prev) => {
      if (prev - 1 < 0) return progressBarItems - 1;
      else return prev - 1;
    });
  };

  const imgUrl = apiConfiguration.images.secure_base_url;
  const backdropSize = apiConfiguration.images.backdrop_sizes;

  const selectAMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    if ("results" in selectedMovie.trailer) {
      true;
    } else {
      return console.warn(
        `Não foi encontrado trailer do filme ${
          selectedMovie.title ?? selectedMovie.name
        } na DB`
      );
    }
  };
  return (
    <section className={`m-0 py-6 shadow-2xl`}>
      <main className="row">
        <div className="header">
          <h2
            className="md:text-lg tracking-wide font-bold
          border-l-4 border-red pl-2"
          >
            {title}
          </h2>
          <div className="progress-bar">
            {Array(progressBarItems)
              .fill("")
              .map((item, i) => {
                return (
                  <div
                    onClick={() => setSliderIndex(i)}
                    key={i}
                    className={`progress-item cursor-pointer
                 ${i === sliderIndex ? "active" : ""}`}
                  ></div>
                );
              })}
          </div>
        </div>
        <div id="container" className="carousel select-none">
          <div
            onClick={decrementSliderIndex}
            className={`handle left-handle`}
          ></div>
          <div
            id="slider"
            style={
              {
                "--slider-index": sliderIndex,
                "--items-per-screen": itemsPerScreen,
              } as CSSProperties
            }
            className={`slider`}
          >
            {movies.map((movie: Movie, i) => {
              return (
                <Image
                  onMouseEnter={() =>
                    setTimeout(() => selectAMovie(movie), 150)
                  }
                  key={i}
                  src={`${imgUrl}${backdropSize[1]}${movie.backdrop_path}`}
                  width={285}
                  height={171}
                  alt="movie-pic"
                  className="cursor-pointer hover:scale-105 transition-transform"
                />
              );
            })}
          </div>
          <div
            onClick={incrementSliderIndex}
            className={`handle right-handle`}
          ></div>
        </div>
      </main>
      <InfoModal
        showInfoModal={showInfoModal}
        selectedMovie={selectedMovie}
        setShowInfoModal={setShowInfoModal}
      />
      <VideoModal
        selectedMovie={selectedMovie}
        showVideoModal={showVideoModal}
        setShowVideoModal={setShowVideoModal}
      />
    </section>
  );
}
