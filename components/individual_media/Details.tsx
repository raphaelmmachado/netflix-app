//react / next
import dynamic from "next/dynamic";
import Image from "next/image";
//components
import MediaHeader from "./subcomponents/MediaHeader";
import TitleDesc from "./subcomponents/TitleDesc";
import RatingBox from "./subcomponents/RatingBox";
const VideoSection = dynamic(() => import("./subcomponents/VideoSection"), {
  ssr: false,
});
const Creators = dynamic(() => import("./subcomponents/Creators"), {
  ssr: false,
});
const Providers = dynamic(() => import("./subcomponents/Providers"), {
  ssr: false,
});
const Seasons = dynamic(() => import("./subcomponents/Seasons"), {
  ssr: false,
});
const Cast = dynamic(() => import("./subcomponents/Cast"));
//constants / utils
import tmdbApiConfig from "../../constants/apiConfiguration";
import mostSpokenLanguages from "../../constants/mostSpokenLanguages";
import {
  IVideo,
  MediaCast,
  MovieDetails,
  SerieDetails,
  WatchProvider,
} from "../../typing";
import FormateDateToBR from "../../utils/formatters/formatDate";
import formatToCurrency from "../../utils/formatters/formatToCurrency";
import calculateRuntime from "../../utils/formatters/calculateRuntime";

const BASE_URL = tmdbApiConfig.images.secure_base_url;
const BACKDROP_SIZE = tmdbApiConfig.images.backdrop_sizes;
const POSTER_SIZE = tmdbApiConfig.images.poster_sizes;
const PROFILE_SIZE = tmdbApiConfig.images.profile_sizes[1];

interface Props {
  details: MovieDetails & SerieDetails;
  trailer: IVideo[];
  providers: WatchProvider;
  cast: MediaCast[];
}

export default function Details({ details, trailer, providers, cast }: Props) {
  const [hours, remainingMinutes] = calculateRuntime(
    details.runtime ?? details.episode_run_time[0]
  );

  const langs = mostSpokenLanguages;
  return (
    <>
      <header
        className="bg-gradient-to-t from-black via-black/20 to-black/5
      relative  min-h-screen  z-0"
      >
        <Image
          src={`${BASE_URL}${BACKDROP_SIZE[3]}/${details.backdrop_path}`}
          alt="backdrop"
          fill
          priority
          sizes="100vw"
          className=" aspect-video object-cover"
        />
      </header>
      <main
        className="absolute top-80 pt-2 w-full
         px-4 bg-black pl-14"
      >
        <section className=" md:pl-72">
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
        <section className="relative" id="cast-seasons-row">
          {details.created_by && details.created_by.length > 0 && (
            <Creators
              creators={details.created_by}
              img_URL={`${BASE_URL}${PROFILE_SIZE}/`}
            />
          )}
          {cast.length > 0 && <Cast cast={cast} />}

          {details.seasons && (
            <Seasons
              img_URL={`${BASE_URL}${POSTER_SIZE[1]}/`}
              seasons={details.seasons}
            />
          )}
        </section>

        <section className="flex md:justify-center " id="media-data-section">
          <Image
            src={`${BASE_URL}${POSTER_SIZE[3]}/${details.poster_path}`}
            alt="poster"
            width={235}
            height={180}
            sizes="[190px,220px,235px]"
            style={{ height: "auto" }}
            className=" md:absolute shadow-lg
           mr-4 rounded-md object-cover
           md:-top-24 md:left-20"
          />
          <div className="grid md:grid-cols-4 place-content-start gap-4">
            {/* MOVIE */}
            {details.runtime && (
              <TitleDesc
                title={"Duração"}
                value={`${hours}h ${remainingMinutes}m`}
              />
            )}
            {details.budget > 0 && (
              <TitleDesc
                title="Orçamento"
                value={formatToCurrency(details.budget)}
              />
            )}

            {details.revenue > 0 && (
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
            )}
          </div>
        </section>
        <br />
        <VideoSection details={details} trailer={trailer} />

        <br />
        {providers && <Providers providers={providers} />}
      </main>
    </>
  );
}
