import { createContext, useState } from "react";
import { IProvider, IContext } from "../typing";

const initialContextValue: IContext = {
  liked: [],
  setLiked: () => {},
  disliked: [],
  setDisliked: () => {},
  myList: [],
  setMyList: () => {},
};

export const Context = createContext<IContext>(initialContextValue);

export function ContextProvider({ children }: IProvider) {
  const [liked, setLiked] = useState([]);
  const [disliked, setDisliked] = useState([]);
  const [myList, setMyList] = useState([]);
  return (
    <Context.Provider
      value={{
        liked,
        setLiked,
        disliked,
        setDisliked,
        myList,
        setMyList,
      }}
    >
      {children}
    </Context.Provider>
  );
}
