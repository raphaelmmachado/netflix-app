//hooks
import { useState, useEffect, useMemo, CSSProperties } from "react";
import { Context } from "../../../context/ContextProvider";
import Image from "next/image";
import useWindowSize from "../../../hooks/useWindowSize";
//utils
import apiConfiguration from "../../../constants/apiConfiguration";
//typing
import { Season } from "../../../typing";
//components

interface Props {
  posters: Season[];
}

export default function MovieSlider({ posters }: Props) {
  const [itemsPerScreen, setItemsPerScreen] = useState(8);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [progressBarItems, setProgressBarItems] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const { width } = useWindowSize();
  const memoWidth = useMemo(() => width, [width]);

  //set sliders items per screen based on screen width
  useEffect(() => {
    if (memoWidth !== undefined) {
      setItemsPerScreen(memoWidth * 3);
      const math = Math.ceil(posters.length / itemsPerScreen);
      setProgressBarItems(math);
    }
  }, [posters.length, memoWidth, itemsPerScreen]);

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

  const BASE_URL = apiConfiguration.images.secure_base_url;
  const POSTER_SIZE = apiConfiguration.images.poster_sizes[2];

  // This component has css classes mixed with tailwind classes
  return (
    <section className="sm:py-2" id="slider-section">
      <main className="flex flex-col gap-3" id="slider-row">
        {/* HEADER */}

        <div className="header px-4 lg:px-14">
          <h2 className="text-midgray text-lg">Temporadas</h2>
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
            id="poster-slider"
            style={
              {
                "--slider-index": sliderIndex,
                "--posters-per-screen": itemsPerScreen,
              } as CSSProperties
            }
            className="poster-slider relative"
          >
            {/* CARDS */}
            {posters.map((media: Season, i) => {
              return (
                <div
                  className="poster relative flex flex-col justify-end items-center"
                  key={i}
                >
                  <Image
                    tabIndex={i}
                    onMouseEnter={() => setShowDescription(true)}
                    onMouseLeave={() => setShowDescription(false)}
                    src={`${BASE_URL}${POSTER_SIZE}/${media.poster_path}`}
                    alt={media.name}
                    width={110}
                    height={110}
                    className="hover:cursor-pointer rounded-md ring-black hover:ring-white ring-2"
                  />
                </div>
              );
            })}
            {<div id="modal" className="absolute w-[500px] bg-black"></div>}
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
