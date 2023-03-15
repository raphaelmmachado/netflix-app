import PlayIcon from "@heroicons/react/24/solid/PlayIcon";

interface Props {
  showModal: () => void;
  minimalist: boolean;
}
export default function PlayButton({ showModal, minimalist }: Props) {
  return (
    <>
      <button
        id="banner-play-button"
        onClick={() => showModal()}
        className={`flex flex-row items-center justify-evenly
        gap-2  ${minimalist ? "p-1" : "p-2 xs:px-4 xs:py-2  md:px-6"}
        rounded-md bg-red hover:bg-red/80 active:scale-95 text-smokewt font-normal`}
      >
        <PlayIcon className="text-smokewt h-6 w-6" />
        {!minimalist && <>{"Play"}</>}
      </button>
    </>
  );
}
