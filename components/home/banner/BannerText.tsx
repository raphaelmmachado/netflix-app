import Image from "next/image";
import { tvGenres, movieGenres } from "../../../constants/genres";
import FormateDateToBR from "../../../utils/formatDate";
interface Props {
  title: string;
  description: string;
  rating: number | string;
  release_date: string;
  mediaType: "tv" | "movie";
  genres: number[];
}

export default function BannerText({
  title,
  description,
  rating,
  release_date,
  genres,
  mediaType,
}: Props) {
  return (
    <>
      {" "}
      <h1 className="banner-center-left-title " id="banner-text-h1">
        {title}
      </h1>
      <div
        className="banner-center-left-smallinfo"
        id="banner-text-small-text-info"
      >
        <p className={`${rating > 5 ? "text-def_green-300" : "text-smokewt"}`}>
          Avaliação {rating.toString()}
        </p>{" "}
        {release_date && (
          <p className="text-gray">
            {`${
              mediaType === "movie" ? "Lançado em " : "Estreou em "
            }${FormateDateToBR(release_date, {
              dateStyle: "medium",
            }).toString()}`}
          </p>
        )}
        {
          <div className="flex gap-1 items-center">
            <Image
              alt="netflix-logo"
              height={20}
              width={20}
              src={"/favicon.ico"}
            />
            <span>{mediaType === "tv" ? "Série" : "Filme"}</span>
          </div>
        }
      </div>
      <p
        className="banner-center-left-description"
        id="banner-center-left-description"
      >
        {description}
      </p>
      <div className="flex gap-1">
        {genres.map((item, i, arr) => (
          <span key={i} className="text-gray">
            {`${
              mediaType === "movie"
                ? movieGenres[item].name
                : tvGenres[item].name
            }${i !== arr.length - 1 && arr.length > 1 ? ` · ` : ""}`}
          </span>
        ))}
      </div>
    </>
  );
}
