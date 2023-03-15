//react / next
import dynamic from "next/dynamic";
import Image from "next/image";
import { Context } from "../../context/ContextProvider";
import { useContext } from "react";
import useWindowSize from "../../hooks/useWindowSize";
//components
import MediaHeader from "./details/MediaHeader";
import TitleDesc from "./details/TitleDesc";
import RatingBox from "./details/RatingBox";
import FormateDateToBR from "../../utils/formatters/formatDate";
import formatToCurrency from "../../utils/formatters/formatToCurrency";
import calculateRuntime from "../../utils/formatters/calculateRuntime";

import Picture from "../Picture";
import ListButton from "../home/banner/ListButton";
import Provider from "./details/Provider";

//dynamic components
const MovieSlider = dynamic(() => import("../home/slider/MovieSlider"));
const PosterSlider = dynamic(() => import("./details/PosterSlider"));
const VideoSection = dynamic(() => import("./details/VideoSection"));
const Creators = dynamic(() => import("./details/Creators"));
const Providers = dynamic(() => import("./details/Providers"));
const Cast = dynamic(() => import("./details/Cast"));

//constants / utils
import tmdbApiConfig from "../../constants/apiConfiguration";
import mostSpokenLanguages from "../../constants/mostSpokenLanguages";
import { Media, MovieDetails, SerieDetails } from "../../typing";
import LastEpisode from "./details/LastEpisode";

interface Props {
  details: MovieDetails & SerieDetails;
}

export default function Details({ details }: Props) {
  const { width } = useWindowSize();
  const { myList, setMyList } = useContext(Context);

  const [hours, remainingMinutes] = calculateRuntime(
    details.runtime ?? details.episode_run_time[0]
  );
  const BASE_URL = tmdbApiConfig.images.secure_base_url;
  const BACKDROP_SIZE = tmdbApiConfig.images.backdrop_sizes;
  const POSTER_SIZE = tmdbApiConfig.images.poster_sizes;
  const STILL_SIZE = tmdbApiConfig.images.still_sizes;
  const imagePlaceholder = `https://via.placeholder.com/1440x768/141414/fff?text=sem+imagem`;

  const langs = mostSpokenLanguages;

  return (
    <>
      {/* BANNER */}
      <header className="relative flex items-center justify-center  min-h-screen  z-0">
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
              minimalist={false}
              added={myList && myList.some((item) => item.id === details.id)}
              addToList={() =>
                import("../../utils/addMediaToList").then((module) => {
                  const genre_ids = details.genres.map((item) => item.id);
                  details.genre_ids = genre_ids;
                  module.default(details as Media, myList, setMyList);
                })
              }
            />
          </div>{" "}
          {/* STREAMING PROVIDERS */}
          <div className="static md:absolute -top-14 left-[21.4rem] z-20">
            {" "}
            {details["watch/providers"].results.BR?.flatrate &&
              details["watch/providers"].results.BR.flatrate.length > 0 && (
                <Provider
                  name={
                    details["watch/providers"].results.BR.flatrate[0]
                      .provider_name
                  }
                  path={
                    details["watch/providers"].results.BR.flatrate[0].logo_path
                  }
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
          </div>
          <br />
        </section>
        {/* TAGLINE */}
        <section className="px-6 sm:px-12 my-20">
          {details.tagline && (
            <h3 className="text-center text-3xl italic before:content-[open-quote] after:content-[close-quote]">
              {details.tagline}
            </h3>
          )}
        </section>
        {/* MEDIA CREDITS  */}
        <section className="my-14" id="cast-seasons-row">
          {details.created_by && details.created_by.length > 0 && (
            <Creators creators={details.created_by} />
          )}
          {details.credits?.cast && details.credits?.cast?.length > 0 && (
            <Cast cast={details.credits?.cast} />
          )}
        </section>
        {/* LAST EPISODE TO AIR */}

        <section className="px-6 sm:px-12 my-8">
          {details.last_episode_to_air && (
            <LastEpisode
              title={details.last_episode_to_air.name}
              episode_number={details.last_episode_to_air.episode_number}
              description={details.last_episode_to_air.overview}
              date={details.last_episode_to_air.air_date}
              image_path={`${BASE_URL}${STILL_SIZE[3]}/${details.last_episode_to_air.still_path}`}
            />
          )}
        </section>
        {/* POSTER SLIDER */}
        <section>
          {details.seasons && (
            <PosterSlider posters={details.seasons} sliderTitle="Temporadas" />
          )}
        </section>
        {/* ABSOLUTE POSITION MAIN POSTER */}
        <section
          className="flex px-6 sm:px-12 my-8 sm:my-0 gap-6 md:justify-center "
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
            {/* {details.production_countries && (
              <TitleDesc
                title={"Feito no"}
                value={details.production_countries[0].iso_3166_1}
              />
            )} */}
          </div>
        </section>

        <br />
        {/* VIDEO SECTION */}
        {details.videos?.results && details.videos?.results?.length > 0 && (
          <VideoSection details={details} trailer={details.videos?.results} />
        )}
        {details["watch/providers"].results.BR && (
          <Providers providers={details["watch/providers"].results.BR} />
        )}
        <br />
        {/* RECOMMENDED MEDIA SLIDER */}
        {details.recommendations &&
          details.recommendations.results.length > 0 && (
            <MovieSlider
              medias={details.recommendations.results}
              title="Recomendados"
            />
          )}
      </main>
    </>
  );
}
