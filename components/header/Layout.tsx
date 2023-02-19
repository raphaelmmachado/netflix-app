import dynamic from "next/dynamic";
const Header = dynamic(() => import("./Header"));
import useHeader from "../../hooks/useHeader";
interface Props {
  children: JSX.Element;
}
export default function Layout({ children }: Props) {
  const transparentNav = useHeader();
  return (
    <>
      <Header
        className={`transition-all ease-linear duration-50 bg-black ${
          transparentNav
            ? "bg-opacity-0 hover:bg-opacity-100"
            : "bg-opacity-100"
        }`}
      />
      <main>{children}</main>
    </>
  );
}
