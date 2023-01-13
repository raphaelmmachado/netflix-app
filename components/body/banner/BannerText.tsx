import Image from "next/image";

interface Props {
  title: string;
  description: string;
  rating: number | string;
  release_date: string | Date | number;
  typeOfShow: string | boolean | undefined;
}

export default function BannerText({
  title,
  description,
  rating,
  release_date,
  typeOfShow,
}: Props) {
  return (
    <>
      {" "}
      <h1 className=" text-white font-bold text-5xl pb-2">{title}</h1>
      <div className="flex items-center gap-8  text-sm">
        <p className="text-def_green-400">Avaliação {rating} </p>{" "}
        {release_date && (
          <p className="text-gray">
            <>Lançamento {release_date}</>
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
        className={`text-white/80 max-w-fit
  md:max-w-[50vw] line-clamp-3 font-base tracking-wide`}
      >
        {description}
      </p>
    </>
  );
}
