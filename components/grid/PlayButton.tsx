import PlayIcon from "@heroicons/react/24/solid/PlayIcon";

interface Props {
  showVideo: () => void;
}

export default function PlayButton({ showVideo }: Props) {
  return (
    <div
      onClick={() => showVideo()}
      className="bg-red bg-opacity-80 hover:bg-opacity-100
       transition-bg-opacity ease-in delay-75 duration-500 rounded-full
        absolute w-20 h-20 cursor-pointer flex items-center justify-center inset-0 m-auto border-2 border-smokewt
     shadow-lg "
    >
      <PlayIcon className="w-10 h-10 text-smokewt" />
    </div>
  );
}
