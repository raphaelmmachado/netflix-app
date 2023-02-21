import { useState } from "react";
import Image from "next/image";
import apiConfiguration from "../../../constants/apiConfiguration";
import SeasonDescription from "./SeasonDescription";
import { Season } from "../../../typing";
import Picture from "../../Picture";

interface Props {
  media: Season;
  i: number;
}
export default function SeasonPoster({ media, i }: Props) {
  const BASE_URL = apiConfiguration.images.secure_base_url;
  const POSTER_SIZE = apiConfiguration.images.poster_sizes;

  const [showSeasonDesc, setShowSeasonDesc] = useState(false);
  return (
    <div
      onClickCapture={(e) => {
        setShowSeasonDesc(true);
      }}
      onMouseLeave={(e) => {
        setShowSeasonDesc(false);
      }}
    >
      {" "}
      <Picture
        tabIndex={i}
        src={`${BASE_URL}${POSTER_SIZE[2]}${media.poster_path}`}
        fallBackImage={`${BASE_URL}${POSTER_SIZE[0]}${media.poster_path}`}
        title={media.name}
        alt={media.name}
        width={130}
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
    </div>
  );
}
