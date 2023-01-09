import { createContext, useState } from "react";
import { IProvider, IContext } from "../typing";

const initialContextValue: IContext = {
  showModal: false,
  setShowModal: () => {},
  video: {
    iso_639_1: "string",
    iso_3166_1: "string",
    name: "string",
    key: "string",
    site: "string",
    size: 0,
    type: "string",
    official: false,
    published_at: "string",
    id: "string",
  },
  setVideo: () => {},
};

export const Context = createContext<IContext>(initialContextValue);

export function ContextProvider({ children }: IProvider) {
  const [showModal, setShowModal] = useState(false);
  const [video, setVideo] = useState(initialContextValue.video);
  return (
    <Context.Provider value={{ showModal, setShowModal, video, setVideo }}>
      {children}
    </Context.Provider>
  );
}
