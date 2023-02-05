interface Props {
  title: string;
  value: string | number | Date;
}
export default function Paragraph({ title, value }: Props) {
  return (
    <>
      <p className="inline-flex items-center gap-1">
        {title}:{" "}
        <span className="text-gray">
          <>{value}</>
        </span>{" "}
      </p>
    </>
  );
}
