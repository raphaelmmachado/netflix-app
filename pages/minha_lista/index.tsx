import { useContext } from "react";

import { Context } from "../../context/ContextProvider";
import ListComponent from "../../components/minha_lista/ListComponent";
import Loading from "../../components/auth/Loading";
import Header from "../../components/header/Header";

export default function App() {
  const { myList } = useContext(Context);

  return (
    <>
      <Header className="bg-transparent" />
      {myList && myList.length > 0 ? (
        <ListComponent movies={myList} title="Minha Lista" />
      ) : (
        <Loading />
      )}
    </>
  );
}
