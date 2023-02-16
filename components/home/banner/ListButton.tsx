import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";

interface Props {
  added: boolean;
  addToList: () => void;
}
export default function ListButton({ added, addToList }: Props) {
  return (
    <>
      <button
        onClick={() => addToList()}
        className={`flex flex-row items-center justify-evenly
        gap-2  font-bold px-4 py-2 md:py-2 md:px-6
       rounded-md ${added ? "bg-midgray" : "bg-white"} text-black`}
      >
        {added ? (
          <CheckIcon className="w-6 h-6 font-bold" />
        ) : (
          <>
            <PlusIcon className="w-6 h-6 font-bold" />
            <>Minha lista</>
          </>
        )}
      </button>
    </>
  );
}
