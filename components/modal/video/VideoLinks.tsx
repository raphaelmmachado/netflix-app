import YoutubeIcon from "./YoutubeIcon";
interface Props {
  type: string;
  site: string;
  onClick: () => void;
}
export default function VideoLinks({ type, site, onClick }: Props) {
  return (
    <>
      {" "}
      <div className="video-modal-movie-links" onClick={() => onClick()}>
        <h1>{type}</h1>
        {site === "YouTube" && <YoutubeIcon pathFill="#b9090b" />}
      </div>
    </>
  );
}
