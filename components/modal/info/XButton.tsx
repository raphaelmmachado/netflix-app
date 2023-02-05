import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
interface Props {
  onClick?: () => void;
}
export default function Xbutton({ onClick }: Props) {
  return (
    <>
      {" "}
      <button className="self-end" onClick={onClick}>
        <span>
          {" "}
          <XMarkIcon
            className="h-8 w-8 rounded-sm
       hover:bg-gray/30 m-1 transition-colors"
          />
        </span>
      </button>
    </>
  );
}
