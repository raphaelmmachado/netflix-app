import Head from "next/head";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import SearchInput from "../../../components/grid/SearchInput";
const Header = dynamic(() => import("../../../components/header/Header"));
const Footer = dynamic(() => import("../../../components/grid/Footer"));
const MediaGrid = dynamic(() => import("../../../components/grid/MediaGrid"));
import { Media, MediaType } from "../../../typing";
import { movieRequests } from "../../../constants/moviesRequests";
import { movieGenres, slugs, tvGenres } from "../../../constants/genres";
import GenreSelect from "../../../components/grid/GenreSelect";

interface Props {
  movies: Media[];
  mediaType: MediaType;
  page: number | undefined;
  genre: string;
  path: "filmes" | "series";
}

export default function App({ movies, page, genre, mediaType, path }: Props) {
  const [searchResults, setSearchResults] = useState<Media[]>([]);

  const handleFoundMedia = (media: Media[], total_results: number) => {
    setSearchResults(media);
  };
  const router = useRouter();

  const previousPage = () => {
    if (page && page > 1) {
      router.push(`/${path}/${genre}/${--page}`);
    }
  };

  const nextPage = () => {
    if (page && page < 500) {
      router.push(`/${path}/${genre}/${++page}`);
    }
  };
  return (
    <main className="px-12 py-8 pt-20 min-h-screen">
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
      <section className="flex justify-between items-center">
        <SearchInput
          placeholder="Buscar filme"
          handleFoundMedia={handleFoundMedia}
          mediaType={mediaType}
        />
        <GenreSelect
          items={path === "filmes" ? movieGenres : tvGenres}
          path={path}
        />
      </section>

      {searchResults.length > 0 ? (
        <MediaGrid medias={searchResults!} mediaType={mediaType} />
      ) : (
        <MediaGrid medias={movies} mediaType={mediaType} />
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
  const { type } = content.query;

  // query can be an array so i had to check, thankyou typescript
  const genre = `${
    !Array.isArray(content.query.genre) && content.query.genre
      ? `${content.query.genre}`
      : ""
  }`;
  const checkMediaType = () => {
    if (type === "filmes") return "movie";
    if (type === "series") return "tv";
    else {
      throw new Error("Nao aceitamos esse parametro");
    }
  };
  //parse query to number
  const page = content.query.page ? +content.query.page : undefined;
  const mediaType = checkMediaType();
  const id = slugs[genre].id;

  const movies =
    page &&
    (await fetch(movieRequests({ page, mediaType, id })).then((res) =>
      res.json()
    ));

  return {
    props: {
      movies: movies.results,
      page: page,
      genre: genre,
      path: type,
      mediaType: mediaType,
    },
  };
};
