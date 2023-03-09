import FormateDateToBR from "../../../utils/formatters/formatDate";
import Picture from "../../Picture";

interface Props {
  title: string;
  image_path: string;
  episode_number: number;
  description: string;
  date: string | Date;
}
export default function LastEpisode({
  image_path,
  title,
  date,
  episode_number,
  description,
}: Props) {
  return (
    <>
      <h2 className="text-gray text-lg py-4">Último episódio ao ar</h2>
      <div className="flex flex-col md:flex-row items-start gap-4">
        <>
          <Picture
            fill={false}
            priority={false}
            style={{ height: "auto" }}
            height={120}
            width={280}
            src={image_path}
            alt={title}
            title={title}
            className={"rounded-md"}
          />
          <div className="flex flex-col items-start justify-center">
            {" "}
            <div className="flex items-center justify-around gap-8">
              <div>
                <span className="text-midgray text-sm  font-thin">
                  Episódio
                </span>
                <p>{episode_number}</p>
              </div>
              <div>
                <span className="text-midgray text-sm  font-thin">
                  Ao ar em
                </span>
                <p className="font-thin">
                  <>
                    {FormateDateToBR(date, {
                      dateStyle: "medium",
                    })}
                  </>
                </p>
              </div>
            </div>
            <span className="text-midgray text-sm  font-thin">Título</span>
            <h3 className="uppercase">{title}</h3>
            <span className="text-midgray text-sm font-thin">Descrição</span>
            <p className="font-thin">{description}</p>
          </div>
        </>
      </div>
    </>
  );
}
