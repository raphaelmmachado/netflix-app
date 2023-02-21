import { Season } from "../../../typing";
import SeasonPoster from "./SeasonPoster";

interface Props {
  seasons: Season[];
}
export default function Seasons({ seasons }: Props) {
  return (
    <>
      {" "}
      <section
        className="px-12 my-8 rounded-md overflow-y-visible
        overflow-x-auto"
        id="seasons-slider"
      >
        <h3 className="text-lg text-midgray">Temporadas</h3>
        <div className="flex py-2 gap-2 overflow-y-visible">
          {seasons.map((media: Season, i) => {
            return <SeasonPoster key={i} media={media} i={i} />;
          })}
        </div>
      </section>
    </>
  );
}
