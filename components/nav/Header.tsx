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
import useList from "../../hooks/useList";
import useWindowSize from "../../hooks/useWindowSize";
//components
import NetflixLogo from "../NetflixLogo";
import NavLinks from "./NavLinks";
//icons
import LogoutIcon from "@heroicons/react/20/solid/ArrowRightOnRectangleIcon";
import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import TVIcon from "@heroicons/react/24/outline/TvIcon";
import FilmIcon from "@heroicons/react/24/outline/FilmIcon";
import FolderIcon from "@heroicons/react/24/outline/FolderIcon";
import BarsIcon from "@heroicons/react/24/outline/ArrowLongRightIcon";
//utils

export default function Header() {
  const { myList } = useContext(Context);
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { width } = useWindowSize();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useList();

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
  }, [width, loading]);

  return (
    <>
      {!loading && user && (
        <header className="transition-all duration-200 delay-200 ease-in-out">
          <nav
            className={`fixed z-30 sm:top-0 sm:left-0 min-h-screen min-w-[3.5rem]
            rounded-tr-md rounded-br-md grid grid-rows-1
            justify-center justify-items-center items-start py-12
            gap-8 bg-black border border-l-0 border-midgray/20 transition-all delay-75
            duration-150 ease-in-out shadow-sm shadow-def_black ${
              navIsOpen && "px-4"
            }`}
          >
            <div
              className="flex flex-col items-center gap-6 text-sm sm:text-base"
              id="nav--logo"
            >
              {" "}
              {/* LOGO */}
              <span
                onClick={() => router.push("/")}
                className="cursor-pointer hover:scale-105 transition-all duration-200 delay-75 ease-in-out"
              >
                {navIsOpen ? (
                  <NetflixLogo width="150" height="50" />
                ) : (
                  <Image
                    src={"/favicon.ico"}
                    width={36}
                    height={36}
                    alt="netflix_logo"
                  />
                )}
              </span>{" "}
              {/* BARS ICON */}
              <div
                onClick={() => setNavIsOpen((prev) => !prev)}
                className="flex items-center rounded-md p-2 my-4
               hover:bg-midgray/20 text-midgray cursor-pointer"
              >
                {" "}
                <span className="w-[0.125rem] h-6 bg-midgray/80 "> </span>
                <BarsIcon
                  className={` transition-all duration-200 delay-75 ease-in-out ${
                    navIsOpen ? "w-10 h-10 rotate-180" : "w-6 h-6"
                  }`}
                />
              </div>
              {/* LINKS */}
              <ul
                className={`grid grid-rows-4 place-content-start transition-all duration-200 delay-75 ease-in-out
               ${navIsOpen ? "text-smokewt" : "text-midgray"} gap-3`}
              >
                {" "}
                <NavLinks
                  title="Filmes"
                  path="/filmes/geral/1"
                  navIsOpen={navIsOpen}
                >
                  <FilmIcon className="w-6 h-6 " />
                </NavLinks>
                <NavLinks
                  title="Séries"
                  path="/series/geral/1"
                  navIsOpen={navIsOpen}
                >
                  <TVIcon className="w-6 h-6 " />
                </NavLinks>
                {myList.length > 0 && (
                  <NavLinks
                    title="Minha Lista"
                    path="/minha_lista"
                    navIsOpen={navIsOpen}
                  >
                    <FolderIcon className="w-6 h-6 " />
                  </NavLinks>
                )}
              </ul>
            </div>
            {/* USER */}
            <div className="relative" id="nav--right-div">
              {!loading && user && (
                <>
                  <button
                    onClick={() => setShowLogoutModal((prev) => !prev)}
                    onKeyDown={(e) =>
                      import("../../utils/checkKeyboardKeys").then(
                        (module) =>
                          module.default(e.code) &&
                          setShowLogoutModal((prev) => !prev)
                      )
                    }
                    className="flex px-0  items-center gap-2"
                  >
                    <Image
                      src={`${user?.photoURL}`}
                      tabIndex={0}
                      alt="user"
                      width={30}
                      height={30}
                      className="rounded-sm shadow-md hover:cursor-pointer"
                    />{" "}
                    {navIsOpen && (
                      <a className="text-sm " tabIndex={0}>
                        {user?.displayName}
                      </a>
                    )}
                  </button>
                  {showLogoutModal && (
                    <button
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
                      className="flex items-center gap-3 bg-red
                      text-white px-2 py-1 w-fit mt-3
                       rounded-md shadow-md hover:cursor-pointer"
                    >
                      <LogoutIcon className="w-5 h-5" />
                      <h3 className="text-sm">Sair</h3>
                    </button>
                  )}
                </>
              )}
            </div>
          </nav>
        </header>
      )}
    </>
  );
}
// DESKTOP LOGO
{
  /* <div
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
                </div> */
}
// MOBILE LOGO
//  <NetflixLogo
//                     svg={{ width: "120", height: "50", fill: "none" }}
//                     path={{ fill: "#b9090b" }}
//                     rect={{ width: "80", height: "140", fill: "white" }}
//                   />
