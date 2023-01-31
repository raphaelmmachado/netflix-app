import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon";
interface Props {
  showModal: () => void;
}
export default function DefaultButton({ showModal }: Props) {
  return (
    <>
      <button
        onClick={() => showModal()}
        className="banner-button bg-midgray/70 text-smokewt"
      >
        <InformationCircleIcon className="text-smokewt h-6 w-6" />
      </button>
    </>
  );
}
