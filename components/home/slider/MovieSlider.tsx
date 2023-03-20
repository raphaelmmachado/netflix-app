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
//next
import { useRouter } from "next/router";
import Image from "next/image";

//libraries
import { useAutoAnimate } from "@formkit/auto-animate/react";

//custom-hooks
import useWindowSize from "../../../hooks/useWindowSize";
//constants
import apiConfiguration from "../../../constants/apiConfiguration";
import placeholderImage from "../../../constants/placeholderImage";
//typing
import { Media } from "../../../typing";
import slugify from "../../../utils/formatters/slugfy";
//utils
import {
  arrowRightKeyPressed,
  arrowRightLeftPressed,
} from "../../../utils/checkKeyboardKeys";
import { decrementIndex, incrementIndex } from "../../../utils/indexCounter";

interface IMovieSlider {
  medias: Media[];
  title: string;
}

export default function MovieSlider({ medias, title }: IMovieSlider) {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [progressBarItems, setProgressBarItems] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const { selectedMedia, setSelectedMedia } = useContext(Context);
  const router = useRouter();
  const { width } = useWindowSize();
  const itemsPerScreen = useMemo(() => width, [width]);
  const [sliderRef] = useAutoAnimate<HTMLDivElement>();

  const selectAMedia = useCallback(
    (media: Media, index: number) => {
      setSelectedMedia({ ...media, index: index });
    },
    [selectedMedia]
  );

  //set sliders items per screen based on screen width
  useEffect(() => {
    if (itemsPerScreen !== undefined) {
      // setItemsPerScreen(memoWidth);
      const math = Math.ceil(medias.length / itemsPerScreen);
      setProgressBarItems(math);
    }
    //if mobile, select media when clicking on next
    if (itemsPerScreen === 1) {
      selectAMedia(medias[cardIndex], cardIndex);
    }
  }, [medias.length, cardIndex, itemsPerScreen]);

  const BASE_URL = apiConfiguration.images.secure_base_url;
  const POSTER_SIZE = apiConfiguration.images.poster_sizes;

  const poster = `${BASE_URL}${POSTER_SIZE[3]}/`;

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
              // setCardIndex is basically a function that starts at zero that increments if clicked on arrow right
              // or decrements if clicked on arrow left
              if (itemsPerScreen && itemsPerScreen < 2) {
                import("../../../utils/indexCounter").then((module) =>
                  module.incrementIndex(setCardIndex, medias.length)
                );
              }
              import("../../../utils/indexCounter").then((module) => {
                module.decrementIndex(setSliderIndex, progressBarItems);
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
                  className="card max-h-max relative
                   hover:cursor-pointer group"
                  key={i}
                  onMouseEnter={() => selectAMedia(media, i)}
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
                      selectAMedia(media, i);
                    }
                  }}
                >
                  <Image
                    src={`${poster}${media.poster_path}`}
                    blurDataURL={placeholderImage}
                    placeholder="blur"
                    alt="movie-pic"
                    width={150}
                    height={150}
                    style={{ height: "auto" }}
                    title={media.title ?? media.name}
                    className={`hover:cursor-pointer flex-1 rounded-md group-hover:ring-white ring-2 ${
                      selectedMedia?.id === media.id
                        ? "ring-white"
                        : "ring-black/20"
                    }`}
                  />
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
                import("../../../utils/indexCounter").then((module) =>
                  module.incrementIndex(setCardIndex, medias.length)
                );
              }
              import("../../../utils/indexCounter").then((module) =>
                module.incrementIndex(setSliderIndex, progressBarItems)
              );
            }}
            className={`handle right-handle`}
          ></div>
        </div>
      </div>
    </section>
  );
}
