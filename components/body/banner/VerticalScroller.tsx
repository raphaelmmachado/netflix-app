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
      <aside className="flex flex-col items-center gap-2 lg:px-8">
        <div
          id="prev-component-button"
          className="cursor-pointer"
          onClick={() => goUp()}
        >
          <ChevronUpIcon className="w-8 h-8" />
        </div>

        {[...Array(bars).fill(" ")].map((bar, i, arr) => (
          <div
            onClick={() => setIndex(i)}
            id="vertical-bars"
            key={i}
            className={`w-2 hover:cursor-pointer transition-transform ${
              index === i ? "bg-red h-6" : "bg-white/50 h-3"
            } `}
          ></div>
        ))}
        <div
          id="next-component-button"
          className="cursor-pointer"
          onClick={() => goDown()}
        >
          <ChevronDownIcon className="w-8 h-8" />
        </div>
      </aside>
    </>
  );
}
