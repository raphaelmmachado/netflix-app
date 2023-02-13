import Image from "next/image";
import { lazy, Suspense } from "react";
//type
import { IVideo, SerieDetails } from "../../typing";
//comps
const VideoSection = lazy(() => import("./subcomponents/VideoSection"));
const Seasons = lazy(() => import("./subcomponents/Seasons"));
const Creators = lazy(() => import("./subcomponents/Creators"));
import TitleDesc from "./subcomponents/TitleDesc";
import MediaHeader from "./subcomponents/MediaHeader";
import RatingBox from "./subcomponents/RatingBox";
//utils
import mostSpokenLanguages from "../../constants/mostSpokenLanguages";
import tmdbApiConfig from "../../constants/apiConfiguration";
import FormateDateToBR from "../../utils/formatDate";
import calculateRuntime from "../../utils/calculateRuntime";

interface Props {
  details: SerieDetails;
  trailer: IVideo[];
}
export default function IndividualSerie({ details, trailer }: Props) {
  const { hours, remainingMinutes } = calculateRuntime(
    details.episode_run_time[0]!
  );
  const langs = mostSpokenLanguages;

  const BASE_URL = tmdbApiConfig.images.secure_base_url;
  const BACKDROP_SIZE = tmdbApiConfig.images.backdrop_sizes;
  const POSTER_SIZE = tmdbApiConfig.images.poster_sizes;

  const PROFILE_SIZE = tmdbApiConfig.images.profile_sizes[1];
  return (
    <>
      {" "}
      <header className="bg-black min-h-[40vh] md:min-h-[55vh] relative z-0">
        <Suspense
          fallback={
            <Image
              src={`${BASE_URL}${BACKDROP_SIZE[0]}/${details.backdrop_path}`}
              alt="backdrop"
              fill
              sizes="100vw"
              priority
              className="object-cover aspect-video shadow-2xl"
            />
          }
        >
          <Image
            src={`${BASE_URL}${BACKDROP_SIZE[3]}/${details.backdrop_path}`}
            alt="backdrop"
            fill
            sizes="100vw"
            priority
            className="object-cover aspect-video shadow-2xl"
          />
        </Suspense>
        <br />
      </header>
      <main
        className="absolute pt-2 w-full min-h-screen
        bg-black px-4"
      >
        <section className="md:pl-72">
          <div className="flex items-center justify-between">
            <MediaHeader
              title={details.name}
              originalTitle={details.original_name}
              release={FormateDateToBR(details.first_air_date, {
                dateStyle: "medium",
              })}
              last={FormateDateToBR(details.last_air_date, {
                dateStyle: "short",
              })}
              genres={details.genres}
            />
            <RatingBox votes={details.vote_average.toFixed(1)} />
          </div>

          <br />
          <TitleDesc
            title="Descrição"
            value={details.overview!}
            pClass="font-thin text-lg"
          />
        </section>
        <br />
        <section className="flex md:justify-center ">
          <Image
            src={`${BASE_URL}${POSTER_SIZE}/${details.poster_path}`}
            alt="poster"
            width={235}
            height={180}
            className=" md:absolute shadow-md
           mr-4 rounded-md
           md:-top-24 md:left-4"
          />
          <div className="grid md:grid-cols-4 place-content-start md:gap-16">
            <TitleDesc title="Episódios" value={details.number_of_episodes} />
            <TitleDesc title="Temporadas" value={details.number_of_seasons} />
            <TitleDesc
              title={"Duração de Episódio"}
              value={`${hours > 0 ? `${hours}h` : " "} ${
                remainingMinutes > 0 ? `${remainingMinutes}m` : " "
              }`}
            />
            <TitleDesc
              title={"Idioma Original"}
              value={langs[details.original_language]}
            />
            <TitleDesc
              title={"Estreou em"}
              value={FormateDateToBR(details.first_air_date, {
                dateStyle: "medium",
              })}
            />
            <TitleDesc
              title={"Ultimo episódio em"}
              value={FormateDateToBR(details.last_air_date, {
                dateStyle: "medium",
              })}
            />
            <br />
          </div>
          <br />
        </section>
        <Suspense>
          <Seasons
            img_URL={`${BASE_URL}${POSTER_SIZE}/`}
            seasons={details.seasons}
          />
          <br />
          <VideoSection serieDetails={details} trailer={trailer} />
          <Creators
            creators={details.created_by}
            img_URL={`${BASE_URL}${PROFILE_SIZE}/`}
          />
          <br />
        </Suspense>
      </main>
    </>
  );
}
