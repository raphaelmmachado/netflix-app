//hooks //context
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import dynamic from "next/dynamic";
import { Context } from "../../context/ContextProvider";

//components
import MovieSlider from "./slider/MovieSlider";
import BannerText from "./banner/BannerText";
import PlayButton from "./banner/PlayButton";
import ListButton from "./banner/ListButton";
import DetailsButton from "./banner/DetailsButton";
//lazy components
const VerticalScroller = dynamic(() => import("./banner/VerticalScroller"));
const VideoModal = dynamic(() => import("../modal/VideoModal"), { ssr: false });
//custom hook
import useMouseIdle from "../../hooks/useIdle";
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
    modalOpen,
    setModalOpen,
  } = useContext(Context);

  const [count, setCount] = useState(0);

  const isIdle = useMouseIdle(3000);

  //first item of the slider to be the default media
  useEffect(() => {
    setSelectedMedia({ ...medias[0], index: 0 });
  }, []);

  //slider counter continue from last selected media
  useEffect(() => {
    setCount((prev) => (selectedMedia?.index ? selectedMedia?.index : prev));
  }, [selectedMedia]);

  // //slideshow
  useEffect(() => {
    isIdle && !modalOpen && setSelectedMedia(medias[count]);

    // if user is idle, select next media like an slideshow
    const interval = setTimeout(() => {
      setCount((prevCount) =>
        prevCount + 1 > medias.length - 1 ? 0 : prevCount + 1
      );
    }, 10000);
    console.log({ count, isIdle, modalOpen });
    return () => clearInterval(interval);
  }, [count, isIdle]);

  //tmdb image url
  const BASE_URL = tmdbApiConfig.images.secure_base_url;
  const SIZE = tmdbApiConfig.images.backdrop_sizes[2];

  return (
    <>
      {selectedMedia && (
        <main
          id="banner"
          className="min-h-screen md:min-h-[100.1dvh] relative aspect-video w-screen h-screen
           bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url(${BASE_URL}${SIZE}/${selectedMedia?.backdrop_path})`,
            transition: "background-image 500ms ease-in-out",
          }}
        >
          <div
            className="pt-16 pb-10 sm:py-8 sm:pl-14 flex flex-col-reverse tall:flex-col sm:flex-col justify-center
             sm:justify-between bg-gradient-to-b sm:bg-gradient-to-r  from-black
             via-black/70 to-black/25 absolute h-full
              w-full"
            id="banner-wrapper"
          >
            <section
              className="flex flex-col sm:flex-row justify-evenly 
               sm:justify-between items-center flex-grow"
              id="banner-center"
            >
              <div
                className="flex flex-col justify-center gap-4 md:py-4
                px-1 sm:px-6 md:px-14"
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
                  className="grid grid-flow-col place-content-center sm:place-content-start 
                  text-sm sm:text-base xs:gap-2 sm:gap-6"
                >
                  <PlayButton
                    minimalist={false}
                    showModal={() => {
                      setShowVideoModal(true);
                      setModalOpen(true);
                    }}
                  />

                  <ListButton
                    minimalist={false}
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
                    minimalist={false}
                    mediaType={mediaType!}
                    selectedMediaType={selectedMedia.title ? "movie" : "tv"}
                    id={selectedMedia.id}
                    slug={selectedMedia?.title ?? selectedMedia.name}
                    iconType={"outline"}
                  />
                </div>
              </div>

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
            </section>

            <MovieSlider medias={medias} title={title} />
          </div>

          <VideoModal mediaType={mediaType} />
        </main>
      )}
    </>
  );
}
