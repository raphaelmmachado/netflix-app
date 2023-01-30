//hooks
import {
  useState,
  useEffect,
  useMemo,
  CSSProperties,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import Image from "next/image";
import useWindowSize from "../../../hooks/useWindowSize";
//utils
import apiConfiguration from "../../../constants/apiConfiguration";
//typing
import { Movie } from "../../../typing";
//components
import InfoModal from "../../modal/InfoModal";
import VideoModal from "../../modal/VideoModal";
import enterKeyPressed from "../../../utils/checkKeyboardKeys";

interface IMovieSlider {
  movies: Movie[];
  selectedMovie: Movie;
  title: string;
  mediaType?: "tv" | "movie";
  setSelectedMovie: Dispatch<SetStateAction<Movie>>;
  showVideoModal: boolean;
  showInfoModal: boolean;
  setShowInfoModal: Dispatch<SetStateAction<boolean>>;
  setShowVideoModal: Dispatch<SetStateAction<boolean>>;
}

export default function MovieSlider({
  movies,
  title,
  mediaType,
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
  const memoWidth = useMemo(() => width, [width]);

  const selectAMovie = useCallback(
    (movie: Movie) => {
      setSelectedMovie(movie);
    },
    [selectedMovie]
  );

  //set sliders items per screen based on screen width
  useEffect(() => {
    if (memoWidth !== undefined) {
      setItemsPerScreen(memoWidth);
      const math = Math.ceil(movies.length / itemsPerScreen);
      setProgressBarItems(math);
    }
  }, [movies.length, memoWidth, itemsPerScreen]);

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

  // This component has css classes mixed with tailwind classes
  return (
    <section className="slider-section" id="slider-section">
      <main className="flex flex-col gap-3" id="slider-row">
        <div className="header slider-section-header">
          <h2 className="slider-title">{title}</h2>
          {/* PROGRESS BARS */}
          <div className="progress-bar hidden md:inline-flex">
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
          {/* ARROW LEFT */}
          <div
            onClick={decrementSliderIndex}
            className={`handle left-handle`}
          ></div>
          {/* SLIDER */}
          <div
            id="slider"
            style={
              {
                "--slider-index": sliderIndex,
                "--items-per-screen": itemsPerScreen,
              } as CSSProperties
            }
            className="slider"
          >
            {/* CARDS */}
            {movies.map((movie: Movie, i) => {
              return (
                <div className="card" key={i}>
                  <Image
                    tabIndex={i}
                    onClick={() => selectAMovie(movie)}
                    onKeyDown={(e) =>
                      enterKeyPressed(e.code) && selectAMovie(movie)
                    }
                    src={`${imgUrl}${backdropSize[1]}${movie.backdrop_path}`}
                    alt="movie-pic"
                    width={315}
                    height={177}
                    className="hover:cursor-pointer rounded-sm ring-black hover:ring-white ring-2"
                  />
                  <p className="absolute bg-black/60 w-full text-center text-sm px-1">
                    {movie.name ?? movie.title}
                  </p>
                </div>
              );
            })}
          </div>

          {/* ARROW RIGHT */}
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
        mediaType={mediaType}
      />
      <VideoModal
        selectedMovie={selectedMovie}
        showVideoModal={showVideoModal}
        setShowVideoModal={setShowVideoModal}
        mediaType={mediaType}
      />
    </section>
  );
}
