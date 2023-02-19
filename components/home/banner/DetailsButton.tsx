import InfoIconOut from "@heroicons/react/24/outline/InformationCircleIcon";
import InfoIconSol from "@heroicons/react/24/solid/InformationCircleIcon";
import Link from "next/link";
interface Props {
  id: string | number;
  selectedMediaType: string | boolean | undefined;
  mediaType?: "tv" | "movie";
  className: string;
  iconType: "solid" | "outline";
  slug?: string;
}
export default function DefaultButton({
  id,
  mediaType,
  selectedMediaType,
  className,
  iconType,
  slug,
}: Props) {
  return (
    <>
      {/* CHECKING MEDIA TYPE */}
      <Link
        href={
          mediaType
            ? mediaType === "movie"
              ? `/filmes/detalhes/${id}`
              : `/series/detalhes/${id}`
            : selectedMediaType === "movie"
            ? `/filmes/detalhes/${id}`
            : `/series/detalhes/${id}`
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
// {
//   mediaType
//     ? mediaType === "movie"
//       ? `/filmes/filme/${id}`
//       : `/series/serie/${id}`
//     : selectedMediaType === "movie"
//     ? `/filmes/filme/${id}`
//     : `/series/serie/${id}`
// }
