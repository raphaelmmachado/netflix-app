import { createContext, useState } from "react";
import { IContext, IProvider, Movie } from "../typing";
import defaultMovie from "../utils/defaultMovie";

const initialContextValue = {
  highlighted: defaultMovie,
  setHighlighted: () => {},
};

export const Context = createContext<IContext>(initialContextValue);

export function ContextProvider({ children }: IProvider) {
  const [highlighted, setHighlighted] = useState<Movie>(defaultMovie);

  return (
    <Context.Provider value={{ highlighted, setHighlighted }}>
      {children}
    </Context.Provider>
  );
}
