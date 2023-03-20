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
        tabIndex={0}
        className="flex items-center gap-2 cursor-pointer bg-smokewt text-black
    font-semibold rounded-md text-sm px-2 m-1 shadow-lg w-fit"
        onClick={() => onClick()}
        role="button"
      >
        <>
          {type}
          {site === "YouTube" && <YoutubeIcon pathFill="#b9090b" />}
        </>
      </div>
    </>
  );
}
