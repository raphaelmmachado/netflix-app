interface Props {
  title: string;
  overview: string;
}
export default function MovieInfoModal({ title, overview }: Props) {
  return (
    <div>
      <header className="text-center border-b border-midgray mb-2 text-midgray">
        Sinopse
      </header>
      <h1 className="text-xl p-1">{title}</h1>
      <p className="tracking-wide font-light">{overview}</p>
    </div>
  );
}
