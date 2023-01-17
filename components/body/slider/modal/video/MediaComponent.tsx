import { IVideo, Movie } from "../../../../../typing";

interface Props {
  videoIndex: number;
  selectedVideo?: IVideo[];
  clearVideo: () => void;
}
export default function MediaComponent({
  videoIndex,
  selectedVideo,
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
        <h1>Problema ao tocar o video 🤡</h1>
      )}
    </>
  );
}
