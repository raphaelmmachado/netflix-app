import PlayIcon from "@heroicons/react/24/solid/PlayIcon";

interface Props {
  showVideo: () => void;
}

export default function PlayButton({ showVideo }: Props) {
  return (
    <div
      onClick={() => showVideo()}
      className="bg-white rounded-full absolute w-20 h-20 cursor-pointer
     flex items-center justify-center top-24 left-12 border-2 border-gray
     shadow-lg"
    >
      <PlayIcon className="w-10 h-10 text-black" />
    </div>
  );
}
