interface Props {
  votes: string;
}
export default function RatingBox({ votes }: Props) {
  return (
    <>
      <div
        className="absolute sm:static -top-20 flex flex-col items-center p-2 bg-black/90
       text-smokewt rounded-md border-2 border-smokewt"
      >
        <p className="text-sm text-midgray">avaliação</p>
        <p className="text-2xl">{votes}</p>
      </div>
    </>
  );
}
