interface Props {
  title: string;
  value: string | number | Date;
  pClass?: string;
}
export default function TitleDesc({ title, value, pClass }: Props) {
  return (
    <>
      <div>
        <h3 className="text-midgray text-sm">{title}</h3>
        <p className={pClass}>
          <>{value}</>
        </p>
      </div>
    </>
  );
}
