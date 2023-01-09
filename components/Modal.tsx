import { useContext } from "react";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { Context } from "../context/ContextProvider";
interface Props {
  title?: string;
  children?: JSX.Element;
}

const Modal: React.FC<Props> = ({ title, children }) => {
  const { video, setShowModal, showModal } = useContext(Context);
  console.log(video?.key);

  return showModal ? (
    <section
      className="bg-black/70 fixed w-full h-full
  flex justify-center items-center z-50 top-0 left-0"
    >
      <div
        className="bg-transparent min-w-[800px] min-h-[500px]
      rounded-sm  flex flex-col"
      >
        <button className="self-end" onClick={() => setShowModal(false)}>
          <span>
            {" "}
            <XMarkIcon className="h-8 w-8 rounded-sm hover:bg-gray/30 p-1 transition-colors" />
          </span>
        </button>
        {video?.site === "YouTube" && (
          <iframe
            width="800"
            height="500"
            src={`https://www.youtube.com/embed/${video?.key}`}
            title={`${video?.name}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </section>
  ) : null;
};

export default Modal;
