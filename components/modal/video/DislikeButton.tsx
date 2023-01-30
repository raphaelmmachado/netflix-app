import ThumbDownIconOut from "@heroicons/react/24/outline/HandThumbDownIcon";
import ThumbDOwnIconSol from "@heroicons/react/24/solid/HandThumbDownIcon";
interface Props {
  handleClick: () => void;
  includes: boolean;
}
export default function Dislike({ handleClick, includes }: Props) {
  return (
    <>
      {" "}
      <button
        id="dislike-button"
        onClick={() => handleClick()}
        className="video-modal-buttons"
      >
        {includes ? (
          <>
            <ThumbDOwnIconSol className="w-6 h-6 " />
            <p className="text-white">Não Gostei!</p>
          </>
        ) : (
          <ThumbDownIconOut className="w-6 h-6" />
        )}
      </button>
    </>
  );
}
