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
      <aside
        className="flex flex-col self-center sm:self-auto
     items-center gap-2  px-4 sm:py-0"
      >
        {/* GO UP */}
        <div
          tabIndex={0}
          id="prev-component-button"
          className={`cursor-pointer ${
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
            className={`hover:cursor-pointer transition-transform ${
              index === i
                ? "bg-transparent sm:bg-red h-5 w-fit sm:w-2"
                : "bg-white/50 hidden sm:inline-flex h-0 w-2 sm:h-5 rounded-sm"
            } `}
          >
            <h1 className="block sm:hidden">{index === i && title}</h1>
          </div>
        ))}
        {/* GO DOWN */}
        <div
          tabIndex={0}
          id="next-component-button"
          className={`cursor-pointer ${
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
