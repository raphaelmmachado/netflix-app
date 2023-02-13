//react / next
import { lazy, Suspense } from "react";
import Image from "next/image";
//components
import MediaHeader from "./subcomponents/MediaHeader";
import TitleDesc from "./subcomponents/TitleDesc";
import RatingBox from "./subcomponents/RatingBox";
const VideoSection = lazy(() => import("./subcomponents/VideoSection"));
//constants / utils
import tmdbApiConfig from "../../constants/apiConfiguration";
import mostSpokenLanguages from "../../constants/mostSpokenLanguages";
import { IVideo, MovieDetails } from "../../typing";
import FormateDateToBR from "../../utils/formatDate";
import formatToCurrency from "../../utils/formatToCurrency";
import calculateRuntime from "../../utils/calculateRuntime";
const BASE_URL = tmdbApiConfig.images.secure_base_url;
const BACKDROP_SIZE = tmdbApiConfig.images.backdrop_sizes;
const POSTER_SIZE = tmdbApiConfig.images.poster_sizes;
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
        className="absolute pt-2 w-full min-h-screen
        bg-black px-4"
      >
        <section className="md:pl-72">
          <div className="flex items-center justify-between">
            <MediaHeader
              title={details.title}
              originalTitle={details.original_title}
              release={FormateDateToBR(details.release_date, {
                dateStyle: "medium",
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
        <Suspense>
          <VideoSection movieDetails={details} trailer={trailer} />
        </Suspense>
        <br />
      </main>
    </>
  );
}
