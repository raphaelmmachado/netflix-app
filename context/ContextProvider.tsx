import { createContext, useState } from "react";
import { IProvider, IContext } from "../typing";

const initialContextValue: IContext = {
  showModal: false,
  setShowModal: () => {},
  showInfoModal: false,
  setShowInfoModal: () => {},
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
  selectedMovieCtx: {
    id: 0,
    title: "string",
    overview: "string",
    backdrop_path: "string",
    poster_path: "string",
    genre_ids: [0],
    vote_average: 0,
    vote_count: 0,
    popularity: 0,
    original_language: "string",
    original_title: "string",
    adult: false,
    release_date: "string",
  },
  setSelectedMovieCtx: () => {},
};

export const Context = createContext<IContext>(initialContextValue);

export function ContextProvider({ children }: IProvider) {
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [video, setVideo] = useState(initialContextValue.video);
  const [selectedMovieCtx, setSelectedMovieCtx] = useState(
    initialContextValue.selectedMovieCtx
  );
  return (
    <Context.Provider
      value={{
        showModal,
        setShowModal,
        showInfoModal,
        setShowInfoModal,
        video,
        setVideo,
        selectedMovieCtx,
        setSelectedMovieCtx,
      }}
    >
      {children}
    </Context.Provider>
  );
}
