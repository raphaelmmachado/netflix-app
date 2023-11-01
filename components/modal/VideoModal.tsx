import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/ContextProvider";
//components
import MediaComponent from "./video/MediaComponent";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import ChevronDownIcon from "@heroicons/react/20/solid/ChevronDownIcon";
import VideoLinks from "./video/VideoLinks";
// typing
import { IVideo, MediaType, YTIds } from "../../typing";
//utils
import { getTrailers } from "../../utils/requests/getTrailers";
import { searchYoutubeVideos } from "../../utils/requests/searchYoutubeVideos";
import apiConfiguration from "../../constants/apiConfiguration";

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
    getVideos();
    return () => {
      setDBVideos(undefined);
    };
  }, [showVideoModal]);

  async function getVideos() {
    // checking if it is a mixed component with both tv and movie items
    // if it is a mixed component, the api will give me "media_type"
    // if it is not, use media type from component
    const type = !selectedMedia?.media_type
      ? selectedMedia?.title
        ? "movie"
        : "tv"
      : selectedMedia?.media_type;
    const id = selectedMedia?.id;
    if (selectedMedia && id) {
      //get trailers in portuguese
      // if there is no trailers in portuguese, get english
      // if theres is no trailers in pt-BR and en-US, search on youtube
      const [portugueseVideos, englishVideos] = await Promise.all([
        getTrailers(id, type as MediaType, "pt-BR", mediaType)
          .then(({ results }: Results) => results)
          .catch((error) =>
            console.log({
              error: error,
              mensagem: `Não encontramos video em português.`,
            })
          ),
        getTrailers(id, type as MediaType, "en-US", mediaType)
          .then(({ results }: Results) => results)
          .catch((error) =>
            console.log({
              error: error,
              mensagem: `Não encontramos video em inglês.
               Usaremos API do youtube para buscar videos`,
            })
          ),
      ]);

      if (portugueseVideos && portugueseVideos.length > 0)
        setDBVideos(portugueseVideos);

      if (
        portugueseVideos &&
        portugueseVideos.length < 1 &&
        englishVideos &&
        englishVideos.length > 0
      )
        setDBVideos(englishVideos);
      if (
        (portugueseVideos && portugueseVideos.length > 0) ||
        (englishVideos && englishVideos.length > 0)
      )
        return;
      else {
        searchOnYT();
      }
    }
  }

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
                    <ChevronDownIcon
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
            <section>
              {showVideo ? (
                <MediaComponent
                  videoIndex={videoIndex}
                  selectedVideo={DBVideos}
                  youtubeVideos={YTAPIVideos}
                />
              ) : (
                <article className="bg-black">
                  <p className="font-extralight p-2">
                    {selectedMedia.overview}
                  </p>
                </article>
              )}
            </section>
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
                {YTAPIVideos.length > 0 &&
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
