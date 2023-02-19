import { GetServerSideProps } from "next";
import {
  IVideo,
  IVideoRequest,
  MediaCast,
  MediaCredits,
  MovieDetails,
  SerieDetails,
  WatchProvider,
} from "../../../typing";
import getMovieDetails from "../../../utils/requests/getMovieDetails";
import Details from "../../../components/individual_media/Details";
import Head from "next/head";
import { getServerSideTrailers } from "../../../utils/requests/getTrailers";
import getWatchProvider from "../../../utils/requests/getWatchProvider";
import getCredits from "../../../utils/requests/getCredits";

interface Props {
  details: MovieDetails & SerieDetails;
  trailer: IVideo[];
  providers: WatchProvider;
  cast: MediaCast[];
}
export default function App({ details, trailer, providers, cast }: Props) {
  return (
    <>
      <Head>
        <title>{`${details.title ?? details.name}`}</title>
        <meta
          name="description"
          content="Netflix - Assista ao melhores filmes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Details
        details={details}
        trailer={trailer}
        providers={providers}
        cast={cast}
      />
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

  const [results, trailer, watchProviders, getCast] = await Promise.all([
    getMovieDetails(id, mediaType).then(
      (res: MovieDetails | SerieDetails) => res
    ),
    getServerSideTrailers(id, mediaType).then((res: IVideoRequest) => res),
    getWatchProvider(id, mediaType).then((res) => {
      const providers: WatchProvider = res.results.BR;
      return providers;
    }),
    getCredits(id, mediaType).then((res: MediaCredits) => res),
  ]);

  const details = isMovie(results);
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
    cast: MediaCast[];
  }
  const props: SSRProps = {
    trailer: trailer.results,
    details: details,
    cast: getCast.cast,
  };
  if (watchProviders) props.providers = watchProviders;
  return { props };
};
