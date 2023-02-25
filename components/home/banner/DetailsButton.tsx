import InfoIconOut from "@heroicons/react/24/outline/InformationCircleIcon";
import InfoIconSol from "@heroicons/react/24/solid/InformationCircleIcon";
import Link from "next/link";
import slugify from "../../../utils/formatters/slugfy";
interface Props {
  id: string | number;
  selectedMediaType: string | boolean | undefined;
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
  const slugfy = slugify(slug!);
  return (
    <>
      {/* CHECKING MEDIA TYPE */}
      <Link
        href={{
          pathname: `/[type]/detalhes/${slugfy}`,
          query: {
            id: id,
            type: `${mediaType === "movie" ? "filmes" : "series"}`,
          },
        }}
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
