// react
import {
  useState,
  useEffect,
  useMemo,
  CSSProperties,
  useCallback,
  useContext,
} from "react";

import { Context } from "../../../context/ContextProvider";
import { useRouter } from "next/router";

//libraries
import { useAutoAnimate } from "@formkit/auto-animate/react";

//custom-hooks
import useWindowSize from "../../../hooks/useWindowSize";
//utils
import apiConfiguration from "../../../constants/apiConfiguration";

//typing
import { Media } from "../../../typing";
import slugify from "../../../utils/formatters/slugfy";

import Image from "next/image";
//components

interface IMovieSlider {
  medias: Media[];
  title: string;
}

export default function MovieSlider({ medias, title }: IMovieSlider) {
  const [itemsPerScreen, setItemsPerScreen] = useState(5);
  const [sliderIndex, setSliderIndex] = useState(0);

  const [progressBarItems, setProgressBarItems] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const { selectedMedia, setSelectedMedia } = useContext(Context);
  const router = useRouter();
  const { width } = useWindowSize();
  const memoWidth = useMemo(() => width, [width]);
  const [sliderRef] = useAutoAnimate<HTMLDivElement>();

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
    if (itemsPerScreen === 1) {
      selectAMedia(medias[cardIndex]);
    }
  }, [medias.length, memoWidth, cardIndex]);

  const BASE_URL = apiConfiguration.images.secure_base_url;
  const BACKDROP_SIZE = apiConfiguration.images.backdrop_sizes;

  let image = `${BASE_URL}${BACKDROP_SIZE[0]}/`;

  // This component has css classes mixed with tailwind classes
  return (
    <section className="sm:py-2" id="slider-section">
      <div className="flex flex-col gap-3" id="slider-row">
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
            onClick={() => {
              // mobile user can select slider media by sliding cards
              // if there is only one item per screen
              if (itemsPerScreen < 2) {
                import("../../../utils/scrollSlider").then((module) =>
                  module.incrementSliderIndex(setCardIndex, medias.length)
                );
              }
              import("../../../utils/scrollSlider").then((module) => {
                module.decrementSliderIndex(setSliderIndex, progressBarItems);
              });
            }}
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
            ref={sliderRef}
          >
            {/* CARDS */}
            {medias.map((media: Media, i) => {
              return (
                <div
                  data-index={i}
                  id="media_slider-card"
                  className="card max-h-fit relative flex
                   justify-center items-end
                   hover:cursor-pointer group"
                  key={i}
                  onMouseEnter={() => selectAMedia(media)}
                  onClickCapture={() => {
                    //i dont want mobile users to navigate to media page
                    // only to highlight a media that have been clicked
                    if (!navigator.userAgent.toLowerCase().includes("mobi")) {
                      const slug = slugify(
                        selectedMedia?.title ?? selectedMedia?.name!
                      );
                      router.push({
                        pathname: `/[type]/detalhes/${slug}`,
                        query: {
                          type: `${selectedMedia?.title ? "filmes" : "series"}`,
                          id: selectedMedia?.id,
                        },
                      });
                    } else {
                      selectAMedia(media);
                    }
                  }}
                >
                  <Image
                    src={`${image}${media.backdrop_path}`}
                    alt="movie-pic"
                    width={315}
                    height={177}
                    style={{ height: "auto" }}
                    title={media.title ?? media.name}
                    className="hover:cursor-pointer rounded-md ring-black group-hover:ring-white ring-2"
                  />
                  <span className="absolute w-[98%]">
                    <h1
                      className=" text-center px-2 py-1 overflow-hidden
                     text-smokewt bg-black/40 rounded-md font-bold sm:font-thin uppercase text-xl  sm:text-base tall:text-base"
                    >
                      {media.name ?? media.title}
                    </h1>
                  </span>
                </div>
              );
            })}
          </div>

          {/* ARROW RIGHT */}
          <div
            onClick={() => {
              // mobile users can select slider media by sliding cards
              // if there is only one item per screen
              if (itemsPerScreen === 1) {
                import("../../../utils/scrollSlider").then((module) =>
                  module.incrementSliderIndex(setCardIndex, medias.length)
                );
              }
              import("../../../utils/scrollSlider").then((module) =>
                module.incrementSliderIndex(setSliderIndex, progressBarItems)
              );
            }}
            className={`handle right-handle`}
          ></div>
        </div>
      </div>
    </section>
  );
}
