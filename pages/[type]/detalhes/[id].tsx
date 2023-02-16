import { GetServerSideProps } from "next";
import Header from "../../../components/header/Header";
import {
  IVideo,
  IVideoRequest,
  MovieDetails,
  SerieDetails,
  WatchProvider,
  MediaType,
} from "../../../typing";
import getMovieDetails from "../../../utils/getMovieDetails";
import Details from "../../../components/individual_media/Details";
import Head from "next/head";
import useHeader from "../../../hooks/useHeader";
import { getServerSideTrailers } from "../../../utils/getTrailers";
import getWatchProvider from "../../../utils/getWatchProvider";

interface Props {
  details: MovieDetails & SerieDetails;
  trailer: IVideo[];
  providers: WatchProvider;
}
export default function App({ details, trailer, providers }: Props) {
  const transparentNav = useHeader();
  return (
    <>
      <Head>
        <title>{`Netflix Filmes - ${details.title}`}</title>
        <meta
          name="description"
          content="Netflix - Assista ao melhores filmes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        className={`transition-all ease-linear duration-50 bg-black ${
          transparentNav
            ? "bg-opacity-0 hover:bg-opacity-100"
            : "bg-opacity-100"
        }`}
      />
      <Details details={details} trailer={trailer} providers={providers} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (content) => {
  const queryID = content.query.id;
  const { type } = content.query;
  const id = Number(queryID);

  const checkMediaType = () => {
    if (type === "filmes") return "movie";
    if (type === "series") return "tv";
    else {
      throw new Error("Nao aceitamos esse parametro");
    }
  };
  const mediaType = checkMediaType();
  const results: MovieDetails | SerieDetails = await getMovieDetails(
    id,
    mediaType
  ).then((res) => res);
  const details = isMovie(results);

  const trailer: IVideoRequest = await getServerSideTrailers(
    id,
    mediaType
  ).then((res) => res);

  const watchProviders: WatchProvider = await getWatchProvider(
    id,
    mediaType
  ).then((res) => res.results.BR);

  function isMovie(arg: MovieDetails | SerieDetails) {
    if (mediaType === "movie" || "filmes") return arg as MovieDetails;
    else {
      return arg as SerieDetails;
    }
  }

  interface SSRProps {
    details: MovieDetails | SerieDetails;
    trailer: IVideo[];
    providers?: WatchProvider;
  }
  const props: SSRProps = {
    trailer: trailer.results,
    details: details,
  };

  if (watchProviders) props.providers = watchProviders;
  return { props };
};
