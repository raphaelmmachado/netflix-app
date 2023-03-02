import { GetServerSideProps } from "next";
import {
  IVideo,
  IVideoRequest,
  Media,
  MediaCast,
  MediaCredits,
  MovieDetails,
  SerieDetails,
  WatchProvider,
} from "../../../typing";

import Details from "../../../components/individual_media/Details";
import Head from "next/head";
import { getServerSideTrailers } from "../../../utils/requests/getTrailers";

import getMoreDetails from "../../../utils/requests/getMoreDetails";

interface Props {
  details: MovieDetails & SerieDetails;
  trailer: IVideo[];
  providers: WatchProvider;
  cast: MediaCast[];
  recommendations: Media[];
}
export default function App({
  details,
  trailer,
  providers,
  cast,
  recommendations,
}: Props) {
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
        recommendations={recommendations}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (content) => {
  content.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
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

  const [results, trailer, watchProviders, cast, recommendations] =
    await Promise.all([
      getMoreDetails(id, mediaType, "").then(
        (res: MovieDetails | SerieDetails) => res
      ),
      getServerSideTrailers(id, mediaType).then((res: IVideoRequest) => res),
      getMoreDetails(id, mediaType, "/watch/providers").then((res) => {
        const providers: WatchProvider = res.results.BR;
        return providers;
      }),
      getMoreDetails(id, mediaType, "/credits").then(
        (res: MediaCredits) => res
      ),
      getMoreDetails(id, mediaType, "/recommendations").then((res) => {
        const rec: Media[] = res.results;
        return rec;
      }),
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
    trailer?: IVideo[];
    providers?: WatchProvider;
    cast?: MediaCast[];
    recommendations?: Media[];
  }
  const props: SSRProps = {
    details: details,
  };
  if (cast) props.cast = cast.cast;
  if (trailer) props.trailer = trailer.results;
  if (recommendations) props.recommendations = recommendations;
  if (watchProviders) props.providers = watchProviders;
  return { props };
};
