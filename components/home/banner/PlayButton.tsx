import PlayIcon from "@heroicons/react/24/solid/PlayIcon";

interface Props {
  showModal: () => void;
}
export default function PlayButton({ showModal }: Props) {
  return (
    <>
      <button
        id="banner-play-button"
        onClick={() => showModal()}
        className="flex flex-row items-center justify-evenly
        gap-2 p-2 xs:px-4 xs:py-2 md:px-6
       rounded-md
           bg-red text-smokewt font-normal"
      >
        <PlayIcon className="text-smokewt h-6 w-6" />
        <>{"Play"}</>
      </button>
    </>
  );
}
