import { GetServerSideProps } from "next";
import Head from "next/head";
import Header from "../components/header/Header";
import HighlightedMovie from "../components/body/HighlightedMovie";
import SliderStacks from "../components/body/SliderStacks";
import { IRequests } from "../typing";
import requests from "../utils/requests";
import { ContextProvider } from "../context/ContextProvider";

export default function App({
  trendingNow,
  netflixOriginals,
  topRated,
  comedyMovies,
  horrorMovies,
  actionMovies,
  romanceMovies,
  discoverMovie,
  trendingSeries,
  documentaries,
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
      <ContextProvider>
        <HighlightedMovie movies={netflixOriginals} />
      </ContextProvider>
      <SliderStacks
        requests={{
          trendingNow,
          netflixOriginals,
          topRated,
          comedyMovies,
          horrorMovies,
          actionMovies,
          discoverMovie,
          romanceMovies,
          trendingSeries,
          documentaries,
        }}
      />
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
