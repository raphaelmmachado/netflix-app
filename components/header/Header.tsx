//react / next
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
//firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebaseConfig";
//context
import { Context } from "../../context/ContextProvider";
//custom hook
import useWindowSize from "../../hooks/useWindowSize";
//components
import NetflixLogo from "../NetflixLogo";
import NavLinks from "./NavLinks";
import LogoutIcon from "@heroicons/react/20/solid/ArrowRightOnRectangleIcon";
//utils

interface Props {
  className: string;
}
export default function Header({ className }: Props) {
  const { myList } = useContext(Context);
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
      <nav className={`header-nav ${className}`}>
        <div className="header-nav-left flex" id="nav--left-div">
          {mobile ? (
            <div
              className="w-0 px-4 hover:cursor-pointer"
              tabIndex={0}
              onClick={() => router.push("/")}
              onKeyDown={(e) => {
                import("../../utils/checkKeyboardKeys").then(
                  (module) => module.default(e.code) && router.push("/")
                );
              }}
            >
              <NetflixLogo
                svg={{ width: "120", height: "50", fill: "none" }}
                path={{ fill: "#b9090b" }}
                rect={{ width: "80", height: "140", fill: "white" }}
              />
            </div>
          ) : (
            <div
              className="hover:cursor-pointer"
              tabIndex={0}
              onKeyDown={(e) =>
                import("../../utils/checkKeyboardKeys").then(
                  (module) => module.default(e.code) && router.push("/")
                )
              }
              onClick={() => router.push("/")}
            >
              <NetflixLogo
                svg={{ width: "111", height: "50", fill: "none" }}
                path={{ fill: "#b9090b" }}
                rect={{ width: "500", height: "140", fill: "white" }}
              />
            </div>
          )}
          <ul className="header-nav-ul">
            <NavLinks title="Séries" path="/series/1" />
            <NavLinks title="Filmes" path="/filmes/1" />
            {myList.length > 0 && (
              <NavLinks title="Minha Lista" path="/minha_lista" />
            )}
          </ul>
        </div>
        <div className="header-nav-right relative" id="nav--right-div">
          {!loading && user && (
            <>
              <div
                onClick={() => setModal((prev) => !prev)}
                onKeyDown={(e) =>
                  import("../../utils/checkKeyboardKeys").then(
                    (module) =>
                      module.default(e.code) && setModal((prev) => !prev)
                  )
                }
                className="flex items-center gap-2"
              >
                {!mobile && (
                  <a className="text-sm" tabIndex={0}>
                    {user?.displayName}
                  </a>
                )}
                <Image
                  src={`${user?.photoURL}`}
                  tabIndex={0}
                  alt="user"
                  width={40}
                  height={40}
                  className="rounded-sm shadow-md hover:cursor-pointer"
                />
              </div>
              {modal && (
                <a
                  onClick={() => {
                    auth.signOut().then(() => router.push("/login"));
                  }}
                  onKeyDown={(e) =>
                    import("../../utils/checkKeyboardKeys").then(
                      (module) =>
                        module.default(e.code) &&
                        auth.signOut().then(() => router.push("/login"))
                    )
                  }
                  tabIndex={0}
                  className="w-fit bg-red text-white flex absolute top-12 -right-0
                   items-center gap-3 px-4 py-2 rounded-md shadow-md hover:cursor-pointer"
                >
                  <LogoutIcon className="w-5 h-5" />
                  Sair
                </a>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
