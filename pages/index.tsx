import { GetServerSideProps } from "next";
import Head from "next/head";
import useScroll from "../hooks/useScroll";
import { Context } from "../context/ContextProvider";
import { useContext } from "react";

//components
import MovieContainer from "../components/body/MovieContainer";
//local
import { IRequests, IComponents, Movie } from "../typing";
import { requests, dinamicRequests } from "../utils/requests";

export default function App({
  trendingNow,
  topRated,
  comedyMovies,
  horrorMovies,
  actionMovies,
  trendingSeries,
  popularMovies,
}: IRequests) {
  const { myList } = useContext(Context);

  const COMPONENTS: IComponents[] = [
    [trendingNow, "Em destaque"],
    [popularMovies, "Filmes populares"],
    [trendingSeries, "Series em destaque"],
    [topRated, "Melhores avaliados"],
    [actionMovies, "Filmes de ação"],
    [comedyMovies, "Filmes de comédia"],
    [horrorMovies, "Filmes de terror"],
    [myList, "Minha lista"],
  ];

  const { index, setIndex } = useScroll(COMPONENTS.length);

  console.log("index:", myList);
  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Fake Netflix" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {COMPONENTS.map((component: IComponents, i) => {
        if (i === index) {
          return (
            <MovieContainer
              key={i}
              movies={component[0]}
              title={component[1]}
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
    reqTrending,
    reqTopRated,
    reqActionMovies,
    reqComedyMovies,
    reqHorrorMovies,
    reqTrendingSeries,
    reqPopularMovies,
  ] = await Promise.all([
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fecthTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchTrendingSeries).then((res) => res.json()),
    fetch(requests.fetchPopularMovies).then((res) => res.json()),
  ]);

  interface Id {
    id: string | number;
  }
  // FETCH VIDEOS FROM EACH MOVIE
  const dinamicReqs = {
    trending: reqTrending.results.map(async (item: Id) => {
      const { url } = dinamicRequests(item.id);
      return await fetch(url).then((res) => res.json());
    }),
    topRated: reqTopRated.results.map(async (item: Id) => {
      const { url } = dinamicRequests(item.id);
      return await fetch(url).then((res) => res.json());
    }),
    actionMovies: reqActionMovies.results.map(async (item: Id) => {
      const { url } = dinamicRequests(item.id);
      return await fetch(url).then((res) => res.json());
    }),
    comedyMovies: reqComedyMovies.results.map(async (item: Id) => {
      const { url } = dinamicRequests(item.id);
      return await fetch(url).then((res) => res.json());
    }),
    horrorMovies: reqHorrorMovies.results.map(async (item: Id) => {
      const { url } = dinamicRequests(item.id);
      return await fetch(url).then((res) => res.json());
    }),
    trendingSeries: reqTrendingSeries.results.map(async (item: Id) => {
      const { url } = dinamicRequests(item.id);
      return await fetch(url).then((res) => res.json());
    }),
    popularMovies: reqPopularMovies.results.map(async (item: Id) => {
      const { url } = dinamicRequests(item.id);
      return await fetch(url).then((res) => res.json());
    }),
  };

  const trendingNowTrailers = await Promise.all(dinamicReqs.trending);
  const topRatedTrailers = await Promise.all(dinamicReqs.topRated);
  const actionMoviesTrailers = await Promise.all(dinamicReqs.actionMovies);
  const comedyMoviesTrailers = await Promise.all(dinamicReqs.comedyMovies);
  const horrorMoviesTrailers = await Promise.all(dinamicReqs.horrorMovies);
  const trendingSeriesTrailers = await Promise.all(dinamicReqs.trendingSeries);
  const popularMoviesTrailers = await Promise.all(dinamicReqs.popularMovies);

  // MERGE MOVIE INFO AND VIDEO IN ONE ARRAY
  const trendingNow = reqTrending.results.map((item: Movie, i: number) => ({
    ...item,
    trailer: trendingNowTrailers[i],
  }));
  const topRated = reqTopRated.results.map((item: Movie, i: number) => ({
    ...item,
    trailer: topRatedTrailers[i],
  }));
  const action = reqActionMovies.results.map((item: Movie, i: number) => ({
    ...item,
    trailer: actionMoviesTrailers[i],
  }));
  const comedy = reqComedyMovies.results.map((item: Movie, i: number) => ({
    ...item,
    trailer: comedyMoviesTrailers[i],
  }));
  const horror = reqHorrorMovies.results.map((item: Movie, i: number) => ({
    ...item,
    trailer: horrorMoviesTrailers[i],
  }));
  const series = reqTrendingSeries.results.map((item: Movie, i: number) => ({
    ...item,
    trailer: trendingSeriesTrailers[i],
  }));
  const popular = reqPopularMovies.results.map((item: Movie, i: number) => ({
    ...item,
    trailer: popularMoviesTrailers[i],
  }));

  return {
    props: {
      trendingNow: trendingNow,
      topRated: topRated,
      actionMovies: action,
      comedyMovies: comedy,
      horrorMovies: horror,
      trendingSeries: series,
      popularMovies: popular,
    },
  };
};
