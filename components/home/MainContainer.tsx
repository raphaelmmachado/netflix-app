//hooks //context
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  lazy,
  Suspense,
} from "react";
import { Context } from "../../context/ContextProvider";
import { useSwipeable } from "react-swipeable";
import useList from "../../hooks/useList";
//components
import MovieSlider from "./slider/MovieSlider";
import BannerText from "./banner/BannerText";
import PlayButton from "./banner/PlayButton";
import ListButton from "./banner/ListButton";
import DetailsButton from "./banner/DetailsButton";
//lazy components
const VerticalScroller = lazy(() => import("./banner/VerticalScroller"));
const VideoModal = lazy(() => import("../modal/VideoModal"));
const Loading = lazy(() => import("../auth/Loading"));

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
  setIndex: Dispatch<SetStateAction<number>>;
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
  const { writeUserList } = useList();

  // change index when user swipes
  const swipeHandler = useSwipeable({
    onSwipedUp: () =>
      setIndex((prev) => (prev + 1 > bars - 1 ? prev : prev + 1)),
    onSwipedDown: () => setIndex((prev) => (prev - 1 < 0 ? prev : prev - 1)),
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
      {selectedMedia ? (
        <main
          {...swipeHandler}
          id="banner"
          className="banner"
          style={{
            backgroundImage: `url(${BASE_URL}${SIZE}/${selectedMedia?.backdrop_path})`,
          }}
        >
          <div className="banner-wrapper" id="banner-wrapper">
            <div className="banner-center" id="banner-center">
              <section className="banner-center-left" id="banner-center-left">
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

                <div className="banner-center-left-buttons">
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
                      writeUserList();
                    }}
                  />
                  <DetailsButton
                    mediaType={mediaType!}
                    selectedMediaType={selectedMedia.media_type}
                    id={selectedMedia.id}
                    className={"banner-button bg-black text-smokewt"}
                    iconType={"outline"}
                  />
                </div>
              </section>
              <Suspense>
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
              </Suspense>
            </div>

            <MovieSlider medias={medias} title={title} />
          </div>
          <Suspense>
            <VideoModal mediaType={mediaType} />
          </Suspense>
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}
