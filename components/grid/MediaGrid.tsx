import { useContext } from "react";
import { Context } from "../../context/ContextProvider";
import VideoModal from "../modal/VideoModal";
import { MediaType, Media } from "../../typing";
import Card from "./Card";

interface Props {
  medias: Media[];
  mediaType: "tv" | "movie";
}
export default function MediaGrid({ medias, mediaType }: Props) {
  const { selectedMedia, showVideoModal } = useContext(Context);

  return (
    <>
      <section
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
       lg:grid-cols-6 auto-cols-fr place-content-center
       place-items-baseline gap-x-10 gap-y-20 my-10"
      >
        {medias.map((media, i) => {
          return <Card key={media.id} media={media} mediaType={mediaType!} />;
        })}
      </section>
      {showVideoModal && selectedMedia && <VideoModal mediaType={mediaType} />}
    </>
  );
}
