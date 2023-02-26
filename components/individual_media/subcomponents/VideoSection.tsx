import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { useEffect, useState } from "react";
import { IVideo, YTIds, SerieDetails, MovieDetails } from "../../../typing";
import { searchYoutubeVideos } from "../../../utils/requests/searchYoutubeVideos";
import MediaComponent from "../../modal/video/MediaComponent";
import VideoLinks from "../../modal/video/VideoLinks";
interface Props {
  trailer: IVideo[];
  details: MovieDetails & SerieDetails;
}
export default function VideoSection({ trailer, details }: Props) {
  const [videoIndex, setVideoIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [youtubeVideos, setYoutubeVideos] = useState<YTIds[]>([]);

  useEffect(() => {
    if (trailer.length < 1) searchOnYT();
  }, []);
  //if not search on youtube
  function searchOnYT() {
    let query = "";
    if (details?.name) {
      query = `serie ${details.name}  
    } cena trailer oficial ${details.original_name}`;
    } else {
      query = `filme ${details?.title} trailer oficial ${details?.original_title}`;
    }

    details &&
      searchYoutubeVideos(query)
        .then((res) => {
          res && setYoutubeVideos(res);
        })
        .catch((err) => console.log(err));
  }
  return (
    <>
      {" "}
      <section className={`my-8 ${showVideo ? "md:p-2 lg:p-12" : ""}`}>
        {showVideo && (
          <>
            <XMarkIcon
              onClick={() => setShowVideo(false)}
              className="w-8 h-8 my-2 text-white hover:cursor-pointer bg-gray/30 rounded-md"
            />
            <MediaComponent
              videoIndex={videoIndex}
              selectedVideo={trailer}
              youtubeVideos={youtubeVideos}
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
                  <VideoLinks
                    key={item.key}
                    type={item.type}
                    site={item.site}
                    onClick={() => {
                      setVideoIndex(i);
                      setShowVideo(true);
                    }}
                  />
                );
              })
            : youtubeVideos.map((item, i) => {
                return (
                  <VideoLinks
                    key={item.id.videoId}
                    site="YouTube"
                    type="Youtube"
                    onClick={() => {
                      setVideoIndex(i);
                      setShowVideo(true);
                    }}
                  />
                );
              })}
        </div>
      </section>
    </>
  );
}
