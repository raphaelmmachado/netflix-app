//hooks
import { useContext, lazy, Suspense } from "react";
import useList from "../../hooks/useList";
//context
import { Context } from "../../context/ContextProvider";
//components
import MovieSlider from "../home/slider/MovieSlider";
import BannerText from "../home/banner/BannerText";
import PlayButton from "../home/banner/PlayButton";
import ListButton from "../home/banner/ListButton";
import DetailsButton from "../home/banner/DetailsButton";
const VideoModal = lazy(() => import("../modal/VideoModal"));
//constants
import tmdbApiConfig from "../../constants/apiConfiguration";

interface Props {
  children?: JSX.Element | JSX.Element[];
  title: string;
}

export default function ListComponent({ title }: Props) {
  const { selectedMedia, setShowVideoModal, myList, setMyList } =
    useContext(Context);
  const { writeUserList } = useList();

  //image url
  const BASE_URL = tmdbApiConfig.images.secure_base_url;
  const SIZE = tmdbApiConfig.images.backdrop_sizes[2];

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
                  genres={selectedMedia.genre_ids}
                  mediaType={selectedMedia.title ? "movie" : "tv"}
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
                      import("../../utils/addMediaToList").then((module) =>
                        module.default(selectedMedia, myList, setMyList)
                      );
                      writeUserList();
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
            <MovieSlider medias={myList} title={title} />
          </div>
          <Suspense>
            <VideoModal mediaType={selectedMedia.title ? "movie" : "tv"} />
          </Suspense>
        </main>
      )}
    </>
  );
}
