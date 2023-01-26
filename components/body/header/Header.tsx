import { useEffect, useState } from "react";
import Image from "next/image";
import useWindowSize from "../../../hooks/useWindowSize";
import NavLinks from "./links/NavLinks";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../utils/firebaseConfig";

export default function Header() {
  const [mobile, setMobile] = useState(false);
  const { width } = useWindowSize();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (width !== undefined) {
      if (width < 3) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    }
  }, [width]);
  const placeholderIMG = "/assets/ProfileIMG.svg";
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
                <NavLinks title="Início" path="/" />
                <NavLinks title="Séries" />
                <NavLinks title="Filmes" />
                <NavLinks title="Lançamentos" />
                <NavLinks title="Minha Lista" path="/minha_lista" />
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
              {user && (
                <div className="flex items-center gap-2">
                  <h1 className="text-sm">{user?.displayName}</h1>
                  <Image
                    src={`${user?.photoURL}`}
                    alt="user"
                    width={32}
                    height={32}
                  />{" "}
                </div>
              )}
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
            <div className="flex gap-4 items-center">
              {/* <>
                <MagnifyingGlassIcon
                  height={24}
                  width={24}
                  className="text-white"
                />
              </> */}

              {user && (
                <div className="flex items-center gap-2">
                  <h1 className="text-sm">{user?.displayName}</h1>
                  <Image
                    src={`${user ? user.photoURL : placeholderIMG}`}
                    alt="user"
                    width={32}
                    height={32}
                  />{" "}
                  {/* <>
                  <Bars3Icon className="h-8 w-8" />
                </> */}
                </div>
              )}
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
