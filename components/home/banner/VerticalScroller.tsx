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
      <aside className="vertical-scroller">
        <div
          id="prev-component-button"
          className="vertical-scroller-arrows"
          onClick={() => goUp()}
        >
          <ChevronUpIcon className="w-8 h-8" />
        </div>

        {[...Array(bars).fill(" ")].map((bar, i, arr) => (
          <div
            onClick={() => setIndex(i)}
            id="vertical-bars"
            key={i}
            className={`vertical-scroller-bars ${
              index === i ? "bg-red" : "bg-white/50"
            } `}
          ></div>
        ))}
        <div
          id="next-component-button"
          className="vertical-scroller-arrows"
          onClick={() => goDown()}
        >
          <ChevronDownIcon className="w-8 h-8" />
        </div>
      </aside>
    </>
  );
}
