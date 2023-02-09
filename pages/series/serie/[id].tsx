import { GetServerSideProps } from "next";
import Header from "../../../components/header/Header";
import { IVideo, IVideoRequest, SerieDetails, YTitems } from "../../../typing";
import getMovieDetails from "../../../utils/getMovieDetails";
import IndividualSerie from "../../../components/individual_media/IndividualSerie";
import Head from "next/head";
import useHeader from "../../../hooks/useHeader";
import { getServerSideTrailers } from "../../../utils/getTrailers";

interface Props {
  details: SerieDetails;
  trailer: IVideo[];
}
export default function App({ details, trailer }: Props) {
  const transparentNav = useHeader();
  return (
    <>
      <Head>
        <title>{`Netflix Series - ${details.name}`}</title>
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
      <IndividualSerie details={details} trailer={trailer} />
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (content) => {
  const queryID = content.query.id;
  const mediaType = "tv";
  const type = "tv";
  const id = Number(queryID);

  const details: SerieDetails = await getMovieDetails({ id, mediaType }).then(
    (res) => res
  );
  const trailer: IVideoRequest = await getServerSideTrailers({
    id,
    type,
    mediaType,
  }).then((res) => res);

  return { props: { details: details, trailer: trailer.results } };
};
