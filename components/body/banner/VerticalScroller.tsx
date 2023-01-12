import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid/";
interface Props {
  goUp: () => void;
  goDown: () => void;
  setIndex: (i: number) => void;
  bars: number;
  index: number;
}
export default function VerticalScroller({
  goUp,
  goDown,
  setIndex,
  bars,
  index,
}: Props) {
  return (
    <>
      <div className="flex flex-col items-center gap-2 px-8">
        <div
          id="prev-component-button"
          className="cursor-pointer"
          onClick={() => goUp()}
        >
          <ChevronUpIcon className="w-5 h-5 text-center" />
        </div>

        {[...Array(bars).fill(" ")].map((bar, i, arr) => (
          <div
            onClick={() => setIndex(i)}
            id="vertical-bars"
            key={i}
            className={`w-6 h-2 hover:cursor-pointer ${
              index === i ? "bg-red" : "bg-white/50"
            } `}
          ></div>
        ))}
        <div
          id="next-component-button"
          className="cursor-pointer"
          onClick={() => goDown()}
        >
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </div>
    </>
  );
}
