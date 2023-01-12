import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon";
interface Props {
  showModal: () => void;
}
export default function DefaultButton({ showModal }: Props) {
  return (
    <>
      <button
        onClick={() => showModal()}
        className="flex items-center justify-around gap-2
    bg-midgray text-smokewt font-bold py-2 px-6
      rounded-md"
      >
        <InformationCircleIcon className="text-smokewt h-6 w-6" />
        <>Detalhes</>
      </button>
    </>
  );
}
