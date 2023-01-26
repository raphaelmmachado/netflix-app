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
import { auth, database } from "../../utils/firebaseConfig";
//context
//components
import Image from "next/image";
import MovieSlider from "./slider/MovieSlider";
import Header from "./header/Header";
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

  const { myList, setMyList } = useContext(Context);

  // change index when user swipes
  const swipeHandler = useSwipeable({
    onSwipedUp: () =>
      setIndex((prev) => (prev + 1 > bars - 1 ? prev : prev + 1)),
    onSwipedDown: () => setIndex((prev) => (prev - 1 < 0 ? prev : prev - 1)),
  });

  // add movie to user list
  const handleAddToList = (movie: Movie) => {
    if (myList.some((item) => item.id === movie.id)) {
      setMyList((prevList: Movie[]) =>
        [...prevList].filter((item) => item.id !== movie.id)
      );
    } else {
      setMyList((prevList: Movie[]) => [...prevList, movie]);
    }
    writeUserList();
  };
  const writeUserList = useCallback(async () => {
    if (myList.length > 0)
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
            <Header />
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
                    }}
                  />
                  <ListButton
                    added={
                      myList &&
                      myList.some((item) => item.id === selectedMovie.id)
                    }
                    addToList={() => {
                      handleAddToList(selectedMovie);
                    }}
                  />
                  <DetailsButton showModal={() => setShowInfoModal(true)} />
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
