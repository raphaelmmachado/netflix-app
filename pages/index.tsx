//next
import { GetServerSideProps } from "next";
import Head from "next/head";
//components
import MainContainer from "../components/home/MainContainer";
import Loading from "../components/auth/Loading";
//types
import { IRequests, IComponents } from "../typing";
//utils
import { requests } from "../constants/requests";
//hooks
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebaseConfig";
import useScroll from "../hooks/useScroll";
import Header from "../components/header/Header";
//TODO FONTS NOT LOADING IN PRODUCTION
export default function App({
  trendingNow,
  topRated,
  comedyMovies,
  horrorMovies,
  actionMovies,
  trendingSeries,
  popularMovies,
}: IRequests) {
  // components made of data coming from server
  const COMPONENTS: IComponents[] = [
    [trendingNow, "Em destaque"],
    [popularMovies, "Filmes populares", "movie"],
    [trendingSeries, "Series em destaque", "tv"],
    [topRated, "Melhores avaliados", "movie"],
    [actionMovies, "Filmes de ação", "movie"],
    [comedyMovies, "Filmes de comédia", "movie"],
    [horrorMovies, "Filmes de terror", "movie"],
  ];
  // this custom hook increments index if user scrolls down
  // or decrements if scrolls up
  const { index, setIndex } = useScroll(COMPONENTS.length);
  // hook to get authorized user info
  const [user, loading] = useAuthState(auth);

  if (loading && !user) return <Loading />;
  //TODO TESTAR ESSA BRANCH, SE NAO ENCONTRAR ERROS, FAZER MERGE
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
              media={component[0]}
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
    actionMovies,
    comedyMovies,
    horrorMovies,
    trendingSeries,
    popularMovies,
  ] = await Promise.all([
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fecthTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchTrendingSeries).then((res) => res.json()),
    fetch(requests.fetchPopularMovies).then((res) => res.json()),
  ]);

  return {
    props: {
      trendingNow: trendingMovies.results,
      topRated: topRatedMovies.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      trendingSeries: trendingSeries.results,
      popularMovies: popularMovies.results,
    },
  };
};
