interface Props {
  vote_average: number;
}
export default function Vote_Average({ vote_average }: Props) {
  return (
    <div className="absolute right-0 top-0 w-10">
      <p className="text-sm text-center text-def_green-500">{vote_average}</p>
    </div>
  );
}
