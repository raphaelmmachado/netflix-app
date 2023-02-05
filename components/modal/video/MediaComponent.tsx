import { IVideo, YTIds } from "../../../typing";

interface Props {
  videoIndex: number;
  selectedVideo?: IVideo[];
  youtubeVideos: YTIds[];
  clearVideo: () => void;
}
export default function MediaComponent({
  videoIndex,
  selectedVideo,
  youtubeVideos,
  clearVideo,
}: Props) {
  return (
    <>
      {selectedVideo ? (
        <iframe
          onEnded={() => clearVideo()}
          onCompositionEnd={() => clearVideo()}
          id="modal-video"
          className="aspect-video w-full"
          src={`https://www.youtube.com/embed/${selectedVideo[videoIndex].key}`}
          title={selectedVideo[videoIndex].type}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : (
        <iframe
          onEnded={() => clearVideo()}
          onCompositionEnd={() => clearVideo()}
          id="modal-video"
          className="aspect-video w-full"
          src={`https://www.youtube.com/embed/${youtubeVideos[videoIndex].id.videoId}`}
          title={youtubeVideos[videoIndex].snippet.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
    </>
  );
}
