import InfoIconOut from "@heroicons/react/24/outline/InformationCircleIcon";
import InfoIconSol from "@heroicons/react/24/solid/InformationCircleIcon";
import Link from "next/link";
import slugify from "../../../utils/formatters/slugfy";
interface Props {
  id: string | number;
  selectedMediaType: string;
  mediaType?: "tv" | "movie";
  className: string;
  iconType: "solid" | "outline";
  slug: string;
}
export default function DefaultButton({
  id,
  mediaType,
  selectedMediaType,
  className,
  iconType,
  slug,
}: Props) {
  const checkMediaType = (): "filmes" | "series" => {
    if (mediaType && !selectedMediaType) {
      return mediaType && mediaType === "movie" ? "filmes" : "series";
    } else {
      return selectedMediaType && selectedMediaType === "movie"
        ? "filmes"
        : "series";
    }
  };
  return (
    <>
      {/* CHECKING MEDIA TYPE */}
      <Link
        href={{
          pathname: `/[type]/detalhes/${slugify(slug)}`,
          query: {
            id: id,
            type: `${checkMediaType()}`,
          },
        }}
        className={className}
      >
        {iconType === "solid" ? (
          <InfoIconSol className="text-smokewt  h-6 w-6" />
        ) : (
          <>
            <InfoIconOut className="text-smokewt h-6 w-6" />
            <span className="font-normal">Detalhes</span>
          </>
        )}
      </Link>
    </>
  );
}
