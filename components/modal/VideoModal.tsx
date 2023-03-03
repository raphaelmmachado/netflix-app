import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/ContextProvider";
import Image from "next/image";
//components
import MediaComponent from "./video/MediaComponent";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import XMarkCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import VideoLinks from "./video/VideoLinks";
// typing
import { IVideo, MediaType, YTIds } from "../../typing";
//utils
import { getTrailers } from "../../utils/requests/getTrailers";
import { searchYoutubeVideos } from "../../utils/requests/searchYoutubeVideos";
import apiConfiguration from "../../constants/apiConfiguration";
import VideoTags from "./video/VideoTags";
const base_url = apiConfiguration.images.secure_base_url;
const size = apiConfiguration.images.poster_sizes[2];
interface Props {
  mediaType?: MediaType;
}
export default function VideoModal({ mediaType }: Props) {
  const { selectedMedia, showVideoModal, setShowVideoModal, setModalOpen } =
    useContext(Context);
  const [showVideo, setShowVideo] = useState(false);
  const [DBVideos, setDBVideos] = useState<IVideo[] | undefined>(undefined);
  const [YTAPIVideos, setYTAPIVideos] = useState<YTIds[]>([]);
  const [videoIndex, setVideoIndex] = useState(0);
  type Results = {
    results: IVideo[];
  };

  //check if tmdb has video
  useEffect(() => {
    // checking if it is a mixed component with both tv and movie items
    // if it is a mixed component, the api will give me "media_type"
    // if it is not, use media type from component
    const type = !selectedMedia?.media_type
      ? selectedMedia?.title
        ? "movie"
        : "tv"
      : selectedMedia?.media_type;
    const id = selectedMedia?.id;
    selectedMedia &&
      id &&
      getTrailers(id, type as MediaType, mediaType)
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
            mensagem: `Não encontramos video em português.
               Usaremos API do youtube para buscar videos`,
          })
        );
    return () => setDBVideos(undefined);
  }, [showVideoModal]);

  //if there is not video, search on youtube
  function searchOnYT() {
    let query = "";
    if (selectedMedia?.title || selectedMedia?.original_title) {
      query = `filme ${selectedMedia.title} trailer oficial ${selectedMedia.original_title}`;
    }
    if (selectedMedia?.name || selectedMedia?.original_name) {
      query = `serie ${selectedMedia.name}  
      } cena trailer oficial ${selectedMedia.original_name}`;
    }
    selectedMedia &&
      searchYoutubeVideos(query)
        .then((res) => {
          res && setYTAPIVideos(res);
        })
        .catch((err) => {
          console.log(err);
          setYTAPIVideos([]);
        });
  }

  return (
    <>
      {showVideoModal && selectedMedia && (
        <section
          id="modal"
          className="bg-black/70 fixed w-screen h-screen
        flex justify-center items-center z-50 inset-0 sm:px-12"
        >
          <div
            className="rounded-sm    
            xs:min-w-[420px] sm:min-w-[615px]
            md:min-w-[740px] lg:min-w-[990px]
            max-h-screen
            flex flex-col border border-gray"
            id="video-modal-container"
          >
            <header
              className="flex justify-between items-center
              w-full bg-black px-2"
              id="modal_header"
            >
              <h1 className="text-lg ">
                {selectedMedia.title ?? selectedMedia.name}
              </h1>

              <span className="flex items-center gap-3">
                {showVideo && (
                  <button onClick={() => setShowVideo(false)}>
                    <XMarkCircleIcon
                      className="w-7 h-7 text-white 
                    hover:bg-gray/30 rounded-md"
                    />
                  </button>
                )}

                <button
                  onClick={() => {
                    setShowVideo(false);
                    setShowVideoModal(false);
                    setModalOpen(false);
                  }}
                >
                  <XMarkIcon className="w-8 h-8 text-white hover:bg-gray/30 rounded-md" />
                </button>
              </span>
            </header>
            <main>
              {showVideo ? (
                <MediaComponent
                  videoIndex={videoIndex}
                  selectedVideo={DBVideos}
                  youtubeVideos={YTAPIVideos}
                />
              ) : (
                <article className="flex flex-col py-1 sm:flex-row gap-3 bg-black">
                  <div className="font-extralight p-2">
                    {" "}
                    <p>{selectedMedia.overview}</p>
                  </div>
                  <div className="hidden sm:flex flex-col gap-1 items-center">
                    <Image
                      src={`${base_url}${size}/${selectedMedia?.poster_path}`}
                      width={170}
                      height={285}
                      alt="poster image"
                      className=""
                    />
                    <VideoTags mediaType={mediaType} />
                  </div>
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
                {YTAPIVideos.length < 1 && !DBVideos && (
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
