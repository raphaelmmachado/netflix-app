//react / next
import { lazy, Suspense } from "react";
import Image from "next/image";
//components
import MediaHeader from "./subcomponents/MediaHeader";
import TitleDesc from "./subcomponents/TitleDesc";
import RatingBox from "./subcomponents/RatingBox";
const VideoSection = lazy(() => import("./subcomponents/VideoSection"));
const Creators = lazy(() => import("./subcomponents/Creators"));
const Providers = lazy(() => import("./subcomponents/Providers"));
//constants / utils
import tmdbApiConfig from "../../constants/apiConfiguration";
import mostSpokenLanguages from "../../constants/mostSpokenLanguages";
import {
  IVideo,
  MovieDetails,
  SerieDetails,
  WatchProvider,
} from "../../typing";
import FormateDateToBR from "../../utils/formatDate";
import formatToCurrency from "../../utils/formatToCurrency";
import calculateRuntime from "../../utils/calculateRuntime";
import Seasons from "./subcomponents/Seasons";

const BASE_URL = tmdbApiConfig.images.secure_base_url;
const BACKDROP_SIZE = tmdbApiConfig.images.backdrop_sizes;
const POSTER_SIZE = tmdbApiConfig.images.poster_sizes;
const PROFILE_SIZE = tmdbApiConfig.images.profile_sizes[1];

interface Props {
  details: MovieDetails & SerieDetails;
  trailer: IVideo[];
  providers: WatchProvider;
}

export default function Details({ details, trailer, providers }: Props) {
  const [hours, remainingMinutes] = calculateRuntime(
    details.runtime ?? details.episode_run_time[0]
  );

  const langs = mostSpokenLanguages;
  return (
    <>
      <header
        className="bg-black
      relative  min-h-screen z-0"
      >
        <Suspense
          fallback={
            <Image
              src={`${BASE_URL}${BACKDROP_SIZE[0]}/${details.backdrop_path}`}
              alt="backdrop"
              fill
              priority
              sizes="100vw"
              className="object-cover aspect-video  shadow-2xl"
            />
          }
        >
          <Image
            src={`${BASE_URL}${BACKDROP_SIZE[3]}/${details.backdrop_path}`}
            alt="backdrop"
            fill
            priority
            sizes="100vw"
            className="object-cover aspect-video  shadow-2xl"
          />
        </Suspense>{" "}
      </header>
      <main
        className="absolute top-72 pt-2 w-full
        bg-black px-4"
      >
        <section className="md:pl-72">
          <div className="flex items-center justify-between">
            <MediaHeader
              title={details.title ?? details.name}
              originalTitle={details.original_title ?? details.original_name}
              release={FormateDateToBR(
                details.release_date ?? details.first_air_date,
                {
                  dateStyle: "medium",
                }
              )}
              last={FormateDateToBR(details.last_air_date!, {
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
          <Suspense
            fallback={
              <Image
                src={`${BASE_URL}${POSTER_SIZE[0]}/${details.poster_path}`}
                alt="poster"
                width={235}
                height={180}
                className=" md:absolute shadow-2xl
           mr-4 rounded-md
           md:-top-24 md:left-4"
              />
            }
          >
            <Image
              src={`${BASE_URL}${POSTER_SIZE[3]}/${details.poster_path}`}
              alt="poster"
              width={235}
              height={180}
              className=" md:absolute shadow-2xl
           mr-4 rounded-md
           md:-top-24 md:left-4"
            />
          </Suspense>
          <div className="grid md:grid-cols-4 place-content-start gap-4">
            {/* MOVIE */}
            {details.runtime && (
              <TitleDesc
                title={"Duração"}
                value={`${hours}h ${remainingMinutes}m`}
              />
            )}
            {details.budget && (
              <TitleDesc
                title="Orçamento"
                value={formatToCurrency(details.budget)}
              />
            )}
            {details.revenue && (
              <TitleDesc
                title="Receita"
                value={formatToCurrency(details.revenue)}
              />
            )}
            {/* TV */}
            {details.number_of_episodes && (
              <TitleDesc title="Episódios" value={details.number_of_episodes} />
            )}
            {details.number_of_seasons && (
              <TitleDesc title="Temporadas" value={details.number_of_seasons} />
            )}
            {!details.runtime && details.episode_run_time[0] && (
              <TitleDesc
                title={"Duração de Episódio"}
                value={`${hours > 0 ? `${hours}h` : " "} ${
                  remainingMinutes > 0 ? `${remainingMinutes}m` : " "
                }`}
              />
            )}
            {details.original_language && (
              <TitleDesc
                title={"Idioma Original"}
                value={langs[details.original_language]}
              />
            )}{" "}
          </div>
        </section>
        <br />
        <Suspense>
          {details.seasons && (
            <Seasons
              img_URL={`${BASE_URL}${POSTER_SIZE[1]}/`}
              seasons={details.seasons}
            />
          )}
          <VideoSection movieDetails={details} trailer={trailer} />
          {details.created_by && (
            <Creators
              creators={details.created_by}
              img_URL={`${BASE_URL}${PROFILE_SIZE}/`}
            />
          )}
          <br />
          {providers && <Providers providers={providers} />}
        </Suspense>
      </main>
    </>
  );
}
