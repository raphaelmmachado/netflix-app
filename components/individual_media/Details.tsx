//react / next
import dynamic from "next/dynamic";
import Image from "next/image";
import { Context } from "../../context/ContextProvider";
import { useContext } from "react";
import useWindowSize from "../../hooks/useWindowSize";
//components
import MediaHeader from "./subcomponents/MediaHeader";
import TitleDesc from "./subcomponents/TitleDesc";
import RatingBox from "./subcomponents/RatingBox";
import FormateDateToBR from "../../utils/formatters/formatDate";
import formatToCurrency from "../../utils/formatters/formatToCurrency";
import calculateRuntime from "../../utils/formatters/calculateRuntime";

import Picture from "../Picture";
import ListButton from "../home/banner/ListButton";
import Provider from "./subcomponents/Provider";

//dynamic components
const MovieSlider = dynamic(() => import("../home/slider/MovieSlider"));
const PosterSlider = dynamic(() => import("./subcomponents/PosterSlider"));
const VideoSection = dynamic(() => import("./subcomponents/VideoSection"));
const Creators = dynamic(() => import("./subcomponents/Creators"));
const Providers = dynamic(() => import("./subcomponents/Providers"));
const Cast = dynamic(() => import("./subcomponents/Cast"));

//constants / utils
import tmdbApiConfig from "../../constants/apiConfiguration";
import mostSpokenLanguages from "../../constants/mostSpokenLanguages";
import {
  IVideo,
  Media,
  MediaCast,
  MovieDetails,
  SerieDetails,
  WatchProvider,
} from "../../typing";

interface Props {
  details: MovieDetails & SerieDetails;
  recommendations: Media[];
  trailer: IVideo[];
  providers: WatchProvider;
  cast: MediaCast[];
}

export default function Details({
  details,
  trailer,
  providers,
  cast,
  recommendations,
}: Props) {
  const { width } = useWindowSize();
  const { myList, setMyList } = useContext(Context);
  const [hours, remainingMinutes] = calculateRuntime(
    details.runtime ?? details.episode_run_time[0]
  );
  const BASE_URL = tmdbApiConfig.images.secure_base_url;
  const BACKDROP_SIZE = tmdbApiConfig.images.backdrop_sizes;
  const POSTER_SIZE = tmdbApiConfig.images.poster_sizes;
  const imagePlaceholder = `https://via.placeholder.com/1440x768/141414/fff?text=sem+imagem`;

  const langs = mostSpokenLanguages;
  return (
    <>
      {/* BANNER */}
      <header className="relative  min-h-screen  z-0">
        <Image
          src={`${BASE_URL}${BACKDROP_SIZE[3]}/${details.backdrop_path}`}
          placeholder="blur"
          blurDataURL={imagePlaceholder}
          title={details.title ?? details.name}
          alt="backdrop"
          fill={true}
          priority
          sizes="100vw"
          className="aspect-square sm:aspect-video object-cover"
        />
      </header>
      <main
        className="absolute top-80 pt-2 w-full
          bg-black sm:pl-14"
      >
        <section className="flex px-6 sm:px-12 py-2 w-full justify-between items-center my-4 sm:m-0 sm:p-0">
          {/* ADD TO LIST BUTTON */}
          <div className="static md:absolute md:top-64 md:left-28">
            <ListButton
              added={myList && myList.some((item) => item.id === details.id)}
              addToList={() =>
                import("../../utils/addMediaToList").then((module) => {
                  const genre_ids = details.genres.map((item) => item.id);
                  details.trailer = trailer;
                  details.genre_ids = genre_ids;
                  module.default(details as Media, myList, setMyList);
                })
              }
            />
          </div>{" "}
          {/* STREAMING PROVIDERS */}
          <div className="static md:absolute -top-14 left-[21.4rem] z-20">
            {" "}
            {providers?.flatrate && providers?.flatrate?.length > 0 && (
              <Provider
                name={providers.flatrate[0].provider_name}
                path={providers.flatrate[0].logo_path}
              />
            )}
          </div>
        </section>
        {/* MEDIA INFO HEADER */}
        <section className="px-6 sm:px-12 md:pl-72 mb-8">
          <div className="flex items-center justify-between">
            <MediaHeader
              title={details.title ?? details.name}
              overview={details.overview}
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
              mediaType={details.title ? "movie" : "tv"}
              genres={details.genres}
            />
            <div></div>
          </div>
          <br />
        </section>

        {/* MEDIA CREDITS  */}
        <section className="relative my-20" id="cast-seasons-row">
          {details.created_by && details.created_by.length > 0 && (
            <Creators creators={details.created_by} />
          )}
          {cast.length > 0 && <Cast cast={cast} />}
        </section>
        <section>
          {details.seasons && (
            <PosterSlider posters={details.seasons} sliderTitle="Temporadas" />
          )}
        </section>
        {/* ABSOLUTE POSITION MAIN POSTER */}
        <section
          className="flex px-6 sm:px-12 gap-6 md:justify-center "
          id="media-data-section"
        >
          {width && width < 2 ? (
            <Picture
              src={`${BASE_URL}${POSTER_SIZE[3]}/${details.poster_path}`}
              title={details.title ?? details.name}
              alt="poster"
              priority={true}
              width={150}
              height={180}
              style={{ height: "auto" }}
              className=" md:absolute shadow-lg
            mx- sm:mx-4 rounded-md object-cover
            md:-top-28 md:left-16"
            />
          ) : (
            <Picture
              src={`${BASE_URL}${POSTER_SIZE[3]}/${details.poster_path}`}
              title={details.title ?? details.name}
              alt="poster"
              priority={true}
              width={235}
              height={180}
              style={{ height: "auto" }}
              className=" md:absolute shadow-lg
          mx- sm:mx-4 rounded-md object-cover
          md:-top-28 md:left-16"
            />
          )}

          <div className="grid md:grid-cols-4 place-content-start gap-4 my-8">
            {/* MOVIE DETAILS*/}
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
            {/* TV DETAILS*/}
            {details.number_of_episodes && (
              <TitleDesc title="Episódios" value={details.number_of_episodes} />
            )}
            {details.number_of_seasons && (
              <TitleDesc title="Temporadas" value={details.number_of_seasons} />
            )}
            {!details.runtime &&
              details.episode_run_time.length > 0 &&
              details.episode_run_time[0] && (
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
        {/* VIDEO SECTION */}
        <VideoSection details={details} trailer={trailer} />
        {providers && <Providers providers={providers} />}
        <br />
        {/* RECOMMENDED MEDIA SLIDER */}
        {recommendations.length > 0 && (
          <MovieSlider medias={recommendations} title="Recomendados" />
        )}
      </main>
    </>
  );
}
