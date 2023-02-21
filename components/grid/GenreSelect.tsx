import { IDs } from "../../typing";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import ChevronLeftIcon from "@heroicons/react/20/solid/ChevronLeftIcon";
interface Props {
  items: IDs;
  path: "filmes" | "series";
}
export default function GenreSelect({ items, path }: Props) {
  const [showSelect, setShowSelect] = useState(false);
  const [gender, setGender] = useState("Geral");
  const genderRef = useRef<HTMLHeadingElement>(null);

  const router = useRouter();
  return (
    <>
      {" "}
      <div
        className="text-smokewt bg-transparent
        hover:cursor-pointer
        min-h-full mx-12 flex flex-col w-fit"
      >
        <span
          className="flex items-center gap-8 relative border-2
          border-gray px-2 py-1 rounded-md text-gray
          before:absolute before:content-['Genero'] before:-top-3
          before:text-sm before:bg-black before:px-1 before:py-0 
          before:font-thin"
          onClick={() => setShowSelect((prev) => !prev)}
        >
          <h1 className="text-smokewt py-1">{gender}</h1>
          <ChevronLeftIcon
            className={`w-5 h-5 text-white transition-all
             duration-100 delay-75 ${showSelect ? "-rotate-90" : ""}`}
          />
        </span>

        <div
          className={`absolute grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 place-content-center gap-1 shadow-sm font-thin ${
            showSelect &&
            "border-2 border-midgray/30 transition-all duration-75"
          } rounded-md bg-black top-44 sm:top-44 right-0 z-10  sm:mx-8 w-fit text-center`}
        >
          {showSelect &&
            Object.values(items).map((item, i) => {
              return (
                <h1
                  key={i}
                  ref={genderRef}
                  className="bg-gray  tracking-wider hover:bg-smokewt
                   rounded-md text-white hover:text-black px-1 sm:px-4 py-2 "
                  onClick={() => {
                    router.push(`/${path}/${item.slug}/1`);
                    setShowSelect((prev) => !prev);
                    setGender(item.name);
                  }}
                >
                  {item.name}
                </h1>
              );
            })}
        </div>
      </div>
    </>
  );
}
