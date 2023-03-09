//hooks
import { useState, useEffect, useMemo, CSSProperties } from "react";
import dynamic from "next/dynamic";
import useWindowSize from "../../../hooks/useWindowSize";
import { useAutoAnimate } from "@formkit/auto-animate/react";
//typing
import { Season } from "../../../typing";
//components
import PosterSliderCards from "./PosterSliderCards";
import formatDate from "../../../utils/formatters/formatDate";
const SeasonDescription = dynamic(() => import("./SeasonDescription"), {
  ssr: false,
});

interface Props {
  posters: Season[];
  sliderTitle: string;
}

export default function PosterSlider({ posters, sliderTitle }: Props) {
  const [itemsPerScreen, setItemsPerScreen] = useState(8);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [progressBarItems, setProgressBarItems] = useState(0);
  const { width } = useWindowSize();
  const memoWidth = useMemo(() => width, [width]);
  const [seasonDetails, setSeasonDetails] = useState<Season | null>();
  const [sliderRef] = useAutoAnimate<HTMLElement>();
  const [descriptionRef] = useAutoAnimate<HTMLDivElement>();

  //set sliders items per screen based on screen width
  useEffect(() => {
    if (memoWidth !== undefined) {
      setItemsPerScreen(memoWidth * 2);
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

  // This component has css classes mixed with tailwind classes
  return (
    <section
      ref={sliderRef}
      className="sm:py-2"
      id="slider-section"
      onMouseLeave={() => setSeasonDetails(null)}
    >
      <main className="flex flex-col gap-3" id="slider-row">
        {/* HEADER */}

        <div className="header px-4 lg:px-14">
          <h2
            className="text-xl tracking-wide 
    border-l-4 border-red pl-2 mb-2 md:mb-0 hidden sm:block"
          >
            {sliderTitle}
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
                <PosterSliderCards
                  key={i}
                  media={media}
                  setDetails={() => setSeasonDetails(media)}
                />
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

      {seasonDetails && (
        <div
          ref={descriptionRef}
          className="bg-midgray/20 mx-6 sm:mx-12 sm:my-4 rounded-md z-50
            border-smokewt border p-1 w-fit
            min-h-[200px]"
        >
          <SeasonDescription title="Título" value={seasonDetails?.name} />
          {seasonDetails?.overview && (
            <SeasonDescription
              title="Descrição"
              value={seasonDetails?.overview}
            />
          )}{" "}
          <SeasonDescription
            title="Episódios"
            value={seasonDetails?.episode_count}
          />
          <SeasonDescription
            title="Ao ar em"
            value={formatDate(seasonDetails?.air_date, { dateStyle: "medium" })}
          />
        </div>
      )}
    </section>
  );
}
