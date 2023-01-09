import { GetServerSideProps } from "next";
import Head from "next/head";
import { Suspense } from "react";
//components
import Header from "../components/header/Header";
import HighlightedMovie from "../components/body/HighlightedMovie";
import Modal from "../components/Modal";
import { ContextProvider } from "../context/ContextProvider";
//local
import { IRequests } from "../typing";
import { requests, dinamicRequests } from "../utils/requests";

export default function App({
  trendingNow,
  netflixOriginals,
  topRated,
  comedyMovies,
  horrorMovies,
  actionMovies,
  trendingSeries,
  popularMovies,
  trendingNowTrailers,
  netflixOriginalsTrailers,
  topRatedTrailers,
  actionMoviesTrailers,
  comedyMovieTrailers,
  horrorMovieTrailers,
  trendingSeriesTrailers,
  popularMoviesTrailers,
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
        <Modal />
        <HighlightedMovie
          movies={trendingNow}
          trailers={trendingNowTrailers}
          title="Em Destaque"
        />
        <Suspense fallback={<div>Loading...</div>}>
          <HighlightedMovie
            movies={netflixOriginals}
            trailers={netflixOriginalsTrailers}
            title="Originais Netflix"
          />{" "}
          <HighlightedMovie
            movies={popularMovies}
            title="Filmes Populares"
            trailers={popularMoviesTrailers}
          />
          <HighlightedMovie
            movies={trendingSeries}
            trailers={trendingSeriesTrailers}
            title="Series em Destaque"
          />
          <HighlightedMovie
            movies={topRated}
            trailers={topRatedTrailers}
            title="Melhores Avaliados"
          />
          <HighlightedMovie
            movies={actionMovies}
            trailers={actionMoviesTrailers}
            title="Filmes de Ação"
          />
          <HighlightedMovie
            movies={comedyMovies}
            trailers={comedyMovieTrailers}
            title="Filmes de comédia"
          />
          <HighlightedMovie
            movies={horrorMovies}
            trailers={horrorMovieTrailers}
            title="Filmes de Terror"
          />
        </Suspense>
      </ContextProvider>
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
    documentaries,
    discoverMovie,
    trendingSeries,
    popularMovies,
  ] = await Promise.all([
    fetch(requests.fetchImages).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fecthTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
    fetch(requests.fetchDiscoverMovie).then((res) => res.json()),
    fetch(requests.fetchTrendingSeries).then((res) => res.json()),
    fetch(requests.fetchPopularMovies).then((res) => res.json()),
  ]);
  interface ID {
    id: string | number;
  }
  // dinamic fetchs
  const dinamicReqs = {
    trending: trendingNow.results.map(async (item: ID) => {
      const { url } = dinamicRequests(item.id);
      return await fetch(url).then((res) => res.json());
    }),
    netflixOriginals: netflixOriginals.results.map(async (item: ID) => {
      const { url } = dinamicRequests(item.id);
      return await fetch(url).then((res) => res.json());
    }),
    topRated: topRated.results.map(async (item: ID) => {
      const { url } = dinamicRequests(item.id);
      return await fetch(url).then((res) => res.json());
    }),
    actionMovies: actionMovies.results.map(async (item: ID) => {
      const { url } = dinamicRequests(item.id);
      return await fetch(url).then((res) => res.json());
    }),
    comedyMovies: comedyMovies.results.map(async (item: ID) => {
      const { url } = dinamicRequests(item.id);
      return await fetch(url).then((res) => res.json());
    }),
    horrorMovies: horrorMovies.results.map(async (item: ID) => {
      const { url } = dinamicRequests(item.id);
      return await fetch(url).then((res) => res.json());
    }),
    trendingSeries: trendingSeries.results.map(async (item: ID) => {
      const { url } = dinamicRequests(item.id);
      return await fetch(url).then((res) => res.json());
    }),
    popularMovies: popularMovies.results.map(async (item: ID) => {
      const { url } = dinamicRequests(item.id);
      return await fetch(url).then((res) => res.json());
    }),
  };
  const trendingNowTrailers = await Promise.all(dinamicReqs.trending);
  const netflixOriginalsTrailers = await Promise.all(
    dinamicReqs.netflixOriginals
  );
  const topRatedTrailers = await Promise.all(dinamicReqs.topRated);
  const actionMoviesTrailers = await Promise.all(dinamicReqs.actionMovies);
  const comedyMoviesTrailers = await Promise.all(dinamicReqs.comedyMovies);
  const horrorMoviesTrailers = await Promise.all(dinamicReqs.horrorMovies);
  const trendingSeriesTrailers = await Promise.all(dinamicReqs.trendingSeries);
  const popularMoviesTrailers = await Promise.all(dinamicReqs.popularMovies);
  return {
    props: {
      apiConfiguration: apiConfiguration,
      trendingNow: trendingNow.results,
      netflixOriginals: netflixOriginals.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      documentaries: documentaries.results,
      discoverMovie: discoverMovie.results,
      trendingSeries: trendingSeries.results,
      popularMovies: popularMovies.results,
      trendingNowTrailers: trendingNowTrailers,
      netflixOriginalsTrailers: netflixOriginalsTrailers,
      topRatedTrailers: topRatedTrailers,
      actionMoviesTrailers: actionMoviesTrailers,
      comedyMovieTrailers: comedyMoviesTrailers,
      horrorMovieTrailers: horrorMoviesTrailers,
      trendingSeriesTrailers: trendingSeriesTrailers,
      popularMoviesTrailers: popularMoviesTrailers,
    },
  };
};
