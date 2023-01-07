interface Text {
  text: string;
}

export default function MovieDescription({ text }: Text) {
  return (
    <p
      className={`text-white max-w-fit
       md:max-w-[50vw] line-clamp-6 font-medium tracking-wide`}
    >
      {text}
    </p>
  );
}
