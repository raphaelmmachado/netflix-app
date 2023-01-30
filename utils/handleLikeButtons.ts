import { Dispatch, SetStateAction } from "react";

interface Like {
  id: number;
  liked: number[];
  setLiked: Dispatch<SetStateAction<number[]>>;
  setDisliked: Dispatch<SetStateAction<number[]>>;
}
interface Dislike {
  id: number;
  disliked: number[];
  setLiked: Dispatch<SetStateAction<number[]>>;
  setDisliked: Dispatch<SetStateAction<number[]>>;
}
const handleLikeButton = ({ id, liked, setLiked, setDisliked }: Like) => {
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

const handleDislikeButton = ({
  id,
  disliked,
  setLiked,
  setDisliked,
}: Dislike) => {
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
export { handleLikeButton, handleDislikeButton };
