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
}

export default function MovieSlider({ medias, title }: IMovieSlider) {
  const [itemsPerScreen, setItemsPerScreen] = useState(5);
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

  const BASE_URL = apiConfiguration.images.secure_base_url;
  const BACKDROP_SIZE = apiConfiguration.images.backdrop_sizes;

  // This component has css classes mixed with tailwind classes
  return (
    <section className="sm:py-2" id="slider-section">
      <main className="flex flex-col gap-3" id="slider-row">
        <div className="header px-4 lg:px-14">
          <h2
            className="text-xl tracking-wide 
    border-l-4 border-red pl-2 mb-2 md:mb-0 hidden sm:block"
          >
            {title}
          </h2>
          {/* PROGRESS BARS */}
          <div className="progress-bar hidden md:inline-flex">
            {Array(progressBarItems)
              .fill("")
              .map((item, i) => {
                return (
                  <div
                    onClick={() => setSliderIndex(i)}
                    key={i}
                    className={`progress-item cursor-pointer rounded-sm
                 ${i === sliderIndex ? "active" : ""}`}
                  ></div>
                );
              })}
          </div>
        </div>
        <div id="container" className="carousel select-none">
          {/* ARROW LEFT */}
          <div
            onClick={() =>
              import("../../../utils/scrollSlider").then((module) => {
                module.decrementSliderIndex(setSliderIndex, progressBarItems);
              })
            }
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
                <div
                  className="card max-h-fit relative flex
                   justify-center items-end
                   hover:cursor-pointer group"
                  key={i}
                  onClickCapture={() => selectAMedia(media)}
                  onKeyDownCapture={(e) =>
                    enterKeyPressed(e.code) && selectAMedia(media)
                  }
                >
                  <Image
                    tabIndex={i}
                    src={`${BASE_URL}${BACKDROP_SIZE[0]}/${media.backdrop_path}`}
                    alt="movie-pic"
                    width={315}
                    height={177}
                    style={{ height: "auto" }}
                    className="hover:cursor-pointer rounded-md ring-black group-hover:ring-white ring-2"
                  />
                  <span className="absolute w-[98%]">
                    <h1 className="text-start text-sm sm:text-base md:text-lg px-2 py-1 text-smokewt bg-black/50 rounded-md">
                      {media.name ?? media.title}
                    </h1>
                  </span>
                </div>
              );
            })}
          </div>

          {/* ARROW RIGHT */}
          <div
            onClick={() =>
              import("../../../utils/scrollSlider").then((module) =>
                module.incrementSliderIndex(setSliderIndex, progressBarItems)
              )
            }
            className={`handle right-handle`}
          ></div>
        </div>
      </main>
    </section>
  );
}
