import {
  useState,
  useEffect,
  useContext,
  CSSProperties,
  Dispatch,
  SetStateAction,
} from "react";
import Image from "next/image";
import apiConfiguration from "../../utils/apiConfiguration";
import { IVideoRequest, Movie } from "../../typing";
import useWindowSize from "../../hooks/useWindowSize";
import { Context } from "../../context/ContextProvider";

interface IMovieSlider {
  movies: Movie[];
  trailers: IVideoRequest[];
  title: string;
  setHighlighted: Dispatch<SetStateAction<Movie>>;
}

export default function Scroller({
  movies,
  title,
  setHighlighted,
  trailers,
}: IMovieSlider) {
  const [itemsPerScreen, setItemsPerScreen] = useState(4);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [progressBarItems, setProgressBarItems] = useState(0);
  const { width } = useWindowSize();
  const { setVideo } = useContext(Context);

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
                  onClick={() => {
                    setHighlighted(movie);
                    if (trailers[i].results) setVideo(trailers[i]?.results[0]);
                  }}
                  key={i}
                  src={`${imgUrl}${backdropSize[1]}${movie.backdrop_path}`}
                  width={285}
                  height={171}
                  alt="movie-pic"
                  className="cursor-pointer"
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
    </section>
  );
}
