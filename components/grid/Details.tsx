import InformationIcon from "@heroicons/react/24/solid/InformationCircleIcon";
interface Props {
  showInfo: () => void;
}
export default function Details({ showInfo }: Props) {
  return (
    <>
      <div
        onClick={() => showInfo()}
        className="rounded-full absolute flex items-center justify-center
       bg-black border-2 border-gray w-10 h-10  -top-4 -left-4 hover:cursor-pointer"
      >
        <InformationIcon className="w-6 h-6  text-white" />
      </div>
    </>
  );
}
