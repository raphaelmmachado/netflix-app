interface Props {
  title?: string | string[];
  value?: string | number | Date;
}
export default function SeasonDescription({ title, value }: Props) {
  return (
    <span>
      <h3 className="text-xs text-midgray">{title}</h3>
      <p className="font-thin text-smokewt">
        <>{value}</>
      </p>
    </span>
  );
}
