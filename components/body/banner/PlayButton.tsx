import { PlayIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

interface Props {
  play: boolean;
  showModal: () => void;
}
export default function PlayButton({ play, showModal }: Props) {
  return (
    <>
      <button
        id="banner-play-button"
        onClick={() => showModal()}
        className={`banner-play-button ${play ? "bg-smokewt" : "bg-midgray"} `}
      >
        {play ? (
          <PlayIcon className="text-black h-6 w-6" />
        ) : (
          <ExclamationTriangleIcon className="text-black h-6 w-6" />
        )}
        <>{play ? "Play" : "Indisponível"}</>
      </button>
    </>
  );
}
