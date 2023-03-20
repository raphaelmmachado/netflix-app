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
        className={`transition hover:underline underline-offset-4  ${
          activeTab ? "text-red font-bold hover:text-red" : "text-midgray "
        }  ${
          navIsOpen && !activeTab
            ? "text-smokewt font-light"
            : "text-midgray hover:text-smokewt"
        } cursor-pointer `}
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
