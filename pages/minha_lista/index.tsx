import { useContext } from "react";

import { Context } from "../../context/ContextProvider";
import ListComponent from "../../components/minha_lista/ListComponent";
import Loading from "../../components/auth/Loading";

export default function App() {
  const { myList } = useContext(Context);

  return (
    <>
      {myList && myList.length > 0 ? (
        <ListComponent movies={myList} title="Minha Lista" />
      ) : (
        <Loading />
      )}
    </>
  );
}
