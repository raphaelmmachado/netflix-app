//hooks //context
import {
  Dispatch,
  SetStateAction,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { Context } from "../../context/ContextProvider";
import { useSwipeable } from "react-swipeable";
import { ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
//components
import MovieSlider from "./slider/MovieSlider";
import BannerText from "./banner/BannerText";
import PlayButton from "./banner/PlayButton";
import ListButton from "./banner/ListButton";
import DetailsButton from "./banner/DetailsButton";
import VerticalScroller from "./banner/VerticalScroller";
import InfoModal from "../modal/InfoModal";
import VideoModal from "../modal/VideoModal";
import Loading from "../auth/Loading";
//types
import { Media } from "../../typing";
//constants
import tmdbApiConfig from "../../constants/apiConfiguration";
//utils
import addMovieToList from "../../utils/addMediaToList";
import { auth, database, fetchDB } from "../../utils/firebaseConfig";

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
  const [user] = useAuthState(auth);

  const {
    selectedMedia,
    setSelectedMedia,
    setShowVideoModal,
    setShowInfoModal,
    myList,
    setMyList,
    setModalOpen,
  } = useContext(Context);

  // change index when user swipes
  const swipeHandler = useSwipeable({
    onSwipedUp: () =>
      setIndex((prev) => (prev + 1 > bars - 1 ? prev : prev + 1)),
    onSwipedDown: () => setIndex((prev) => (prev - 1 < 0 ? prev : prev - 1)),
  });

  // when component loads, get items from firebase and put it in context list
  const getList = useCallback(
    () =>
      fetchDB(`${user?.uid}/list`)
        .then((res: Media[]) => setMyList(res))
        .catch((e) => console.log(e)),
    [myList]
  );

  useEffect(() => {
    setSelectedMedia(medias[0]);
    getList();
  }, []);

  // put list on firebase DB
  const writeUserList = useCallback(async () => {
    if (myList && myList.length > 0)
      await set(ref(database, `${user?.uid}/list`), myList);
  }, [myList]);

  useEffect(() => {
    writeUserList();
  }, [writeUserList]);

  const BASE_URL = tmdbApiConfig.images.secure_base_url;
  const SIZE = tmdbApiConfig.images.backdrop_sizes[2];
  //
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
                  release_date={selectedMedia?.release_date}
                  typeOfShow={selectedMedia.media_type}
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
                      addMovieToList(selectedMedia, myList, setMyList);
                      writeUserList();
                    }}
                  />
                  <DetailsButton
                    showModal={() => {
                      setShowInfoModal(true);
                      setModalOpen(true);
                    }}
                  />
                </div>
              </section>

              <VerticalScroller
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
            </div>

            <MovieSlider medias={medias} title={title} />
          </div>
          <InfoModal mediaType={mediaType} />
          <VideoModal mediaType={mediaType} />
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}
