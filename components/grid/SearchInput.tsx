import { ChangeEvent, useState, useEffect } from "react";
import searchMedia from "../../utils/seachMedia";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import useDebounce from "../../hooks/useDebounce";
import { Media } from "../../typing";
interface Props {
  placeholder: string;
  handleFoundMedia: (media: Media[], total_results: number) => void;
  mediaType: "tv" | "movie";
}
export default function SearchInput({
  placeholder,
  handleFoundMedia,
  mediaType,
}: Props) {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 500);
  // Effect for API call
  useEffect(
    () => {
      if (debounced) {
        searchMedia({ query: debounced, mediaType: mediaType }).then((data) => {
          if (data) handleFoundMedia(data.results, data.total_results);
        });
      } else {
        handleFoundMedia([], 0);
      }
    },
    [debounced] // Only call effect if debounced search term changes
  );
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  return (
    <>
      <form
        className="my-8 flex gap-2 items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="search">
          <MagnifyingGlassIcon className="h-8 w-8 p-1 text-smokewt bg-midgray/20 rounded-full" />
        </label>
        <input
          onChange={handleChange}
          type="text"
          id="search"
          name="search"
          placeholder={placeholder}
          className="bg-transparent h-8 font-thin min-w-[400px]
          px-2 border-2 border-midgray rounded-sm"
        />
      </form>
    </>
  );
}
