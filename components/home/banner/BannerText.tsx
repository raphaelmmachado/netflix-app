import Image from "next/image";
import { tvGenres, movieGenres } from "../../../constants/genres";
import FormateDateToBR from "../../../utils/formatters/formatDate";
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
      <h1
        className="text-white text-start font-bold line-clamp-3
    text-3xl sm:text-4xl pb-2"
        id="banner-text-h1"
      >
        {title}
      </h1>
      <div
        className="flex items-center gap-2 text-center sm:gap-8"
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
          <div className="flex flex-col sm:flex-row gap-1 items-center">
            <Image
              alt="netflix-logo"
              height={20}
              width={20}
              src={"/favicon.ico"}
            />
            <span className="text-gray">
              {mediaType === "tv" ? "Série" : "Filme"}
            </span>
          </div>
        }
      </div>
      <p
        className="text-gray hidden sm:block max-w-fit 
         sm:line-clamp-2 md:line-clamp-3 sm:max-w-sm md:max-w-md lg:max-w-lg"
        id="banner-center-left-description"
      >
        {description}
      </p>
      {genres && genres.length > 0 && (
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
      )}
    </>
  );
}
