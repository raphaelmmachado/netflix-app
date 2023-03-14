import { createContext, useState } from "react";
import { IProvider, IContext, Media } from "../typing";

const initialContextValue: IContext = {
  selectedMedia: undefined,
  setSelectedMedia: () => {},
  showVideoModal: false,
  setShowVideoModal: () => {},
  myList: [],
  setMyList: () => {},
  modalOpen: false,
  setModalOpen: () => {},
};

export const Context = createContext<IContext>(initialContextValue);

export function ContextProvider({ children }: IProvider) {
  const [selectedMedia, setSelectedMedia] = useState<Media>();
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [myList, setMyList] = useState<Media[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Context.Provider
      value={{
        selectedMedia,
        setSelectedMedia,
        showVideoModal,
        setShowVideoModal,
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
