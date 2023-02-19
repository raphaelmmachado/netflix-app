//hooks //context
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import { Context } from "../../context/ContextProvider";
import { useSwipeable } from "react-swipeable";
//components
import MovieSlider from "./slider/MovieSlider";
import BannerText from "./banner/BannerText";
import PlayButton from "./banner/PlayButton";
import ListButton from "./banner/ListButton";
import DetailsButton from "./banner/DetailsButton";
//lazy components
const VerticalScroller = dynamic(() => import("./banner/VerticalScroller"));
const VideoModal = dynamic(() => import("../modal/VideoModal"));

//types
import { Media } from "../../typing";
//constants
import tmdbApiConfig from "../../constants/apiConfiguration";

interface Props {
  medias: Media[];
  children?: JSX.Element | JSX.Element[];
  title: string;
  bars: number;
  index: number;
  setIndex?: Dispatch<SetStateAction<number>>;
  mediaType?: "tv" | "movie";
}

export default function MainContainer({
  medias,
  title,
  mediaType,
  bars,
  index,
  setIndex,
}: Props) {
  const {
    selectedMedia,
    setSelectedMedia,
    setShowVideoModal,
    myList,
    setMyList,
    setModalOpen,
  } = useContext(Context);

  // function to add item to firebase database

  // change index when user swipes
  const swipeHandler = useSwipeable({
    onSwipedUp: () => {
      setIndex && setIndex((prev) => (prev + 1 > bars - 1 ? prev : prev + 1));
    },
    onSwipedDown: () => {
      setIndex && setIndex((prev) => (prev - 1 < 0 ? prev : prev - 1));
    },
  });
  // select first movie of the slider as the default
  useEffect(() => {
    setSelectedMedia(medias[0]);
  }, []);

  //tmdb image url
  const BASE_URL = tmdbApiConfig.images.secure_base_url;
  const SIZE = tmdbApiConfig.images.backdrop_sizes[2];

  return (
    <>
      {selectedMedia && (
        <main
          {...swipeHandler}
          id="banner"
          className="min-h-[100.1vh] relative bg-cover object-cover
          bg-center bg-no-repeat transition-all ease-linear duration-500"
          style={{
            backgroundImage: `url(${BASE_URL}${SIZE}/${selectedMedia?.backdrop_path})`,
          }}
        >
          <div
            className="py-8 pl-14 flex flex-col justify-evenly sm:justify-between bg-gradient-to-r
          from-black via-black/70 to-black/25 absolute h-full w-full"
            id="banner-wrapper"
          >
            <div
              className="flex flex-col sm:flex-row justify-center sm:justify-between items-center flex-grow-0 sm:flex-grow"
              id="banner-center"
            >
              <section
                className="flex flex-col justify-center gap-4 md:py-4
                px-4 md:px-14"
                id="banner-center-left"
              >
                <BannerText
                  title={selectedMedia.title ?? selectedMedia.name}
                  description={selectedMedia.overview}
                  rating={selectedMedia.vote_average.toFixed(1)}
                  release_date={
                    selectedMedia?.release_date ?? selectedMedia?.first_air_date
                  }
                  genres={selectedMedia.genre_ids}
                  mediaType={selectedMedia.title ? "movie" : "tv"}
                />

                <div
                  className="grid grid-flow-col place-content-start 
                  text-sm sm:text-base gap-2 sm:gap-6"
                >
                  <PlayButton
                    showModal={() => {
                      setShowVideoModal(true);
                      setModalOpen(true);
                    }}
                  />

                  <ListButton
                    added={
                      myList &&
                      myList.some((item) => item.id === selectedMedia.id)
                    }
                    addToList={() => {
                      import("../../utils/addMediaToList").then((module) =>
                        module.default(selectedMedia, myList, setMyList)
                      );
                    }}
                  />
                  <DetailsButton
                    mediaType={mediaType!}
                    selectedMediaType={
                      selectedMedia.title && !selectedMedia.name
                        ? "movie"
                        : "tv"
                    }
                    id={selectedMedia.id}
                    slug={selectedMedia?.title ?? selectedMedia.name}
                    className="flex flex-row items-center justify-evenly
                    gap-2 font-bold px-4 py-2 md:py-2 md:px-6
                   rounded-md bg-black text-smokewt"
                    iconType={"outline"}
                  />
                </div>
              </section>

              {setIndex && (
                <VerticalScroller
                  title={title}
                  bars={bars}
                  index={index}
                  setIndex={(i) => setIndex(i)}
                  goUp={() =>
                    setIndex((prev: number) => (prev - 1 < 0 ? prev : --prev))
                  }
                  goDown={() =>
                    setIndex((prev: number) =>
                      prev + 1 > bars - 1 ? prev : ++prev
                    )
                  }
                />
              )}
            </div>

            <MovieSlider medias={medias} title={title} />
          </div>

          <VideoModal mediaType={mediaType} />
        </main>
      )}
    </>
  );
}
