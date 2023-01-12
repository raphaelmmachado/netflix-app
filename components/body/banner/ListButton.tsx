import PlusCircleIcon from "@heroicons/react/24/outline/PlusCircleIcon";
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
        className="flex items-center gap-2 bg-smokewt rounded-md text-black font-bold py-2 px-6"
      >
        {added ? (
          <CheckIcon className="w-6 h-6 font-bold text-black" />
        ) : (
          <>
            <PlusCircleIcon className="w-6 h-6 font-bold text-black" />
            <>Lista</>
          </>
        )}
      </button>
    </>
  );
}
