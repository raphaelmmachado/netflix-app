import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid/";
import enterKeyPressed from "../../../utils/checkKeyboardKeys";
interface Props {
  goUp: () => void;
  goDown: () => void;
  setIndex: (i: number) => void;
  bars: number;
  index: number;
  title: string;
}
export default function VerticalScroller({
  goUp,
  goDown,
  setIndex,
  bars,
  index,
  title,
}: Props) {
  return (
    <>
      <aside className="vertical-scroller">
        {/* GO UP */}
        <div
          tabIndex={0}
          id="prev-component-button"
          className={`vertical-scroller-arrows ${
            index - 1 < 0 ? "text-transparent cursor-default" : "block"
          }`}
          onClick={() => goUp()}
        >
          <ChevronUpIcon className="w-8 h-8" />
        </div>
        {/* BARS */}
        {[...Array(bars).fill(" ")].map((bar, i, arr) => (
          <div
            onClick={() => setIndex(i)}
            id="vertical-bars"
            key={i}
            className={`vertical-scroller-bars ${
              index === i
                ? "bg-transparent sm:bg-red h-5 w-fit sm:w-2"
                : "bg-white/50 hidden sm:inline-flex h-0 w-2 sm:h-5"
            } `}
          >
            <h1 className="block sm:hidden">{index === i && title}</h1>
          </div>
        ))}
        {/* GO DOWN */}
        <div
          tabIndex={0}
          id="next-component-button"
          className={`vertical-scroller-arrows ${
            index + 1 > bars - 1 ? "text-transparent cursor-default" : "block"
          }`}
          onClick={() => goDown()}
        >
          <ChevronDownIcon className="w-8 h-8" />
        </div>
      </aside>
    </>
  );
}
