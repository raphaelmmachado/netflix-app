import { IDs } from "../../typing";
import { useRouter } from "next/router";
import { ChangeEvent, useRef } from "react";
interface Props {
  items: IDs;
  path: "filmes" | "series";
}
export default function GenreSelect({ items, path }: Props) {
  const router = useRouter();
  const selectRef = useRef<HTMLSelectElement | null>(null);
  return (
    <>
      {" "}
      <select
        ref={selectRef}
        className="bg-transparent"
        onChange={(e: ChangeEvent) =>
          router.push(`/${path}/${selectRef.current?.value}/1`)
        }
      >
        {Object.values(items).map((item, i) => {
          return (
            <option key={i} className="bg-black" value={item.slug}>
              {item.name}
            </option>
          );
        })}
      </select>
    </>
  );
}
