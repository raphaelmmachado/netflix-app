import ThumbUpIconOut from "@heroicons/react/24/outline/HandThumbUpIcon";
import ThumbUpIconSol from "@heroicons/react/24/solid/HandThumbUpIcon";

interface Props {
  handleClick: () => void;
  includes: boolean;
}
export default function LikeButton({ handleClick, includes }: Props) {
  return (
    <>
      {" "}
      <button
        id="likedislike-button"
        onClick={() => handleClick()}
        className="video-modal-buttons"
      >
        {includes ? (
          <>
            <ThumbUpIconSol className="w-6 h-6" />
            <p className="text-white">Gostei!</p>
          </>
        ) : (
          <ThumbUpIconOut className="w-6 h-6 " />
        )}
      </button>
    </>
  );
}
