import { Dispatch, SetStateAction } from "react";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { IVideo } from "../../typing";
interface Props {
  title?: string;
  children?: JSX.Element;
  showVideoModal: boolean;
  selectedVideo: IVideo | null;
  setShowVideoModal: Dispatch<SetStateAction<boolean>>;
}

export default function VideoModal({
  title,
  children,
  selectedVideo,
  showVideoModal,
  setShowVideoModal,
}: Props) {
  return showVideoModal ? (
    <section
      className="bg-black/70 fixed w-full h-full
  flex justify-center items-center z-50 top-0 left-0"
    >
      <div
        className="min-w-[450px] sm:min-w-[640px] md:min-w-[768px] lg:min-w-[1024px]
        rounded-sm flex flex-col"
      >
        <button className="self-end" onClick={() => setShowVideoModal(false)}>
          <span>
            {" "}
            <XMarkIcon
              className="h-8 w-8 rounded-sm hover:bg-gray/30
             p-1 transition-colors"
            />
          </span>
        </button>

        {selectedVideo?.site === "YouTube" && (
          <iframe
            className="aspect-video w-full"
            src={`https://www.youtube.com/embed/${selectedVideo?.key}`}
            title={`${selectedVideo?.name}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </section>
  ) : null;
}
