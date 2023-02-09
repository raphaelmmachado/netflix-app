//react / next
import { useState, useEffect } from "react";
import Image from "next/image";
//components
import MediaHeader from "./subcomponents/MediaHeader";
import TitleDesc from "./subcomponents/TitleDesc";
import RatingBox from "./subcomponents/RatingBox";
//constants / utils
import tmdbApiConfig from "../../constants/apiConfiguration";
import mostSpokenLanguages from "../../constants/mostSpokenLanguages";
import { IVideo, MovieDetails, YTIds } from "../../typing";
import FormateDateToBR from "../../utils/formatDate";
import formatToCurrency from "../../utils/formatToCurrency";
import calculateRuntime from "../../utils/calculateRuntime";
import VideoSection from "./subcomponents/VideoSection";

const BASE_URL = tmdbApiConfig.images.secure_base_url;
const BACKDROP_SIZE = tmdbApiConfig.images.backdrop_sizes[3];
const POSTER_SIZE = tmdbApiConfig.images.poster_sizes[3];
const LOGO_SIZE = tmdbApiConfig.images.logo_sizes[3];
interface Props {
  details: MovieDetails;
  trailer: IVideo[];
}

export default function IndividualMovie({ details, trailer }: Props) {
  const { hours, remainingMinutes } = calculateRuntime(details.runtime!);
  const langs = mostSpokenLanguages;
  return (
    <>
      <header
        className="bg-black min-h-[40vh] md:min-h-[55vh] 
      relative z-0"
      >
        <Image
          src={`${BASE_URL}${BACKDROP_SIZE}/${details.backdrop_path}`}
          alt="backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover aspect-video  shadow-2xl"
        />{" "}
      </header>
      <main
        className="absolute pt-2 w-full min-h-screen
        bg-black px-4"
      >
        <section className="md:pl-72">
          <div className="flex items-center justify-between">
            <MediaHeader
              title={details.title}
              originalTitle={details.original_title}
              release={FormateDateToBR(details.release_date)}
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
            className=" md:absolute shadow-2xl
           mr-4 rounded-md
           md:-top-24 md:left-4"
          />
          <div className="grid md:grid-cols-4 place-content-start gap-4">
            <TitleDesc
              title={"Duração"}
              value={`${hours}h ${remainingMinutes}m`}
            />
            <TitleDesc
              title={"Idioma Original"}
              value={langs[details.original_language]}
            />{" "}
            <TitleDesc
              title="Orçamento"
              value={formatToCurrency(details.budget)}
            />
            <TitleDesc
              title="Receita"
              value={formatToCurrency(details.revenue)}
            />
          </div>
        </section>
        <br />

        <VideoSection movieDetails={details} trailer={trailer} />
        <br />
      </main>
    </>
  );
}
