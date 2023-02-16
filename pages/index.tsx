//next / react
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
//components
import MainContainer from "../components/home/MainContainer";
import Loading from "../components/auth/Loading";
//types
import { IRequests, IComponents } from "../typing";
//utils
import { requests } from "../constants/serverSideRequests";
//hooks
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebaseConfig";
import useScroll from "../hooks/useScroll";
const Header = dynamic(() => import("../components/header/Header"));

export default function App({
  trendingNow,
  topRatedMovies,
  actionMovies,
  familyMovies,
  horrorMovies,
  topRatedSeries,
  brazilianMovies,
}: IRequests) {
  // components made of data coming from server
  const COMPONENTS: IComponents[] = [
    [trendingNow, "Em destaque"],
    [topRatedSeries, "Series de Sucesso", "tv"],
    [topRatedMovies, "Filmes de Sucesso", "movie"],
    [actionMovies, "Filmes de Ação", "movie"],
    [horrorMovies, "Filmes de terror", "movie"],
    [brazilianMovies, "Filmes Nacionais", "movie"],
    [familyMovies, "Filmes para família", "movie"],
  ];
  // this custom hook increments index if user scrolls down
  // or decrements if scrolls up
  const { index, setIndex } = useScroll(COMPONENTS.length);
  // hook to get authorized user info
  const [user, loading] = useAuthState(auth);

  if (loading && !user) return <Loading />;

  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta
          name="description"
          content="Netflix - Assista ao melhores filmes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header className="bg-transparent" />

      {COMPONENTS.map((component: IComponents, i) => {
        if (i === index) {
          return (
            <MainContainer
              key={i}
              medias={component[0]}
              title={component[1]}
              mediaType={component[2]}
              bars={COMPONENTS.length}
              index={index}
              setIndex={setIndex}
            />
          );
        }
      })}
    </>
  );
}

//SERVER SIDE RENDERING
export const getServerSideProps: GetServerSideProps = async (content) => {
  content.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  // FETCH MOVIES INFO / NAME/ PICTURE/IMAGES
  const [
    trendingMovies,
    topRatedMovies,
    familyMovies,
    horrorMovies,
    topRatedSeries,
    brazilianMovies,
    actionMovies,
  ] = await Promise.all([
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fecthTopRatedMovies).then((res) => res.json()),
    fetch(requests.fetchFamilyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchTopRatedSeries).then((res) => res.json()),
    fetch(requests.fetchBrazilianMovies).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
  ]);

  return {
    props: {
      trendingNow: trendingMovies.results,
      actionMovies: actionMovies.results,
      topRatedMovies: topRatedMovies.results,
      familyMovies: familyMovies.results,
      horrorMovies: horrorMovies.results,
      topRatedSeries: topRatedSeries.results,
      brazilianMovies: brazilianMovies.results,
    },
  };
};
