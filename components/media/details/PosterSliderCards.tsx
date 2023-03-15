import apiConfiguration from "../../../constants/apiConfiguration";
import { Season } from "../../../typing";
import Image from "next/image";
import placeholderImage from "../../../constants/placeholderImage";
interface Props {
  media: Season;
  setDetails: () => void;
}
export default function PosterSliderCards({ media, setDetails }: Props) {
  const BASE_URL = apiConfiguration.images.secure_base_url;
  const POSTER_SIZE = apiConfiguration.images.poster_sizes;

  return (
    <div
      onClick={() => setDetails()}
      className="card flex flex-col justify-end items-center"
    >
      {" "}
      <Image
        title={media.name}
        src={`${BASE_URL}${POSTER_SIZE[2]}/${media.poster_path}`}
        blurDataURL={placeholderImage}
        placeholder="blur"
        alt={media.name}
        width={100}
        height={0}
        style={{ height: "auto" }}
        className="hover:cursor-pointer rounded-md ring-black hover:ring-white ring-2"
      />
    </div>
  );
}
