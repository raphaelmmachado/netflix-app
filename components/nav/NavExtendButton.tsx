import BarsIcon from "@heroicons/react/24/outline/ArrowLongRightIcon";
interface Props {
  open: boolean;
  extendNav: () => void;
}
export default function NavExtendButton({ open, extendNav }: Props) {
  return (
    <>
      {" "}
      <button
        id="nav-button"
        onClick={() => extendNav()}
        className="flex items-center rounded-md p-2 my-4
   hover:bg-midgray/20 text-midgray cursor-pointer"
      >
        {" "}
        <span className="w-[0.125rem] h-6 bg-midgray/80"> </span>
        <BarsIcon
          className={` transition-all duration-200 delay-75 ease-in-out ${
            open ? "w-10 h-10 rotate-180" : "w-6 h-6"
          }`}
        />
      </button>
    </>
  );
}
