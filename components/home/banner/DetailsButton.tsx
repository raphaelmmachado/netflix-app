import InfoIconOut from "@heroicons/react/24/outline/InformationCircleIcon";
import InfoIconSol from "@heroicons/react/24/solid/InformationCircleIcon";
import Link from "next/link";
import slugify from "../../../utils/formatters/slugfy";
interface Props {
  id: string | number;
  selectedMediaType: string;
  mediaType?: "tv" | "movie";

  iconType: "solid" | "outline";
  slug: string;
  minimalist: boolean;
}
export default function DefaultButton({
  id,
  mediaType,
  selectedMediaType,

  iconType,
  slug,
  minimalist,
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
        className={`flex flex-row items-center justify-evenly
         gap-2 font-bold  ${minimalist ? "p-1" : "p-2 xs:px-4 xs:py-2  md:px-6"}
         rounded-md bg-black text-smokewt`}
        href={{
          pathname: `/[type]/detalhes/${slugify(slug)}`,
          query: {
            id: id,
            type: `${checkMediaType()}`,
          },
        }}
      >
        {iconType === "solid" ? (
          <InfoIconSol className="text-smokewt  h-6 w-6" />
        ) : (
          <>
            <InfoIconOut className="text-smokewt h-6 w-6" />
            {!minimalist && <span className="font-normal">Detalhes</span>}
          </>
        )}
      </Link>
    </>
  );
}
