//react / next
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
//components
import MediaComponent from "../modal/video/MediaComponent";
import MediaHeader from "./title_desc/MediaHeader";
import TitleDesc from "./title_desc/TitleDesc";
import RatingBox from "./title_desc/RatingBox";
import VideoLinks from "../modal/video/VideoLinks";
import GlobeAltIcon from "@heroicons/react/24/outline/GlobeAltIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
//constants / utils
import tmdbApiConfig from "../../constants/apiConfiguration";
import mostSpokenLanguages from "../../constants/mostSpokenLanguages";
import { IVideo, MovieDetails, SerieDetails, YTIds } from "../../typing";
import FormateDateToBR from "../../utils/formatDate";
import formatToCurrency from "../../utils/formatToCurrency";
import calculateRuntime from "../../utils/calculateRuntime";
import { searchYoutubeVideos } from "../../utils/searchYoutubeVideos";

const BASE_URL = tmdbApiConfig.images.secure_base_url;
const BACKDROP_SIZE = tmdbApiConfig.images.backdrop_sizes[3];
const POSTER_SIZE = tmdbApiConfig.images.poster_sizes[3];
const LOGO_SIZE = tmdbApiConfig.images.logo_sizes[3];
interface Props {
  details: MovieDetails;
  trailer: IVideo[];
}

export default function IndividualMedia({ details, trailer }: Props) {
  const [videoIndex, setVideoIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [yVideos, setYVideos] = useState<YTIds[]>([]);

  useEffect(() => {
    if (trailer.length < 1) searchOnYT();
  }, []);
  //if not search on youtube
  function searchOnYT() {
    details &&
      searchYoutubeVideos(
        `${details.title ?? details.name} trailer oficial`,
        "snippet"
      )
        .then((res: YTIds[]) => {
          setYVideos(res);
        })
        .catch((err) => console.log(err));
  }
  const { hours, remainingMinutes } = calculateRuntime(details.runtime!);
  const langs = mostSpokenLanguages;
  const hasTrailers = trailer.length > 0;
  return (
    <>
      <header className="bg-black min-h-[55vh] relative">
        <Image
          src={`${BASE_URL}${BACKDROP_SIZE}/${details.backdrop_path}`}
          alt="backdrop"
          fill
          priority
          className="object-cover aspect-video  shadow-2xl"
        />{" "}
        <Image
          src={`${BASE_URL}${POSTER_SIZE}/${details.poster_path}`}
          alt="poster"
          width={235}
          height={180}
          className="shadow-2xl mr-4 rounded-md
           absolute top-56 left-4"
        />
        {/* {details.homepage && (
          <Link
            href={details.homepage}
            className="absolute top-40 left-4 flex items-center justify-center bg-white rounded-md w-10 h-10"
          >
            <GlobeAltIcon className="w-8 h-8 text-black" />
          </Link>
        )} */}
      </header>
      <main
        className="absolute pt-2 w-full min-h-screen
        bg-black -z-10"
      >
        <section className="lg:pl-72">
          <div className="flex items-center justify-between pr-8">
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
        <br />
        <br />
        <br />
        <section className="grid grid-flow-col place-content-center place-items-center px-8 gap-24">
          <TitleDesc
            title="Orçamento"
            value={formatToCurrency(details.budget)}
          />

          <TitleDesc
            title="Receita"
            value={formatToCurrency(details.revenue)}
          />
          <TitleDesc
            title={"Duração"}
            value={`${hours}h ${remainingMinutes}m`}
          />
          <TitleDesc
            title={"Idioma Original"}
            value={langs[details.original_language]}
          />
        </section>
        <section className="my-8 px-8 bg-def_black">
          {showVideo && (
            <>
              <XMarkIcon
                onClick={() => setShowVideo(false)}
                className="w-8 h-8 text-white hover:cursor-pointer bg-gray/30 rounded-sm"
              />
              <MediaComponent
                videoIndex={videoIndex}
                selectedVideo={trailer}
                youtubeVideos={yVideos}
                clearVideo={() => {
                  setShowVideo(false);
                }}
              />
            </>
          )}
        </section>
        <div
          className="px-4 my-8 rounded-md bg-black/80
         grid grid-flow-col place-content-center"
        >
          {trailer.length > 0
            ? trailer.map((item, i) => {
                return (
                  <>
                    <VideoLinks
                      key={i}
                      type={item.type}
                      site={item.site}
                      onClick={() => {
                        setVideoIndex(i);
                        setShowVideo(true);
                      }}
                    />
                  </>
                );
              })
            : yVideos.map((item, i) => {
                return (
                  <>
                    <VideoLinks
                      key={i}
                      site="YouTube"
                      type="Youtube"
                      onClick={() => {
                        setVideoIndex(i);
                        setShowVideo(true);
                      }}
                    />
                  </>
                );
              })}
        </div>
        <br />
        <section
          className="grid grid-cols-4 place-content-center
        gap-4 place-items-center"
        >
          {details.production_companies.map((item, i) => {
            return (
              <Image
                key={i}
                src={`${BASE_URL}${LOGO_SIZE}/${item.logo_path}`}
                alt="company_logo"
                width={200}
                height={150}
                className="bg-midgray/20 p-4 rounded-sm"
              />
            );
          })}
        </section>
      </main>
    </>
  );
}
{
  /* <div>
            <h3 className="text-midgray text-sm">Avaliação</h3>
            <p className="text-sm">
              Média{" "}
              <span className="text-def_green-400">
                {details.vote_average.toFixed(1)}
              </span>{" "}
              de{" "}
              <span className="text-def_green-400">{details.vote_count}</span>{" "}
              votos
            </p>
          </div> */
}
