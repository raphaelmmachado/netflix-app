import { useEffect, useState } from "react";
import Image from "next/image";
import useWindowSize from "../../hooks/useWindowSize";
import NavLinks from "./NavLinks";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebaseConfig";
import { useRouter } from "next/router";
import LogoutIcon from "@heroicons/react/20/solid/ArrowLeftOnRectangleIcon";
interface Props {
  className: string;
}
export default function Header({ className }: Props) {
  const [mobile, setMobile] = useState(false);
  const [modal, setModal] = useState(false);
  const { width } = useWindowSize();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
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
      {
        <>
          <nav className={`header-nav ${className}`}>
            <div className="header-nav-left flex" id="nav--left-div">
              {mobile ? (
                <Image
                  onClick={() => router.push("/")}
                  src="/favicon.ico"
                  alt="logo"
                  width={32}
                  height={32}
                  className="hover:cursor-pointer"
                />
              ) : (
                <Image
                  onClick={() => router.push("/")}
                  src="/assets/NetflixLogoSvg.svg"
                  alt="logo"
                  width={111}
                  height={30}
                  priority
                  className="hover:cursor-pointer"
                />
              )}
              <ul className="header-nav-ul">
                <NavLinks title="Séries" path="/series/1" />
                <NavLinks title="Filmes" path="/filmes/1" />
                <NavLinks title="Minha Lista" path="/minha_lista" />
              </ul>
            </div>
            <div className="header-nav-right relative" id="nav--right-div">
              {user && (
                <>
                  <div
                    onClick={() => setModal((prev) => !prev)}
                    className="flex items-center gap-2"
                  >
                    {!mobile && (
                      <h1 className="text-sm">{user?.displayName}</h1>
                    )}
                    <Image
                      src={`${user?.photoURL}`}
                      alt="user"
                      width={40}
                      height={40}
                      className="rounded-sm shadow-md hover:cursor-pointer"
                    />
                  </div>
                  {modal && (
                    <div
                      onClick={() => {
                        auth.signOut().then(() => router.push("/login"));
                      }}
                      className="w-fit bg-white text-red flex absolute top-12 -right-3
                   items-center gap-3 px-2 py-1 rounded-sm shadow-md hover:cursor-pointer"
                    >
                      <LogoutIcon className="w-7 h-7" />
                      Sair
                    </div>
                  )}
                </>
              )}
            </div>
          </nav>
        </>
      }
    </header>
  );
}
