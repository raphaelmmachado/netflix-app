import { ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

import { useCallback, useEffect, useContext } from "react";
import { Context } from "../context/ContextProvider";
import { Media } from "../typing";
import { auth, database, fetchDB } from "../utils/firebaseConfig";

export default function GetList() {
  const { myList, setMyList } = useContext(Context);
  const [user] = useAuthState(auth);

  const getList = useCallback(
    () =>
      fetchDB(`${user?.uid}/list`)
        .then((res: Media[]) => setMyList(res))
        .catch((e) => console.log(e)),
    [myList]
  );

  useEffect(() => {
    getList();
  }, []);

  // put list on firebase DB
  const writeUserList = useCallback(async () => {
    if (myList && myList.length > 0)
      await set(ref(database, `${user?.uid}/list`), myList);
  }, [myList]);

  useEffect(() => {
    writeUserList();
  }, [writeUserList]);
  return myList;
}
