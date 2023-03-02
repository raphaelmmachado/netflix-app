import { movieGenres, tvGenres } from "../../../constants/genres";
import { MediaType } from "../../../typing";
import TitleDesc from "./TitleDesc";
interface Props {
  title: string;
  overview: string;
  originalTitle: string;
  release: string | Date;
  last?: string | Date;
  genres: Genre[];
  mediaType: MediaType;
}
interface Genre {
  id: number;
  name: string;
}
interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export default function MediaHeader({
  title,
  originalTitle,
  release,
  genres,
  overview,
  mediaType,
  last,
}: Props) {
  return (
    <div className="flex-grow">
      {" "}
      <span className="text-midgray text-sm">Título</span>
      <h1 className="text-4xl text-white font-medium uppercase">{title}</h1>
      <div className="flex items-center gap-1">
        <span className="text-midgray font-medium">
          <>
            {originalTitle}
            {` · ${release} ${last ? `~ ${last}` : ""}`}
          </>
        </span>
      </div>
      <div className="flex justify-start items-center flex-wrap gap-2 sm:gap-4">
        {genres.map((genre, i) => {
          return (
            <div key={i} className="px-3 py-1 bg-midgray/30 rounded-md w-max">
              {mediaType === "tv"
                ? tvGenres[genre.id].name
                : movieGenres[genre.id].name}
            </div>
          );
        })}
      </div>
      <div
        className="flex justify-between items-center my-4"
        id="overview-section"
      >
        {overview && (
          <TitleDesc
            title="Descrição"
            value={overview!}
            pClass="font-thin text-lg"
          />
        )}
      </div>
    </div>
  );
}
