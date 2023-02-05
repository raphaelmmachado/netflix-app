interface Props {
  title: string;
  originalTitle: string;
  language: string;
  genres: Genre[];
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
  language,
  genres,
}: Props) {
  return (
    <div>
      {" "}
      <h3 className="text-midgray text-sm">Título</h3>
      <h1 className="text-4xl text-white font-medium">{title}</h1>
      <div className="flex items-center gap-1">
        <h1 className="text-lg text-midgray font-medium">
          {originalTitle}
          {" · "}
        </h1>
        <p className="text-lg text-midgray font-medium">{language}</p>
      </div>
      <div className="grid grid-flow-col place-content-start gap-4">
        {genres.map((genre, i) => {
          return (
            <div key={i} className="px-3 py-1 bg-midgray/30 rounded-md w-fit">
              {genre.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
