import { useContext } from "react";
import dynamic from "next/dynamic";
import { Context } from "../../context/ContextProvider";
import { Media } from "../../typing";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Card from "./Card";
const VideoModal = dynamic(() => import("../modal/VideoModal"), { ssr: false });
interface Props {
  medias: Media[];
  mediaType: "tv" | "movie";
}
export default function MediaGrid({ medias, mediaType }: Props) {
  const { selectedMedia, showVideoModal } = useContext(Context);
  const [gridRef] = useAutoAnimate<HTMLElement>();
  return (
    <>
      <section
        ref={gridRef}
        className="grid sm:grid-cols-2 md:grid-cols-3 auto-cols-fr place-content-center
       place-items-center gap-10 my-8"
      >
        {medias.map((media, i) => {
          return <Card key={media.id} media={media} mediaType={mediaType} />;
        })}
      </section>

      {showVideoModal && selectedMedia && <VideoModal mediaType={mediaType} />}
    </>
  );
}
