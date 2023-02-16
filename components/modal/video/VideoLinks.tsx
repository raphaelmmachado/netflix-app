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
      <div
        className="flex items-center gap-2 cursor-pointer bg-smokewt text-black
    font-semibold rounded-md text-sm px-2 m-1 shadow-lg w-fit"
        onClick={() => onClick()}
      >
        <h1>{type}</h1>
        {site === "YouTube" && <YoutubeIcon pathFill="#b9090b" />}
      </div>
    </>
  );
}
