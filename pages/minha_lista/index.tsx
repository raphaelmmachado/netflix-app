import { useRouter } from "next/router";
import ListComponent from "../../components/minha_lista/ListComponent";
import Loading from "../../components/auth/Loading";
import Header from "../../components/header/Header";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { Context } from "../../context/ContextProvider";

export default function App() {
  const { myList } = useContext(Context);
  const router = useRouter();
  useEffect(() => {
    if (myList.length < 1) router.push("/");
  }, []);
  return (
    <>
      {" "}
      <Head>
        <title>Netflix - Minha Lista</title>
        <meta
          name="description"
          content="Netflix - Assista ao melhores filmes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header className="bg-transparent" />
      {myList && myList.length > 0 && <ListComponent title="Minha Lista" />}
    </>
  );
}
