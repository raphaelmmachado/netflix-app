import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/ContextProvider";
import Image from "next/image";
//components
import MediaComponent from "./video/MediaComponent";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import FilmIcon from "@heroicons/react/24/solid/FilmIcon";
import VideoLinks from "./video/VideoLinks";
// typing
import { IVideo, MediaType, YTIds } from "../../typing";
//utils
import { getTrailers } from "../../utils/getTrailers";
import { searchYoutubeVideos } from "../../utils/searchYoutubeVideos";
import apiConfiguration from "../../constants/apiConfiguration";
import VideoTags from "./video/VideoTags";
const base_url = apiConfiguration.images.secure_base_url;
const size = apiConfiguration.images.poster_sizes[2];

export default function VideoModal({ mediaType }: MediaType) {
  const { selectedMedia, showVideoModal, setShowVideoModal, setModalOpen } =
    useContext(Context);
  const [showVideo, setShowVideo] = useState(false);
  const [DBVideos, setDBVideos] = useState<IVideo[] | undefined>(undefined);
  const [YTAPIVideos, setYTAPIVideos] = useState<YTIds[]>([]);
  const [videoIndex, setVideoIndex] = useState(0);
  type Results = {
    results: IVideo[];
  };

  //check if DB has video
  useEffect(() => {
    const type = selectedMedia?.media_type;
    const id = selectedMedia?.id;
    selectedMedia &&
      id &&
      getTrailers({ mediaType, type, id })
        .then(({ results }: Results) => {
          if (results.length < 1) {
            setDBVideos(undefined);
            searchOnYT();
          } else {
            setDBVideos(results);
          }
        })
        .catch((error) =>
          console.log({
            error: error,
            mensagem:
              "Não encontramos video em português. Usaremos API do youtube para buscar videos",
          })
        );

    return () => setDBVideos(undefined);
  }, [showVideoModal]);

  //if not search on youtube
  function searchOnYT() {
    let query = "";
    if (selectedMedia?.title) {
      query = `filme ${selectedMedia.title} trailer teaser oficial`;
    }
    if (selectedMedia?.name || selectedMedia?.original_name) {
      query = `serie ${
        selectedMedia.name ?? selectedMedia.original_name
      } cena trailer oficial`;
    }
    selectedMedia &&
      searchYoutubeVideos(query)
        .then((res) => {
          res && setYTAPIVideos(res);
        })
        .catch((err) => console.log(err));
  }

  return (
    <>
      {showVideoModal && selectedMedia && (
        <section id="modal" className="video-modal">
          <div className="video-modal-container" id="video-modal-container">
            <header className="video-modal-header" id="modal_header">
              <h1 className="text-lg">
                {selectedMedia.title ??
                  selectedMedia.name ??
                  selectedMedia.original_name}
              </h1>

              <span className="flex items-center gap-3">
                {showVideo && (
                  <button onClick={() => setShowVideo(false)}>
                    <FilmIcon className="w-7 h-7 text-white  hover:bg-gray/30 rounded-sm" />
                  </button>
                )}

                <button
                  onClick={() => {
                    setShowVideo(false);
                    setShowVideoModal(false);
                    setModalOpen(false);
                  }}
                >
                  <XMarkIcon className="w-8 h-8 text-white hover:bg-gray/30 rounded-sm" />
                </button>
              </span>
            </header>
            <main>
              {showVideo ? (
                <MediaComponent
                  videoIndex={videoIndex}
                  selectedVideo={DBVideos}
                  youtubeVideos={YTAPIVideos}
                  clearVideo={() => {
                    setDBVideos(undefined);
                    setShowVideo(false);
                  }}
                />
              ) : (
                <article className="grid grid-rows-1 grid-cols-2 place-content-center place-items-start p-4 bg-black">
                  <div className="font-thin place-self-center">
                    {" "}
                    <p>{selectedMedia.overview}</p>
                  </div>
                  <Image
                    src={`${base_url}${size}/${selectedMedia?.poster_path}`}
                    width={170}
                    height={285}
                    alt="poster image"
                    className="place-self-center"
                  />
                  <VideoTags mediaType={mediaType} />
                </article>
              )}
            </main>
            <footer className="w-full bg-black flex flex-wrap gap-4 border-t border-gray">
              <>
                {DBVideos &&
                  DBVideos?.map((item, i) => {
                    return (
                      <VideoLinks
                        key={i}
                        type={item.type}
                        site={item.site}
                        onClick={() => {
                          setVideoIndex(i);
                          setShowVideo(true);
                        }}
                      />
                    );
                  })}
                {YTAPIVideos &&
                  !DBVideos &&
                  YTAPIVideos?.map((item, i) => {
                    return (
                      <VideoLinks
                        key={i}
                        site={"YouTube"}
                        type={"Youtube"}
                        onClick={() => {
                          setVideoIndex(i);
                          setShowVideo(true);
                        }}
                      />
                    );
                  })}
                {!YTAPIVideos && !DBVideos && (
                  <h1 className="text-red pl-1">
                    Não encontramos trailers em português
                  </h1>
                )}
              </>
            </footer>
          </div>
        </section>
      )}
    </>
  );
}
