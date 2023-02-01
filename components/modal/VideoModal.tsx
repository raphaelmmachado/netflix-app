import { useContext, useEffect, useState } from "react";

import { Context } from "../../context/ContextProvider";
//components
import YoutubeIcon from "./video/YoutubeIcon";
import DislikeButton from "./video/DislikeButton";
import LikeButton from "./video/LikeButton";
import MediaComponent from "./video/MediaComponent";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
// typing
import { IVideo, MediaType, YTIds } from "../../typing";
//utils
import getPTBRTrailers from "../../utils/getTrailers";
import searchYoutubeVideos from "../../utils/searchYoutubeVideos";
import {
  handleLikeButton,
  handleDislikeButton,
} from "../../utils/handleLikeButtons";

export default function VideoModal({ mediaType }: MediaType) {
  const {
    selectedMovie,
    showVideoModal,
    setShowVideoModal,
    liked,
    disliked,
    setDisliked,
    setLiked,
    setModalOpen,
  } = useContext(Context);
  const [showVideo, setShowVideo] = useState(false);
  const [videos, setVideos] = useState<IVideo[] | undefined>(undefined);
  const [yVideos, setYVideos] = useState<YTIds[]>([]);
  const [videoIndex, setVideoIndex] = useState(0);

  type Results = {
    results: IVideo[];
  };

  //check if DB has video
  useEffect(() => {
    selectedMovie &&
      getPTBRTrailers({ mediaType, selectedMovie })
        .then(({ results }: Results) => {
          if (results.length < 1) {
            setVideos(undefined);
            //TODO uncomment this
            // searchOnYT();
          } else {
            setVideos(results);
          }
        })
        .catch((error) => console.log(error));
    return () => setVideos(undefined);
  }, [selectedMovie]);

  //if not search on youtube
  function searchOnYT() {
    selectedMovie &&
      searchYoutubeVideos(
        `${selectedMovie.title ?? selectedMovie.name} trailer oficial`,
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
      {showVideoModal && selectedMovie && (
        <section id="modal" className="video-modal">
          <div className="video-modal-container" id="video-modal-container">
            <header className="video-modal-header" id="modal_header">
              <div
                className="video-modal-header-like-dislike"
                id="modal_header--like-dislike-div"
              >
                <LikeButton
                  includes={liked.includes(selectedMovie.id)}
                  handleClick={() => {
                    const id = selectedMovie.id;
                    if (id)
                      handleLikeButton({ id, liked, setLiked, setDisliked });
                  }}
                />
                <DislikeButton
                  includes={disliked.includes(selectedMovie.id)}
                  handleClick={() => {
                    const id = selectedMovie.id;
                    if (id)
                      handleDislikeButton({
                        id,
                        disliked,
                        setLiked,
                        setDisliked,
                      });
                  }}
                />
              </div>
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
                      <div
                        className="video-modal-movie-links"
                        key={item.id}
                        onClick={() => {
                          setVideoIndex(i);
                          setShowVideo(true);
                        }}
                      >
                        <h1>{item.type}</h1>
                        {item.site === "YouTube" && (
                          <YoutubeIcon pathFill="#b9090b" />
                        )}
                      </div>
                    );
                  })}
                {yVideos &&
                  !videos &&
                  yVideos?.map((item, i) => {
                    return (
                      <div
                        className="video-modal-movie-links"
                        key={item.id.videoId}
                        onClick={() => {
                          setVideoIndex(i);
                          setShowVideo(true);
                        }}
                      >
                        <h1>Trailer</h1>
                        <YoutubeIcon pathFill="#b9090b" />
                      </div>
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
