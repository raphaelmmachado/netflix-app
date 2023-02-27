import Link from "next/link";
interface Props {
  title: string;
  path: string;
  children: JSX.Element;
  navIsOpen: boolean;
}

export default function NavLinks({ title, path, children, navIsOpen }: Props) {
  return (
    <>
      <li className="hover:text-red cursor-pointer ">
        <Link href={path} className="flex items-center gap-3">
          <>
            <span>{children}</span>
            {navIsOpen && <h1>{title}</h1>}
          </>
        </Link>
      </li>
    </>
  );
}
