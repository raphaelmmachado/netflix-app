import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { SearchContext } from "../../context/SearchContext";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import slugify from "../../utils/formatters/slugfy";
import apiConfiguration from "../../constants/apiConfiguration";

const BASE_URL = apiConfiguration.images.secure_base_url;
const STILL_SIZE = apiConfiguration.images.still_sizes;

export default function Results() {
  const { results, showResults, setShowResults } = useContext(SearchContext);
  const listRef = useRef<HTMLUListElement>(null);
  const [resultsRef] = useAutoAnimate<HTMLDivElement>();
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [listRef]);

  const router = useRouter();
  return (
    <>
      {showResults && (
        <div ref={resultsRef}>
          <ul
            ref={listRef}
            id="results"
            className="flex flex-col bg-white rounded-md p-1 gap-y-1"
          >
            {results.length > 0 &&
              results.map((item, i) => {
                if (item.media_type !== "person" && i < 9)
                  return (
                    <li
                      onClick={() => {
                        const slug = slugify(item.name ?? item.title);
                        router.push({
                          pathname: `/[type]/detalhes/${slug}`,
                          query: {
                            type:
                              item.media_type === "tv" ? "series" : "filmes",
                            id: item.id,
                          },
                        });
                      }}
                      key={i}
                      className={`flex px-1 gap-3 justify-between items-center rounded-md bg-smokewt cursor-pointer hover:bg-midgray/30`}
                    >
                      <h1 className="text-black">{item.title ?? item.name}</h1>
                      <ResultImage
                        title={item.title ?? item.name}
                        image_path={item.backdrop_path}
                      />
                    </li>
                  );
              })}
          </ul>
        </div>
      )}
    </>
  );
}
interface PropsB {
  title: string;
  image_path: string | null;
}
const ResultImage = ({ title, image_path }: PropsB) => {
  const { results } = useContext(SearchContext);

  const [image, setImage] = useState("");

  useEffect(() => {
    setImage(`${BASE_URL}${STILL_SIZE[0]}${image_path}`);
  }, [results]);

  const handleFailedImage = () => {
    setImage(`https://via.placeholder.com/80x36/6D6D6E/fff?text=sem+imagem`);
  };
  return (
    <>
      <Image
        src={image}
        onError={() => handleFailedImage()}
        alt={title}
        height={36}
        width={80}
        title={title}
        className="rounded-md"
        style={{ height: "auto" }}
      />
    </>
  );
};
