interface Props {
  title: string;
  setIndex: () => void;
}
export default function NavLinks({ title, setIndex }: Props) {
  return (
    <>
      <li onClick={() => setIndex()} className="hover:text-red cursor-pointer">
        {title}
      </li>
    </>
  );
}
