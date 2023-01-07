import { useContext, useState, useEffect, CSSProperties } from "react";
import Image from "next/image";
import { Context } from "../../context/ContextProvider";
import apiConfiguration from "../../utils/apiConfiguration";
import { Movie } from "../../typing";
import useWindowSize from "../../hooks/useWindowSize";

interface IMovieSlider {
  movies: Movie[];
  title: string;
  poster: boolean;
  background: boolean;
}

export default function Scroller({
  movies,
  title,
  background,
  poster,
}: IMovieSlider) {
  const { setHighlighted } = useContext(Context);
  const [itemsPerScreen, setItemsPerScreen] = useState(4);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [progressBarItems, setProgressBarItems] = useState(0);
  const { width } = useWindowSize();

  console.log({ itemsPerScreen: width });

  useEffect(() => {
    if (width !== undefined) {
      setItemsPerScreen(width);
      const math = Math.ceil(movies.length / itemsPerScreen);
      setProgressBarItems(math);
    }
    console.log(width, itemsPerScreen);
  }, [, width, itemsPerScreen]);

  const handleHover = (movie: Movie) => {
    setHighlighted(movie);
  };
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
    <section className={`${background ? "bg-black" : ""}  m-0 py-6 shadow-2xl`}>
      <main className="row">
        <div className="header">
          <h2 className="md:text-lg tracking-wide font-bold">{title}</h2>
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
            {movies.map((movie, i) => {
              return (
                <Image
                  onMouseEnter={() => handleHover(movie)}
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
