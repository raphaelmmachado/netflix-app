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

  //set sliders items per screen based on screen width
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

  // This component has css classes mixed with tailwind classes
  return (
    <section className="slider-section" id="slider-section">
      <main className="flex flex-col gap-3" id="slider-row">
        <div className="header slider-section-header">
          <h2 className="slider-title">{title}</h2>

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
                  onMouseEnter={() => setSelectedMovie(movie)}
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
        mediaType={mediaType}
      />
    </section>
  );
}
