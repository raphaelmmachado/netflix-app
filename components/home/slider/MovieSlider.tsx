//hooks
import {
  useState,
  useEffect,
  useMemo,
  CSSProperties,
  useCallback,
  useContext,
} from "react";
import { Context } from "../../../context/ContextProvider";
import Image from "next/image";
import useWindowSize from "../../../hooks/useWindowSize";
//utils
import apiConfiguration from "../../../constants/apiConfiguration";
//typing
import { Media } from "../../../typing";
//components
import enterKeyPressed from "../../../utils/checkKeyboardKeys";

interface IMovieSlider {
  medias: Media[];
  title: string;
  mediaType?: "tv" | "movie";
}

export default function MovieSlider({
  medias,
  title,
  mediaType,
}: IMovieSlider) {
  const [itemsPerScreen, setItemsPerScreen] = useState(4);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [progressBarItems, setProgressBarItems] = useState(0);

  const { selectedMedia, setSelectedMedia } = useContext(Context);

  const { width } = useWindowSize();
  const memoWidth = useMemo(() => width, [width]);

  const selectAMedia = useCallback(
    (media: Media) => {
      setSelectedMedia(media);
    },
    [selectedMedia]
  );

  //set sliders items per screen based on screen width
  useEffect(() => {
    if (memoWidth !== undefined) {
      setItemsPerScreen(memoWidth);
      const math = Math.ceil(medias.length / itemsPerScreen);
      setProgressBarItems(math);
    }
  }, [medias.length, memoWidth, itemsPerScreen]);

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
            {medias.map((media: Media, i) => {
              return (
                <div className="card" key={i}>
                  <Image
                    tabIndex={i}
                    onClick={() => selectAMedia(media)}
                    onKeyDown={(e) =>
                      enterKeyPressed(e.code) && selectAMedia(media)
                    }
                    src={`${imgUrl}${backdropSize[1]}/${media.backdrop_path}`}
                    alt="movie-pic"
                    width={315}
                    height={177}
                    className="hover:cursor-pointer rounded-md ring-black hover:ring-white ring-2"
                  />
                  <p className="absolute bg-black/60 w-[98%] text-center text-sm">
                    {media.name ?? media.title}
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
    </section>
  );
}
