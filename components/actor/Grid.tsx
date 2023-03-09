import { useRouter } from "next/router";
import Picture from "../Picture";
import slugify from "../../utils/formatters/slugfy";
import apiConfiguration from "../../constants/apiConfiguration";
import { MediaType } from "../../typing";

interface Props {
  alt: string;
  title: string;
  img_path: string;
  type?: string;
  id: string | number;
}
export default function Grid({ alt, img_path, title, id, type }: Props) {
  const BASE_URL = apiConfiguration.images.secure_base_url;
  const POSTER_SIZES = apiConfiguration.images.poster_sizes;
  const router = useRouter();
  return (
    <>
      {" "}
      <div
        onClick={() =>
          router.push({
            pathname: `/[type]/detalhes/${slugify(title)}`,
            query: { id: id, type: type === "tv" ? "series" : "filmes" },
          })
        }
        className="flex justify-start items-center
         bg-midgray/20 hover:bg-midgray/50 shadow-lg rounded-md cursor-pointer"
      >
        <Picture
          alt={alt}
          src={`${BASE_URL}${POSTER_SIZES[1]}${img_path}`}
          width={55}
          height={77}
          title={title}
          className="rounded-md"
        />
        <h1 className="px-2 w-full text-center">{title}</h1>
      </div>
    </>
  );
}
