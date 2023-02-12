import { GetServerSideProps } from "next";
import { Media } from "../../typing";
import { movieRequests } from "../../constants/moviesRequests";
//TODO  CRIAR BUSCA PARA SERIES []
import Header from "../../components/header/Header";

import MediaGrid from "../../components/grid/MediaGrid";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import SearchInput from "../../components/grid/SearchInput";
import Footer from "../../components/grid/Footer";
interface Props {
  series: Media[];
  page: number | undefined;
}
export default function App({ series, page }: Props) {
  const [searchResults, setSearchResults] = useState<Media[]>([]);

  const handleFoundMedia = (media: Media[], total_results: number) => {
    setSearchResults(media);
  };
  const router = useRouter();

  const previousPage = () => {
    if (page && page > 1) {
      router.push(`/series/${--page}`);
    }
  };
  const nextPage = () => {
    if (page && page < 500) {
      router.push(`/series/${++page}`);
    }
  };
  return (
    <main className="px-12 py-8 pt-20 min-h-screen">
      <Head>
        <title>{`Netflix Séries - Página ${page}`}</title>
        <meta
          name="description"
          content="Netflix - Assista as melhores series"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header className="bg-black border-b-2 border-gray/10" />

      <SearchInput
        placeholder="Buscar serie"
        handleFoundMedia={handleFoundMedia}
        mediaType="tv"
      />

      {searchResults.length > 0 ? (
        <MediaGrid medias={searchResults!} mediaType="tv" />
      ) : (
        <MediaGrid medias={series} mediaType="tv" />
      )}
      <Footer page={page} nextPage={nextPage} previousPage={previousPage} />
    </main>
  );
}
export const getServerSideProps: GetServerSideProps = async (content) => {
  content.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  //parse query to number
  const page = content.query.page ? +content.query.page : undefined;
  const mediaType = "tv";
  const series =
    page &&
    (await fetch(movieRequests({ page, mediaType })).then((res) => res.json()));

  return {
    props: {
      series: series.results,
      page: page,
    },
  };
};
