//hooks
import {
  Dispatch,
  SetStateAction,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { useSwipeable } from "react-swipeable";
import { ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, database, fetchDB } from "../../utils/firebaseConfig";
//context
//components
import MovieSlider from "./slider/MovieSlider";
import BannerText from "./banner/BannerText";
import PlayButton from "./banner/PlayButton";
import ListButton from "./banner/ListButton";
import DetailsButton from "./banner/DetailsButton";
import VerticalScroller from "./banner/VerticalScroller";
import Loading from "../auth/Loading";
//types
import { Movie } from "../../typing";
//constants
import tmdbApiConfig from "../../constants/apiConfiguration";
import { Context } from "../../context/ContextProvider";
//utils
import addMovieToList from "../../utils/addMovieToList";

interface Props {
  movies: Movie[];
  children?: JSX.Element | JSX.Element[];
  title: string;
  bars: number;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  mediaType?: "tv" | "movie";
}

export default function MainContainer({
  movies,
  title,
  mediaType,
  bars,
  index,
  setIndex,
}: Props) {
  const [selectedMovie, setSelectedMovie] = useState<Movie>(movies[0]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [user] = useAuthState(auth);

  const { myList, setMyList, setModalOpen } = useContext(Context);

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
        .then((res: Movie[]) => setMyList(res))
        .catch((e) => console.log(e)),
    [myList]
  );

  useEffect(() => {
    getList();
  }, []);

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
      {selectedMovie ? (
        // banner
        <main
          {...swipeHandler}
          id="banner"
          className="banner"
          style={{
            backgroundImage: `url(${BASE_URL}${SIZE}/${selectedMovie?.backdrop_path})`,
          }}
        >
          <div className="banner-wrapper" id="banner-wrapper">
            <div className="banner-center" id="banner-center">
              <section className="banner-center-left" id="banner-center-left">
                <BannerText
                  title={selectedMovie.title ?? selectedMovie.name}
                  description={selectedMovie.overview}
                  rating={selectedMovie.vote_average.toFixed(1)}
                  release_date={selectedMovie?.release_date}
                  typeOfShow={selectedMovie.media_type}
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
                      myList.some((item) => item.id === selectedMovie.id)
                    }
                    addToList={() => {
                      addMovieToList(selectedMovie, myList, setMyList);
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
            <MovieSlider
              movies={movies}
              title={title}
              mediaType={mediaType}
              selectedMovie={selectedMovie}
              setSelectedMovie={(movie) => setSelectedMovie(movie)}
              showInfoModal={showInfoModal}
              showVideoModal={showVideoModal}
              setShowVideoModal={setShowVideoModal}
              setShowInfoModal={setShowInfoModal}
            />
          </div>
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}
