//react/next
import Head from "next/head";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
//components
import SearchInput from "../../../components/grid/SearchInput";
import GenreSelect from "../../../components/grid/GenreSelect";
import MediaGrid from "../../../components/grid/MediaGrid";
const Footer = dynamic(() => import("../../../components/grid/Footer"));
//type
import { Media, MediaType } from "../../../typing";
//constants
import { movieRequests } from "../../../constants/moviesRequests";
import { movieGenres, slugs, tvGenres } from "../../../constants/genres";
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
  const pathTab = `${path[0].toUpperCase()}${path.substring(1, path.length)}`;
  const genreTab = `${genre[0].toUpperCase()}${genre.substring(
    1,
    genre.length
  )}`;
  return (
    <main className="px-12 py-8 sm:pl-20 min-h-screen">
      <Head>
        <title>{`${pathTab} - ${genreTab} - ${page}`}</title>
        <meta
          name="description"
          content="Netflix - Assista ao melhores filmes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section
        className="flex flex-col gap-6 sm:flex-row items-center
       justify-center sm:justify-between mt-16 sm:my-10 relative"
      >
        <SearchInput
          placeholder={`${
            path === "filmes" ? "Buscar filmes" : "Buscar series"
          }`}
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
    Array.isArray(content.query.genre)
      ? (content.query.genre as string[]) && content.query.genre.join(",")
      : content.query.genre
  }`;
  const checkMediaType = () => {
    if (type === "filmes") return "movie";
    if (type === "series") return "tv";
    else {
      throw new Error("Parametros [type] deve ser 'filmes' ou 'series' ");
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
