import { GetServerSideProps } from "next";
import Head from "next/head";
import { Suspense } from "react";
//components
import Header from "../components/header/Header";
import HighlightedMovie from "../components/body/HighlightedMovie";
//local
import { IRequests } from "../typing";
import { requests } from "../utils/requests";

export default function App({
  trendingNow,
  netflixOriginals,
  topRated,
  comedyMovies,
  horrorMovies,
  actionMovies,
  trendingSeries,
}: IRequests) {
  return (
    <>
      <Head>
        <title>NetFlix</title>
        <meta name="description" content="Movies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <HighlightedMovie movies={trendingNow} title="Trending Movies" />
      <Suspense fallback={<div>Loading...</div>}>
        <HighlightedMovie movies={netflixOriginals} title="Netflix Originals" />{" "}
        <HighlightedMovie movies={trendingSeries} title="Trending Series" />
        <HighlightedMovie movies={topRated} title="Top Rated" />
        <HighlightedMovie movies={actionMovies} title="Action Movies" />
        <HighlightedMovie movies={comedyMovies} title="Comedy Movies" />
        <HighlightedMovie movies={horrorMovies} title="Horror Movies" />{" "}
      </Suspense>
    </>
  );
}

//SERVER SIDE RENDERING
export const getServerSideProps: GetServerSideProps = async (content) => {
  content.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const [
    apiConfiguration,
    trendingNow,
    netflixOriginals,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
    discoverMovie,
    trendingSeries,
  ] = await Promise.all([
    fetch(requests.fetchImages).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fecthTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fecthRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
    fetch(requests.fetchDiscoverMovie).then((res) => res.json()),
    fetch(requests.fetchTrendingSeries).then((res) => res.json()),
  ]);
  return {
    props: {
      apiConfiguration: apiConfiguration,
      trendingNow: trendingNow.results,
      netflixOriginals: netflixOriginals.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      discoverMovie: discoverMovie.results,
      trendingSeries: trendingSeries.results,
    },
  };
};
