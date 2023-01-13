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
        className="flex items-center gap-2 bg-black shadow-sm rounded-md text-whitefont-bold py-2 px-6"
      >
        {added ? (
          <CheckIcon className="w-6 h-6 font-bold text-white" />
        ) : (
          <>
            <PlusIcon className="w-6 h-6 font-bold text-white" />
            <>Minha lista</>
          </>
        )}
      </button>
    </>
  );
}
