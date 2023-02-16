import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { useEffect, useState } from "react";
import { IVideo, YTIds, SerieDetails, MovieDetails } from "../../../typing";
import { searchYoutubeVideos } from "../../../utils/searchYoutubeVideos";
import MediaComponent from "../../modal/video/MediaComponent";
import VideoLinks from "../../modal/video/VideoLinks";
interface Props {
  trailer: IVideo[];
  movieDetails?: MovieDetails;
  serieDetails?: SerieDetails;
}
export default function VideoSection({
  trailer,
  movieDetails,
  serieDetails,
}: Props) {
  const [videoIndex, setVideoIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [youtubeVideos, setYoutubeVideos] = useState<YTIds[]>([]);

  useEffect(() => {
    if (trailer.length < 1) searchOnYT();
  }, []);
  //if not search on youtube
  function searchOnYT() {
    let query = "";
    if (serieDetails?.name || serieDetails?.original_name) {
      query = `serie ${serieDetails.name} cena trailer`;
    } else {
      query = `filme ${movieDetails?.title} trailer oficial`;
    }

    serieDetails ||
      (movieDetails &&
        searchYoutubeVideos(query)
          .then((res) => {
            res && setYoutubeVideos(res);
          })
          .catch((err) => console.log(err)));
  }
  return (
    <>
      {" "}
      <section className="my-8 bg-def_black">
        {showVideo && (
          <>
            <XMarkIcon
              onClick={() => setShowVideo(false)}
              className="w-8 h-8 text-white hover:cursor-pointer bg-gray/30 rounded-sm"
            />
            <MediaComponent
              videoIndex={videoIndex}
              selectedVideo={trailer}
              youtubeVideos={youtubeVideos}
              clearVideo={() => {
                setShowVideo(false);
              }}
            />
          </>
        )}
      </section>
      <section>
        <div
          className="px-4 my-8 rounded-md bg-black/80
   flex flex-wrap justify-center"
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
            : youtubeVideos.map((item, i) => {
                return (
                  <>
                    <VideoLinks
                      key={i + 100}
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
      </section>
    </>
  );
}
