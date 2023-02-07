import Image from "next/image";

interface Props {
  title: string;
  description: string;
  rating: number | string;
  release_date: string | Date | number;
  typeOfShow: string | boolean | undefined;
  firstAired: string | Date | undefined;
}

export default function BannerText({
  title,
  description,
  rating,
  release_date,
  firstAired,
  typeOfShow,
}: Props) {
  return (
    <>
      {" "}
      <h1 className="banner-center-left-text" id="banner-text-h1">
        {title}
      </h1>
      <div
        className="banner-center-left-smallinfo"
        id="banner-text-small-text-info"
      >
        <p className="text-def_green-400 ">Avaliação {rating} </p>{" "}
        {release_date && (
          <p className="text-gray">
            Lançamento {release_date.toString().substring(0, 4)}
          </p>
        )}
        {!release_date && firstAired && (
          <p className="text-gray">
            Estreou em {firstAired.toString().substring(0, 4)}
          </p>
        )}
        {typeOfShow && (
          <div className="flex gap-1 items-center">
            <Image
              alt="netflix-logo"
              height={20}
              width={20}
              src={"/favicon.ico"}
            />
            <span>{typeOfShow === "tv" ? "Série" : "Filme"}</span>
          </div>
        )}
      </div>
      <p
        className="banner-center-left-description"
        id="banner-center-left-description"
      >
        {description}
      </p>
    </>
  );
}
