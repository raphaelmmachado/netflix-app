import Link from "next/link";
interface Props {
  title: string;
  path: string;
}
export default function NavLinks({ title, path }: Props) {
  return (
    <>
      <li className="hover:text-red cursor-pointer">
        <Link href={path}>{title}</Link>
      </li>
    </>
  );
}
