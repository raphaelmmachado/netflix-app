import dynamic from "next/dynamic";
const Nav = dynamic(() => import("./Nav"));
interface Props {
  children: JSX.Element;
}
export default function Layout({ children }: Props) {
  return (
    <>
      <Nav />
      <>{children}</>
    </>
  );
}
