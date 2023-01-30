//hooks
import { useState, useContext, useCallback, useEffect } from "react";
import { ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, database } from "../../utils/firebaseConfig";
//context
//components
import Image from "next/image";
import MovieSlider from "../home/slider/MovieSlider";
import BannerText from "../home/banner/BannerText";
import PlayButton from "../home/banner/PlayButton";
import ListButton from "../home/banner/ListButton";
import DetailsButton from "../home/banner/DetailsButton";
//types
import { Movie } from "../../typing";
//constants
import tmdbApiConfig from "../../constants/apiConfiguration";
import { Context } from "../../context/ContextProvider";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";

interface Props {
  movies: Movie[];
  children?: JSX.Element | JSX.Element[];
  title: string;
  mediaType?: "tv" | "movie";
}

export default function ListComponent({ movies, title, mediaType }: Props) {
  const [selectedMovie, setSelectedMovie] = useState<Movie>(movies[0]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [user] = useAuthState(auth);

  const { myList, setMyList } = useContext(Context);

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
        // IN CASE SELECTED MOVIE CAN NOT BE ACESSED
        <main className=" bg-black">
          <section className="min-h-[100vh] w-full flex flex-col items-center justify-center gap-4">
            <Image
              src="/assets/NetflixLogoSvg.svg"
              alt="netflix-logo"
              width={200}
              height={100}
            />
            <h1>Lista de filmes vazia</h1>
            <button className="bg-white rounded-md text-black font-bold px-6 gap-2 py-2">
              <ArrowUpIcon />
              <>Voltar</>
            </button>
          </section>
        </main>
      )}
    </>
  );
}
