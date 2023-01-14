interface Props {
  title: string;
  overview: string;
}
export default function MovieInfoModal({ title, overview }: Props) {
  return (
    <div>
      <h1 className="text-xl p-1">{title}</h1>
      <p className="tracking-wide font-light">{overview}</p>
    </div>
  );
}
