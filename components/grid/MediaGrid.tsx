import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import VideoModal from "../modal/VideoModal";
import { Movie } from "../../typing";
import Card from "./Card";
import InfoModal from "../modal/InfoModal";

interface Props {
  media: Movie[];
  mediaType: "filmes" | "series";
}

export default function MediaGrid({ media, mediaType }: Props) {
  const [showVideo, setShowVideo] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie>();
  const router = useRouter();

  let page = router.query.page ? +router.query.page : undefined;

  const handlePrevPage = () => {
    if (page && page > 1) {
      router.push(`/${mediaType}/${--page}`);
    }
  };
  const handleNextPage = () => {
    if (page) {
      router.push(`/${mediaType}/${++page}`);
    }
  };
  const selectAMovie = useCallback(
    (movie: Movie) => {
      setSelectedMovie(movie);
    },
    [selectedMovie]
  );

  return (
    <>
      <section
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
       lg:grid-cols-6 auto-cols-fr place-content-center
       place-items-center gap-x-10 gap-y-16 px-12 py-8 pt-32"
      >
        {media.map((movie, i) => {
          return (
            <>
              <Card
                key={movie.id}
                movie={movie}
                setShowVideo={setShowVideo}
                setShowInfo={setShowInfo}
                selectAMovie={selectAMovie}
              />
            </>
          );
        })}
      </section>
      <footer className="w-full flex justify-center gap-4 mt-12">
        {page && page > 1 && (
          <ArrowLeftIcon
            onClick={handlePrevPage}
            className=" w-6 h-6 cursor-pointer text-gray"
          />
        )}
        <div className="text-gray">Página {page}</div>
        {page && (
          <ArrowRightIcon
            onClick={handleNextPage}
            className="text-gray w-6 h-6 cursor-pointer"
          />
        )}
      </footer>

      {showVideo && selectedMovie && (
        <VideoModal
          selectedMovie={selectedMovie}
          showVideoModal={showVideo}
          setShowVideoModal={setShowVideo}
          mediaType={mediaType === "filmes" ? "movie" : "tv"}
        />
      )}
      {showInfo && selectedMovie && (
        <InfoModal
          selectedMovie={selectedMovie}
          showInfoModal={showInfo}
          setShowInfoModal={setShowInfo}
        />
      )}
    </>
  );
}
