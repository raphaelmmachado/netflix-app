import { PlayIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

interface Props {
  play: boolean;
  showModal: () => void;
}
export default function PlayButton({ play, showModal }: Props) {
  return (
    <>
      <button
        onClick={() => showModal()}
        className={`flex items-center justify-around gap-2
              ${
                play ? "bg-smokewt" : "bg-midgray"
              } text-black font-bold py-2 px-6
              rounded-md`}
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
