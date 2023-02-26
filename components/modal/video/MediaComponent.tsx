import { IVideo, YTIds } from "../../../typing";
import useWindowSize from "../../../hooks/useWindowSize";
import ExcalamationIcon from "@heroicons/react/24/solid/ExclamationTriangleIcon";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
interface Props {
  videoIndex: number;
  selectedVideo?: IVideo[];
  youtubeVideos: YTIds[];
}
export default function MediaComponent({
  videoIndex,
  selectedVideo,
  youtubeVideos,
}: Props) {
  const { width, mobile } = useWindowSize();
  if (width! < 3 && mobile)
    return (
      <div className="bg-black flex flex-col items-center">
        <ArrowPathIcon className="h-10 w-10 text-midgray" />
        <div className=" flex gap-3 p-4">
          <ExcalamationIcon className="w-6 h-6 text-def_yellow-300" />{" "}
          <p className="font-thin text-def_yellow-300">
            Por favor, gire o seu dispositivo para horizontal!
          </p>
        </div>
      </div>
    );

  return (
    //if DB has trailer, play selected trailer. else play selected youtube api generated video.
    <>
      {selectedVideo && selectedVideo?.length > 0 ? (
        <iframe
          id="modal-video"
          className="min-w-full"
          src={`https://www.youtube.com/embed/${selectedVideo[videoIndex].key}`}
          title={selectedVideo[videoIndex].type}
          allow="playsinline=1;accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : (
        <iframe
          id="modal-video"
          className="min-w-full"
          src={`https://www.youtube.com/embed/${youtubeVideos[videoIndex].id.videoId}`}
          title="Video gerado pelo youtube"
          allow="playsinline=1;accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
    </>
  );
}
