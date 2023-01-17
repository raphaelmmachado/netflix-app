import { PlayIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

interface Props {
  showModal: () => void;
}
export default function PlayButton({ showModal }: Props) {
  return (
    <>
      <button
        id="banner-play-button"
        onClick={() => showModal()}
        className="banner-button 
           bg-smokewt text-black"
      >
        <PlayIcon className="text-black h-6 w-6" />

        <>{"Trailer"}</>
      </button>
    </>
  );
}
