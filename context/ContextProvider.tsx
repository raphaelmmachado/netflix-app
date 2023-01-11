import { createContext, useState } from "react";
import { IProvider, IContext } from "../typing";

const initialContextValue: IContext = {
  liked: false,
  setLiked: () => {},
  disliked: false,
  setDisliked: () => {},
};

export const Context = createContext<IContext>(initialContextValue);

export function ContextProvider({ children }: IProvider) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  return (
    <Context.Provider
      value={{
        liked,
        setLiked,
        disliked,
        setDisliked,
      }}
    >
      {children}
    </Context.Provider>
  );
}
