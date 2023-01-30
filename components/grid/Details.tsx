import EllipsisIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
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
        <EllipsisIcon className="w-5 h-5  text-white" />
      </div>
    </>
  );
}
