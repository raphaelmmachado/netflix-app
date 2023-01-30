import { useRouter } from "next/router";

interface Props {
  title: string;
  path?: string;
}
export default function NavLinks({ title, path }: Props) {
  const route = useRouter();

  return (
    <>
      <li
        onClick={() => path && route.push(path)}
        className="hover:text-red cursor-pointer"
      >
        {title}
      </li>
    </>
  );
}
