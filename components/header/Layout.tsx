import dynamic from "next/dynamic";
const Header = dynamic(() => import("./Header"));
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
// ${
//   transparentNav
//     ? "bg-opacity-0 hover:bg-opacity-100"
//     : "bg-opacity-100"
// }
