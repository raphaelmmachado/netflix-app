import { useCallback, useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { Context } from "../../context/ContextProvider";
import { fetchDB, auth } from "../../utils/firebaseConfig";
import { Movie } from "../../typing";
import MainContainer from "../../components/minha_lista/MainComponent";
import Loading from "../../components/auth/Loading";
export default function App() {
  const { myList, setMyList } = useContext(Context);
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  const getList = useCallback(
    () =>
      fetchDB(`${user?.uid}/list`)
        .then((res: Movie[]) => setMyList(res))
        .catch((e) => console.log(e)),
    [myList]
  );
  //fetchDB
  useEffect(() => {
    if (!user && !loading) {
      route.push("/auth/login");
    }
    setTimeout(() => getList(), 150);
  }, []);

  //
  return (
    <>
      {myList && myList.length > 0 ? (
        <MainContainer movies={myList} title="Minha Lista" />
      ) : (
        <Loading />
      )}
    </>
  );
}
