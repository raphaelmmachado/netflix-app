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
        onClick={(e) => {
          setShowSeasonDesc(true);
        }}
        onMouseLeave={(e) => {
          setShowSeasonDesc(false);
        }}
        tabIndex={i}
        src={`${img_URL}/${media.poster_path}`}
        alt={media.name}
        width={120}
        height={100}
        className="hover:cursor-pointer rounded-md
        ring-black hover:ring-white ring-2"
      />{" "}
      {showSeasonDesc && (
        <div
          onMouseOver={(e) => {
            setShowSeasonDesc(true);
          }}
          onMouseLeave={(e) => {
            setShowSeasonDesc(false);
          }}
          className="bg-black rounded-md px-2 z-10 absolute left-50 right-50 bottom-44 border-smokewt border p-1"
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
      )}{" "}
    </>
  );
}
