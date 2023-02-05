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
        className="banner-button
           bg-red text-smokewt font-normal"
      >
        <PlayIcon className="text-smokewt h-6 w-6" />
        <>{"Play"}</>
      </button>
    </>
  );
}
