import Head from "next/head";
import { useRouter } from "next/router";

import { useContext } from "react";
import { Context } from "../../context/ContextProvider";
import MainContainer from "../../components/home/MainContainer";
import Loading from "../../components/auth/Loading";

export default function App() {
  const { myList } = useContext(Context);

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
      {myList.length > 0 ? (
        <MainContainer
          bars={0}
          index={0}
          medias={myList}
          title="Minha Lista"
          mediaType={undefined}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
