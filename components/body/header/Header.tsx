import Image from "next/image";
import useWindowSize from "../../../hooks/useWindowSize";
import { useEffect, useState } from "react";
import NavLinks from "./links/NavLinks";
interface Props {
  setIndex: (i: number) => void;
}
export default function Header({ setIndex }: Props) {
  const [mobile, setMobile] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width !== undefined) {
      if (width < 3) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    }
  }, [width]);

  return (
    <header>
      {" "}
      {!mobile ? (
        <>
          <nav className="header-nav">
            <div className="header-nav-left flex" id="nav--left-div">
              <Image
                src="/assets/NetflixLogoSvg.svg"
                alt="logo"
                width={111}
                height={30}
                priority
              />
              <ul className="header-nav-ul">
                <NavLinks title="Início" setIndex={() => setIndex(0)} />
                <NavLinks title="Séries" setIndex={() => setIndex(2)} />
                <NavLinks title="Filmes" setIndex={() => setIndex(1)} />
                <NavLinks title="Lançamentos" setIndex={() => setIndex(0)} />
                <NavLinks title="Minha Lista" setIndex={() => setIndex(7)} />
              </ul>
            </div>
            <div className="header-nav-right" id="nav--right-div">
              <div className="flex items-center gap-3">
                {/* <MagnifyingGlassIcon
                  height={20}
                  width={20}
                  className="text-white"
                />
                <input
                  type="text"
                  placeholder="Procurar"
                  className="bg-transparent text-white px-2 "
                /> */}
              </div>
              <div className="flex items-center gap-4">
                {/* <GiftIcon className="icon" />
                <BellIcon className="text-white h-5 w-5" /> */}
                {/* <span className="flex items-center gap-1">
                  <Image
                    src="/assets/ProfileIMG.svg"
                    alt="user"
                    width={32}
                    height={32}
                  />
                  <Bars3Icon className="text-white h-6 w-6" />
                </span> */}
              </div>
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav className="header-nav-mobile">
            <div>
              {" "}
              <Image
                src="/assets/NetflixLogoSvg.svg"
                alt="logo"
                width={111}
                height={30}
                priority
              />
            </div>
            {/* <div className="flex gap-4 items-center">
              <>
                <MagnifyingGlassIcon
                  height={24}
                  width={24}
                  className="text-white"
                />
              </>

              <div className="flex items-center">
                <Image
                  src="/assets/ProfileIMG.svg"
                  alt="user"
                  width={32}
                  height={32}
                />{" "}
                <>
                  <Bars3Icon className="h-8 w-8" />
                </>
              </div>
            </div> */}
          </nav>
        </>
      )}
    </header>
  );
}
