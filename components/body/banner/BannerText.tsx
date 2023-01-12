interface Props {
  title: string;
  description: string;
}

export default function BannerText({ title, description }: Props) {
  return (
    <>
      {" "}
      <h1 className=" text-white font-bold text-5xl pb-2">{title}</h1>
      <p
        className={`text-white max-w-fit
  md:max-w-[50vw] line-clamp-6 font-base tracking-wide`}
      >
        {description}
      </p>
    </>
  );
}
