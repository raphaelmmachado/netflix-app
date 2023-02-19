import { useState } from "react";
import Image from "next/image";
import SeasonDescription from "./SeasonDescription";
import { Season } from "../../../typing";

interface Props {
  media: Season;
  img_URL: string;
  i: number;
}
export default function SeasonPoster({ media, img_URL, i }: Props) {
  const [showSeasonDesc, setShowSeasonDesc] = useState(false);

  return (
    <>
      {" "}
      <Image
        onClickCapture={(e) => {
          setShowSeasonDesc(true);
        }}
        onMouseLeave={(e) => {
          setShowSeasonDesc(false);
        }}
        tabIndex={i}
        src={`${img_URL}/${media.poster_path}`}
        alt={media.name}
        width={125}
        height={100}
        style={{ height: "auto" }}
        className="hover:cursor-pointer rounded-md
        ring-black hover:ring-white ring-2 object-cover"
      />{" "}
      {showSeasonDesc && (
        <div
          onMouseEnter={(e) => {
            setShowSeasonDesc(true);
          }}
          className="bg-black rounded-md px-2 z-20
        absolute bottom-52 mx-auto border-smokewt border p-1 min-h-[200px]"
        >
          <SeasonDescription
            title="Título"
            value={`${media.season_number}. ${media.name}`}
          />
          {media.overview && (
            <SeasonDescription title="Descrição" value={media.overview} />
          )}{" "}
          <SeasonDescription title="Episódios" value={media.episode_count} />
          <SeasonDescription title="Ao ar em" value={media.air_date} />
        </div>
      )}
    </>
  );
}
