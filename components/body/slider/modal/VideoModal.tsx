import { Dispatch, SetStateAction, useContext } from "react";
import { Context } from "../../../../context/ContextProvider";

import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import ThumbUpIconOut from "@heroicons/react/24/outline/HandThumbUpIcon";
import ThumbUpIconSol from "@heroicons/react/24/solid/HandThumbUpIcon";
import ThumbDownIconOut from "@heroicons/react/24/outline/HandThumbDownIcon";
import ThumbDOwnIconSol from "@heroicons/react/24/solid/HandThumbDownIcon";
import PlusCircleIcon from "@heroicons/react/24/outline/PlusCircleIcon";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";
import { IVideo, Movie } from "../../../../typing";

// if error pode ser o tipo do selectedVideo
interface Props {
  title?: string;
  children?: JSX.Element;
  showVideoModal: boolean;
  selectedMovie: Movie;
  selectedVideo: IVideo | null;
  setShowVideoModal: Dispatch<SetStateAction<boolean>>;
}

export default function VideoModal({
  title,
  children,
  selectedMovie,
  selectedVideo,
  showVideoModal,
  setShowVideoModal,
}: Props) {
  const { liked, disliked, setDisliked, setLiked, myList, setMyList } =
    useContext(Context);

  const handleLikeButton = (id: number) => {
    console.log(liked);

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
  const handleAddToList = (movie: Movie) => {};
  return showVideoModal ? (
    <section
      id="modal"
      className="bg-black/70 fixed w-full h-full
  flex justify-center items-center z-50 top-0 left-0"
    >
      <div
        className="min-w-[450px] sm:min-w-[640px] md:min-w-[768px] lg:min-w-[1024px]
        rounded-sm flex flex-col"
      >
        <header
          className="flex justify-between items-center w-full bg-black"
          id="modal_header"
        >
          <div
            className="flex min-w-[15rem] justify-between items-center"
            id="modal_header--like-dislike-div"
          >
            <button
              id="like-button"
              onClick={() => {
                if (selectedVideo?.id) handleLikeButton(selectedVideo.id);
              }}
              className="flex items-center justify-around gap-2
              text-smokewt font-bold py-2 px-6"
            >
              {selectedVideo && liked.includes(selectedVideo.id) ? (
                <ThumbUpIconSol className="w-6 h-6" />
              ) : (
                <ThumbUpIconOut className="w-6 h-6 text-white" />
              )}
            </button>
            {/* TODO */}
            {/* <button
              className="flex items-center gap-2 text-smokewt font-bold py-2 px-6"
              onClick={() => handleAddToList(selectedMovie)}
            >
              {" "}
              {selectedVideo && !myList.includes(selectedMovie.id) ? (
                <>
                  <>Add na lista</>
                  <PlusCircleIcon className="w-6 h-6 text-white" />
                </>
              ) : (
                <CheckIcon className="w-6 h-6 text-white" />
              )}
            </button> */}
            <button
              id="dislike-button"
              onClick={() => {
                if (selectedVideo?.id) handleDislikeButton(selectedVideo.id);
              }}
              className="flex items-center justify-around gap-2
              text-smokewt font-bold py-2 px-6"
            >
              {selectedVideo && disliked.includes(selectedVideo.id) ? (
                <ThumbDOwnIconSol className="w-6 h-6 text-white" />
              ) : (
                <ThumbDownIconOut className="w-6 h-6 text-white" />
              )}
            </button>
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

        {selectedVideo?.site === "YouTube" && (
          <iframe
            id="modal-video"
            className="aspect-video w-full"
            src={`https://www.youtube.com/embed/${selectedVideo?.key}`}
            title={`${selectedVideo?.name}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </section>
  ) : null;
}
