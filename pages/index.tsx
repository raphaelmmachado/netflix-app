import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";
import Header from "../components/header/Header";
import HighlightedMovie from "../components/body/HighlightedMovie";
import { Movie } from "../typing";
import requests from "../utils/requests";
import MovieSlider from "../components/MovieSlider";

interface IHome {
  apiConfiguration?: string;
  trendingNow: Movie[];
  netflixOriginals: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  discoverMovie: Movie[];
  trendingSeries: Movie[];
}
export default function Home({
  trendingNow,
  netflixOriginals,
  topRated,
  comedyMovies,
  horrorMovies,
  actionMovies,
  trendingSeries,
  documentaries,
}: IHome) {
  return (
    <>
      <Head>
        <title>NetFlix</title>
        <meta name="description" content="Movies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <HighlightedMovie movies={trendingNow}>
        <MovieSlider
          movies={trendingNow}
          title="Popular on Netflix"
          background={false}
          poster={false}
        />
      </HighlightedMovie>
      <MovieSlider
        movies={netflixOriginals}
        poster
        title="Netflix Originals"
        background
      />
      <MovieSlider
        movies={trendingSeries}
        poster
        title="Trending series"
        background
      />
      <MovieSlider movies={topRated} poster title="Top rated" background />
      <MovieSlider
        movies={comedyMovies}
        poster
        title="Comedy movies"
        background
      />
      <MovieSlider
        movies={horrorMovies}
        poster
        title="Horror movies"
        background
      />
      <MovieSlider
        movies={actionMovies}
        poster
        title="Action movies"
        background
      />
      <MovieSlider
        movies={documentaries}
        poster
        title="Documentaries"
        background
      />
    </>
  );
}
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
