import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
interface Props {
  setShowInfoModal: () => void;
}
export default function Xbutton({ setShowInfoModal }: Props) {
  return (
    <>
      {" "}
      <button className="self-end" onClick={() => setShowInfoModal()}>
        <span>
          {" "}
          <XMarkIcon
            className="h-8 w-8 rounded-sm
       hover:bg-gray/30p-1 transition-colors"
          />
        </span>
      </button>
    </>
  );
}
