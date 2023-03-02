import dynamic from "next/dynamic";
const Header = dynamic(() => import("./Nav"));
interface Props {
  children: JSX.Element;
}
export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
