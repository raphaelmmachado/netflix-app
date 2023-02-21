import { movieGenres, tvGenres } from "../../../constants/genres";
import { MediaType } from "../../../typing";
interface Props {
  title: string;
  description: string;
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
  description,
  mediaType,
  last,
}: Props) {
  return (
    <div className="flex-grow">
      {" "}
      <h3 className="text-midgray text-sm">Título</h3>
      <h1 className="text-4xl text-white font-medium">{title}</h1>
      <div className="flex items-center gap-1">
        <span className=" text-midgray font-medium">
          <>
            {originalTitle}
            {` · ${release}`}
          </>
        </span>
      </div>
      <div className="grid grid-flow-col place-content-start place-items-center gap-4">
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
    </div>
  );
}
