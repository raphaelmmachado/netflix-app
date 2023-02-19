import { ref, set } from "firebase/database";
import { useCallback, useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../context/ContextProvider";
import { Media } from "../typing";
import { auth, database, fetchDB } from "../utils/firebaseConfig";

export default function useList() {
  const { myList, setMyList } = useContext(Context);
  const [user, loading] = useAuthState(auth);

  // when component loads, get items from firebase and put it in context list
  const getList = () =>
    fetchDB(`${user?.uid}/list`)
      .then((res: Media[]) => res.length > 0 && setMyList(res))
      .catch((e) => console.log(e));

  useEffect(() => {
    getList();
  }, [user, loading]);

  // put list on firebase DB
  const writeUserList = useCallback(async () => {
    if (myList && myList.length > 0)
      await set(ref(database, `${user?.uid}/list`), myList);
  }, [myList]);

  useEffect(() => {
    writeUserList();
  }, [writeUserList]);

  return { writeUserList, getList, myList };
}
