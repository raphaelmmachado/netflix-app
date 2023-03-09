import Link from "next/link";
import { useRouter } from "next/router";
interface Props {
  title: string;
  path: string;
  children: JSX.Element;
  navIsOpen: boolean;
}

export default function NavLinks({ title, path, children, navIsOpen }: Props) {
  const router = useRouter();
  const activeTab = router.asPath === path;
  return (
    <>
      <li
        className={`${
          activeTab ? "text-red " : "text-midgray  hover:text-smokewt"
        } ${
          navIsOpen && !activeTab ? "text-smokewt" : "text-midgray"
        } cursor-pointer`}
      >
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
