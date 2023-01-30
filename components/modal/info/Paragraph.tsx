interface Props {
  title: string;
  value: string | number | Date;
}
export default function Paragraph({ title, value }: Props) {
  return (
    <>
      <div className="inline-flex items-center gap-1">
        <p>
          {title}:{" "}
          <span className="text-gray">
            <>{value}</>
          </span>{" "}
        </p>
      </div>
    </>
  );
}
