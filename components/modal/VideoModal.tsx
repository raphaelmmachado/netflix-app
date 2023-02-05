import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/ContextProvider";
//components
import YoutubeIcon from "./video/YoutubeIcon";

import MediaComponent from "./video/MediaComponent";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
// typing
import { IVideo, MediaType, Media, YTIds } from "../../typing";
//utils
import { getTrailers } from "../../utils/getTrailers";
import { searchYoutubeVideos } from "../../utils/searchYoutubeVideos";
import VideoLinks from "./video/VideoLinks";

export default function VideoModal({ mediaType }: MediaType) {
  const { selectedMedia, showVideoModal, setShowVideoModal, setModalOpen } =
    useContext(Context);
  const [showVideo, setShowVideo] = useState(false);
  const [videos, setVideos] = useState<IVideo[] | undefined>(undefined);
  const [yVideos, setYVideos] = useState<YTIds[]>([]);
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
            setVideos(undefined);
            //FIXME uncomment this
            // searchOnYT();
          } else {
            setVideos(results);
          }
        })
        .catch((error) => console.log(error));
    return () => setVideos(undefined);
  }, [selectedMedia]);

  //if not search on youtube
  function searchOnYT() {
    selectedMedia &&
      searchYoutubeVideos(
        `${selectedMedia.title ?? selectedMedia.name} trailer oficial`,
        "snippet"
      )
        .then((res: YTIds[]) => {
          console.log(res);
          setYVideos(res);
        })
        .catch((err) => console.log(err));
  }

  return (
    <>
      {showVideoModal && selectedMedia && (
        <section id="modal" className="video-modal">
          <div className="video-modal-container" id="video-modal-container">
            <header className="video-modal-header" id="modal_header">
              <h1>
                {selectedMedia.title ??
                  selectedMedia.name ??
                  selectedMedia.original_name}
              </h1>
              <button
                onClick={() => {
                  setShowVideo(false);
                  setShowVideoModal(false);
                }}
              >
                <XMarkIcon
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 text-white hover:bg-gray/30 rounded-sm"
                />
              </button>
            </header>
            <main className="max-w-full">
              {showVideo && (
                <MediaComponent
                  videoIndex={videoIndex}
                  selectedVideo={videos}
                  youtubeVideos={yVideos}
                  clearVideo={() => {
                    setVideos(undefined);
                    setShowVideo(false);
                  }}
                />
              )}
            </main>
            <footer className="w-full bg-black flex flex-wrap gap-4 border-t border-gray">
              <>
                {videos &&
                  videos?.map((item, i) => {
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
                {yVideos &&
                  !videos &&
                  yVideos?.map((item, i) => {
                    return (
                      <VideoLinks
                        key={i}
                        site={"Youtube"}
                        type={"YT Video"}
                        onClick={() => {
                          setVideoIndex(i);
                          setShowVideo(true);
                        }}
                      />
                    );
                  })}
                {!yVideos && !videos && (
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
