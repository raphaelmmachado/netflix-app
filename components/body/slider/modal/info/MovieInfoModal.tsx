interface Props {
  title: string;
  overview: string;
}
export default function MovieInfoModal({ title, overview }: Props) {
  return (
    <div>
      <header className="text-center text-xl border-b border-midgray  text-white mb-8">
        {title}
      </header>

      <p className="tracking-wide font-light line indent-8 leading-relaxed">
        {overview}
      </p>
    </div>
  );
}
