//react
import { useEffect, useState, useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
//custom hooks
import useDebounce from "../../hooks/useDebounce";
//components
//utils
import { searchMultiMedia } from "../../utils/requests/seachMedia";
//icons
import CircleSearchIcon from "@heroicons/react/24/solid/MagnifyingGlassCircleIcon";

interface Props {
  navIsOpen: boolean;
  OpenNav: () => void;
}

export default function NavSearch({ OpenNav, navIsOpen }: Props) {
  const { setResults, setShowResults } = useContext(SearchContext);
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 500);

  // Effect for API call
  useEffect(
    () => {
      if (debounced) {
        searchMultiMedia(debounced).then((data) => {
          if (data) {
            setResults(data.results);
            setShowResults(true);
          }
        });
      } else {
        setResults([]);
        setShowResults(false);
      }
    },
    [debounced] // Only call effect if debounced search term changes
  );

  return (
    <>
      {" "}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <label htmlFor="search">
          <CircleSearchIcon
            onClick={() => OpenNav()}
            className="w-10 h-10 p-1 rounded-full text-red hover:bg-midgray/20 cursor-pointer"
          />
        </label>
        {navIsOpen && (
          <input
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            autoFocus={true}
            className="bg-smokewt rounded-md outline-none pl-2 py-1
            min-w-max max-w-screen-sm font-thin caret-red text-black
            placeholder:text-gray"
            type="text"
            id="search"
            name="search"
            placeholder="Buscar filmes ou series"
          />
        )}
      </div>
    </>
  );
}
