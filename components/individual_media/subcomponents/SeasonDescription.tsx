interface Props {
  title: string | string[];
  value: string | number;
}
export default function SeasonDescription({ title, value }: Props) {
  return (
    <span>
      <h3 className="text-xs text-midgray">{title}</h3>
      <p className="text-sm font-thin ">{value}</p>
    </span>
  );
}
