import Link from "next/link";
import InfoIconOut from "@heroicons/react/24/outline/InformationCircleIcon";
import InfoIconSol from "@heroicons/react/24/solid/InformationCircleIcon";

interface Props {
  id: string | number;
  selectedMediaType: string | boolean | undefined;
  mediaType?: "tv" | "movie";
  className: string;
  iconType: "solid" | "outline";
}
export default function DefaultButton({
  id,
  mediaType,
  selectedMediaType,
  className,
  iconType,
}: Props) {
  //TODO CHECAR PORQUE NA LISTA OS FILMES NAO TEM TIPO
  const checkIfIsMovie = (compType?: string, medType?: string | boolean) => {
    console.log({ mediaType: compType, selectedMediaType: medType });
  };
  checkIfIsMovie(mediaType, selectedMediaType);
  return (
    <>
      <Link
        href={
          mediaType
            ? mediaType === "movie"
              ? `/filmes/filme/${id}`
              : `/series/serie/${id}`
            : selectedMediaType === "movie"
            ? `/filmes/filme/${id}`
            : `/series/serie/${id}`
        }
        className={className}
      >
        {iconType === "solid" && (
          <InfoIconSol className="text-smokewt h-6 w-6" />
        )}
        {iconType === "outline" && (
          <InfoIconOut className="text-smokewt h-6 w-6" />
        )}
      </Link>
    </>
  );
}
