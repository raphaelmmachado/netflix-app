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
import { Media } from "../../typing";
//constants
import tmdbApiConfig from "../../constants/apiConfiguration";
import { Context } from "../../context/ContextProvider";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";

interface Props {
  medias: Media[];
  children?: JSX.Element | JSX.Element[];
  title: string;
}

export default function ListComponent({ medias, title }: Props) {
  const [user] = useAuthState(auth);

  const { selectedMedia, setShowVideoModal, myList, setMyList } =
    useContext(Context);

  // add movie to user list
  const handleAddToList = (movie: Media) => {
    if (myList.some((item) => item.id === movie.id)) {
      setMyList((prevList: Media[]) =>
        [...prevList].filter((item) => item.id !== movie.id)
      );
    } else {
      setMyList((prevList: Media[]) => [...prevList, movie]);
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
      {selectedMedia && (
        <main
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
                  firstAired={selectedMedia.first_air_date!}
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
                      myList.some((item) => item.id === selectedMedia.id)
                    }
                    addToList={() => {
                      handleAddToList(selectedMedia);
                    }}
                  />

                  <DetailsButton
                    selectedMediaType={selectedMedia.media_type}
                    id={selectedMedia.id}
                    className={"banner-button bg-black text-smokewt"}
                    iconType={"outline"}
                    // since in list we have mixed types. i did on
                    mediaType={
                      selectedMedia.title && !selectedMedia.name
                        ? "movie"
                        : "tv"
                    }
                  />
                </div>
              </section>
            </div>
            <MovieSlider medias={medias} title={title} />
          </div>
        </main>
      )}
    </>
  );
}
