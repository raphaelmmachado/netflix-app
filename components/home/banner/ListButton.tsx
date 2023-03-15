import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";

interface Props {
  added: boolean;
  addToList: () => void;
  minimalist: boolean;
}
export default function ListButton({ added, addToList, minimalist }: Props) {
  return (
    <>
      <button
        onClick={() => addToList()}
        className={`flex flex-row items-center justify-evenly
        gap-2 font-bold  ${
          minimalist ? "p-1" : "p-2 xs:px-4 xs:py-2  md:px-6"
        }  trasition delay-75 duration-200 ease-in-out
       rounded-md ${added ? "bg-midgray" : "bg-white"} text-black`}
      >
        {added ? (
          <>
            <CheckIcon className="w-6 h-6 font-bold" />
            {!minimalist && <>Na lista</>}
          </>
        ) : (
          <>
            <PlusIcon className="w-6 h-6 font-bold" />
            {!minimalist && <>Minha lista</>}
          </>
        )}
      </button>
    </>
  );
}
