import { createContext, useState } from "react";
import { IProvider, IContext, Movie } from "../typing";

const initialContextValue: IContext = {
  selectedMovie: undefined,
  setSelectedMovie: () => {},
  showVideoModal: false,
  setShowVideoModal: () => {},
  showInfoModal: false,
  setShowInfoModal: () => {},
  liked: [],
  setLiked: () => {},
  disliked: [],
  setDisliked: () => {},
  myList: [],
  setMyList: () => {},
  modalOpen: false,
  setModalOpen: () => {},
};

export const Context = createContext<IContext>(initialContextValue);

export function ContextProvider({ children }: IProvider) {
  const [selectedMovie, setSelectedMovie] = useState<Movie>();
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [myList, setMyList] = useState<Movie[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [liked, setLiked] = useState([]);
  const [disliked, setDisliked] = useState([]);
  return (
    <Context.Provider
      value={{
        selectedMovie,
        setSelectedMovie,
        showVideoModal,
        setShowVideoModal,
        showInfoModal,
        setShowInfoModal,
        liked,
        setLiked,
        disliked,
        setDisliked,
        myList,
        setMyList,
        modalOpen,
        setModalOpen,
      }}
    >
      {children}
    </Context.Provider>
  );
}
