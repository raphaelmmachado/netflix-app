import { IVideo, YTIds } from "../../../typing";
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
