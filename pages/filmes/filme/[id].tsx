import { GetServerSideProps } from "next";
import { useState } from "react";
import Header from "../../../components/header/Header";
import { IVideo, IVideoRequest, MediaDetails, YTitems } from "../../../typing";
import getMovieDetails from "../../../utils/getMovieDetails";
import IndividualMedia from "../../../components/individual_media/IndividualMedia";
import Head from "next/head";
import useHeader from "../../../hooks/useHeader";
import { getServerSideTrailers } from "../../../utils/getTrailers";

interface Props {
  details: MediaDetails;
  trailer: IVideo[];
}
export default function App({ details, trailer }: Props) {
  const [media] = useState(details);
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
          transparentNav ? "bg-opacity-5" : "bg-opacity-100"
        }`}
      />
      <IndividualMedia details={media} trailer={trailer} />
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (content) => {
  const queryID = content.query.id;
  const mediaType = "movie";
  const type = "movie";
  const id = Number(queryID);

  const details: MediaDetails = await getMovieDetails({ id, mediaType }).then(
    (res) => res
  );
  const trailer: IVideoRequest = await getServerSideTrailers({
    id,
    type,
    mediaType,
  }).then((res) => res);

  return { props: { details: details, trailer: trailer.results } };
};
