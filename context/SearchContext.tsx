import { createContext, Dispatch, SetStateAction, useState } from "react";
import { IProvider, Media } from "../typing";
interface ISearchProvider {
  results: Media[];
  setResults: Dispatch<SetStateAction<Media[]>>;
  showResults: boolean;
  setShowResults: Dispatch<SetStateAction<boolean>>;
}
const initialContextValue: ISearchProvider = {
  results: [],
  setResults: () => {},
  showResults: false,
  setShowResults: () => {},
};

export const SearchContext =
  createContext<ISearchProvider>(initialContextValue);

export function SearchProvider({ children }: IProvider) {
  const [results, setResults] = useState<Media[]>([]);
  const [showResults, setShowResults] = useState(false);
  return (
    <SearchContext.Provider
      value={{
        results,
        setResults,
        showResults,
        setShowResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
