import Head from "next/head";
import { useRouter } from "next/router";

import { useContext, useEffect } from "react";
import { Context } from "../../context/ContextProvider";
import MainContainer from "../../components/home/MainContainer";

export default function App() {
  const { myList } = useContext(Context);
  const router = useRouter();
  useEffect(() => {
    if (myList.length < 1) router.push("/");
  }, [myList, myList.length]);

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
      <MainContainer
        bars={0}
        index={0}
        medias={myList}
        title="Minha Lista"
        mediaType={undefined}
      />
    </>
  );
}
