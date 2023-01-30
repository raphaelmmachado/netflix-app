import { GetServerSideProps } from "next";
import { Movie } from "../../typing";
import { movieRequests } from "../../constants/moviesRequests";
import Header from "../../components/header/Header";
import MediaGrid from "../../components/grid/MediaGrid";
import Head from "next/head";

interface Props {
  movies: Movie[];
  page: string | string[] | undefined;
}

export default function App({ movies, page }: Props) {
  return (
    <main>
      <Head>
        <title>{`Netflix Filmes - Página ${page}`}</title>
        <meta
          name="description"
          content="Netflix - Assista ao melhores filmes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header className={"bg-black  border-b-2 border-gray/10"} />
      <MediaGrid media={movies} mediaType="filmes" />
    </main>
  );
}
export const getServerSideProps: GetServerSideProps = async (content) => {
  content.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const { page } = content.query;
  const mediaType = "movie";

  const movies = await fetch(movieRequests({ page, mediaType })).then((res) =>
    res.json()
  );

  return {
    props: {
      movies: movies.results,
      page: page,
    },
  };
};
