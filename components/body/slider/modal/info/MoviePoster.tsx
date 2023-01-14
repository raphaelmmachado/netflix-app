import Image from "next/image";
interface Props {
  adult: boolean;
  title: string;
  url: string;
}
export default function MoviePoster({ adult, title, url }: Props) {
  return (
    <div className="relative">
      {adult ? (
        <Image
          src={"/assets/adult.png"}
          width={30}
          height={30}
          alt="+18"
          className="absolute"
        />
      ) : null}

      <Image src={url} width={180} height={300} alt={title} />
    </div>
  );
}
