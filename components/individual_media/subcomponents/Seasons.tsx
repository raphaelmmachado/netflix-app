import { Season } from "../../../typing";
import SeasonPoster from "./SeasonPoster";

interface Props {
  seasons: Season[];
  img_URL: string;
}
export default function Seasons({ seasons, img_URL }: Props) {
  return (
    <>
      {" "}
      <section className="px-12 rounded-md overflow-x-auto">
        <h3 className="text-lg text-midgray">Temporadas</h3>
        <div className="flex py-2  gap-2">
          {seasons.map((media: Season, i) => {
            return (
              <SeasonPoster key={i} media={media} img_URL={img_URL} i={i} />
            );
          })}
        </div>
      </section>
    </>
  );
}
