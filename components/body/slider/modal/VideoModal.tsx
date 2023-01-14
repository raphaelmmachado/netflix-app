import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Context } from "../../../../context/ContextProvider";

import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import ThumbUpIconOut from "@heroicons/react/24/outline/HandThumbUpIcon";
import ThumbUpIconSol from "@heroicons/react/24/solid/HandThumbUpIcon";
import ThumbDownIconOut from "@heroicons/react/24/outline/HandThumbDownIcon";
import ThumbDOwnIconSol from "@heroicons/react/24/solid/HandThumbDownIcon";

import { Movie } from "../../../../typing";
import LikeButton from "./video/LikeButton";
import DislikeButton from "./video/DislikeButton";

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

          <button
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
