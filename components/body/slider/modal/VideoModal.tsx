import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useRef,
  useState,
} from "react";
import { Context } from "../../../../context/ContextProvider";

import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { Movie } from "../../../../typing";
import LikeButton from "./video/LikeButton";
import DislikeButton from "./video/DislikeButton";
import PaperAirplaneIcon from "@heroicons/react/24/solid/PaperAirplaneIcon";
import { getSecret, base_url } from "../../../../utils/getSecret";
interface Props {
  showVideoModal: boolean;
  selectedMovie: Movie;
  setShowVideoModal: Dispatch<SetStateAction<boolean>>;
}

export default function VideoModal({
  selectedMovie,
  showVideoModal,
  setShowVideoModal,
}: Props) {
  const { liked, disliked, setDisliked, setLiked } = useContext(Context);
  const [send, setSend] = useState(false);
  const handleLikeButton = (id: number) => {
    if (!liked.includes(id)) {
      setDisliked((newDisliked: number[]) =>
        [...newDisliked].filter((dislikedIds) => dislikedIds !== id)
      );
      setLiked((newLiked: number[]) => [...newLiked, id]);
    } else {
      setLiked((newLiked: number[]) =>
        [...newLiked].filter((likedIds) => likedIds !== id)
      );
    }
  };

  const handleDislikeButton = (id: number) => {
    if (!disliked.includes(id)) {
      setLiked((newLiked: number[]) =>
        [...newLiked].filter((likedIds) => likedIds !== id)
      );
      setDisliked((newDisliked: number[]) => [...newDisliked, id]);
    } else {
      setDisliked((newDisliked: number[]) =>
        [...newDisliked].filter((dislikedIds) => dislikedIds !== id)
      );
    }
  };
  const movieFound = () => {
    if ("results" in selectedMovie.trailer) {
      return true;
    } else {
      return false;
    }
  };
  const rating = useRef<HTMLInputElement | null>(null);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const value = Number(rating.current?.value);
    if (value < 0 || value > 10 || typeof value !== "number")
      return console.warn("Nota deve ser número entre 0 e 10");
    else {
      rateMovie(value);
    }
  };
  const rateMovie = async (rating: number) => {
    try {
      const { secret } = await getSecret().then((res) => res);
      const url = `${base_url}${selectedMovie.id}/rating?api_key=${secret}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({ value: rating }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return showVideoModal ? (
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
                if (movieFound()) {
                  const id = selectedMovie.id;
                  if (id) handleLikeButton(id);
                }
              }}
            />
            <DislikeButton
              includes={disliked.includes(selectedMovie.id)}
              handleClick={() => {
                if (movieFound()) {
                  const id = selectedMovie.id;
                  if (id) handleDislikeButton(id);
                }
              }}
            />
          </div>
          {!send ? (
            <form className="flex gap-2 items-center text-sm">
              <label htmlFor="rating">Este filme é nota:</label>
              <input
                ref={rating}
                id="rating"
                type="tel"
                className="bg-gray/20 w-8 px-1 py-1"
                min={0}
                max={10}
                placeholder="10"
              />
              <button onClick={handleSubmit}>
                <PaperAirplaneIcon className="w-5 h-5 text-white" />
              </button>
            </form>
          ) : null}
          <button
            onSubmit={handleSubmit}
            className="px-1"
            onClick={() => setShowVideoModal(false)}
            id="modal_header-close-btn"
          >
            <span>
              {" "}
              <XMarkIcon
                className="h-8 w-8 rounded-sm hover:bg-gray/30
             p-1 transition-colors"
              />
            </span>
          </button>
        </header>
        {movieFound() && (
          <iframe
            id="modal-video"
            className="aspect-video w-full"
            src={`https://www.youtube.com/embed/${selectedMovie.trailer.results[0]?.key}`}
            title={`${selectedMovie.trailer.results[0]?.name}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </section>
  ) : null;
}