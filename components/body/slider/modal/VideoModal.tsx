import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Context } from "../../../../context/ContextProvider";
import YoutubeIcon from "./video/YoutubeIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { IVideo, Movie, YTIds, YTitems } from "../../../../typing";
import LikeButton from "./video/LikeButton";
import DislikeButton from "./video/DislikeButton";
import PaperAirplaneIcon from "@heroicons/react/24/solid/PaperAirplaneIcon";
import MediaComponent from "./video/MediaComponent";
import getPTBRTrailers from "../../../../utils/getTrailers";
import searchYoutubeVideos from "../../../../utils/searchYoutubeVideos";

interface Props {
  showVideoModal: boolean;
  selectedMovie: Movie;
  setShowVideoModal: Dispatch<SetStateAction<boolean>>;
  mediaType?: "tv" | "movie";
}

export default function VideoModal({
  selectedMovie,
  showVideoModal,
  setShowVideoModal,
  mediaType,
}: Props) {
  const { liked, disliked, setDisliked, setLiked } = useContext(Context);
  const [showVideo, setShowVideo] = useState(false);
  const [videos, setVideos] = useState<IVideo[] | undefined>(undefined);
  const [yVideos, setYVideos] = useState<YTIds[]>([]);
  const [videoIndex, setVideoIndex] = useState(0);
  const handleLikeButton = (id: number) => {
    if (!liked.includes(id)) {
      setDisliked((prevDisliked: number[]) =>
        [...prevDisliked].filter((dislikedIds) => dislikedIds !== id)
      );
      setLiked((prevLiked: number[]) => [...prevLiked, id]);
    } else {
      setLiked((prevLiked: number[]) =>
        [...prevLiked].filter((likedIds) => likedIds !== id)
      );
    }
  };

  const handleDislikeButton = (id: number) => {
    if (!disliked.includes(id)) {
      setLiked((prevLiked: number[]) =>
        [...prevLiked].filter((likedIds) => likedIds !== id)
      );
      setDisliked((prevDisliked: number[]) => [...prevDisliked, id]);
    } else {
      setDisliked((prevDisliked: number[]) =>
        [...prevDisliked].filter((dislikedIds) => dislikedIds !== id)
      );
    }
  };

  type Results = {
    results: IVideo[];
  };
  //check if DB has video
  useEffect(() => {
    getPTBRTrailers({ mediaType, selectedMovie })
      .then(({ results }: Results) => {
        if (results.length < 1) {
          setVideos(undefined);
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

  // const rateMovie = async (rating: number) => {
  //   try {
  //     const { secret } = await getSecret().then((res) => res);
  //     const url = `${base_url}${selectedMovie.id}/rating?api_key=${secret}`;
  //     const res = await fetch(url, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json;charset=utf-8" },
  //       body: JSON.stringify({ value: rating }),
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <>
      {showVideoModal && (
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
                    if (id) handleLikeButton(id);
                  }}
                />
                <DislikeButton
                  includes={disliked.includes(selectedMovie.id)}
                  handleClick={() => {
                    const id = selectedMovie.id;
                    if (id) handleDislikeButton(id);
                  }}
                />
              </div>
              <button
                onClick={() => {
                  setShowVideo(false);
                  setShowVideoModal(false);
                }}
              >
                <XMarkIcon className="w-8 h-8 text-white hover:bg-gray/30 rounded-sm" />
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
