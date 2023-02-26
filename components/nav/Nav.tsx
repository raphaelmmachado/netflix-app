//react / next
import { useEffect, useState, useContext } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { SearchProvider } from "../../context/SearchContext";
//firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebaseConfig";
//context
import { Context } from "../../context/ContextProvider";
//custom hook
import useList from "../../hooks/useList";
//components
import NavLinks from "./NavLinks";
//icons

import TVIcon from "@heroicons/react/24/solid/TvIcon";
import FilmIcon from "@heroicons/react/24/solid/FilmIcon";
import FolderIcon from "@heroicons/react/24/solid/BookmarkIcon";
import NavLogo from "./NavLogo";
import NavExtendButton from "./NavExtendButton";
import UserBox from "./UserBox";
import NavSearch from "./NavSearch";
const Results = dynamic(() => import("./Results"), { ssr: false });
//utils

export default function Nav() {
  const { myList } = useContext(Context);
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useList();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user]);

  return (
    <>
      {!loading && user && (
        <header
          className="transition-all duration-200 delay-200 ease-in-out"
          id="nav-header"
        >
          <SearchProvider>
            {/* NAV */}
            <nav
              id="sidebar"
              className={` fixed sm:top-0 sm:left-0 sm:min-h-screen  sm:min-w-[3.5rem]
            flex sm:flex-row flex-col min-w-full min-h-max
            rounded-br-md rounded-tr-md z-30 sm:py-8             
            gap-8 bg-black  border-midgray/20  shadow-def_black
            border border-l-0 transition-all delay-75 duration-150
            ease-in-out shadow-sm ${navIsOpen && "px-4"}`}
            >
              <div
                className="flex flex-grow sm:flex-col justify-center items-center gap-6
               text-sm sm:text-base flex-wrap"
                id="nav--logo"
              >
                {/* LOGO */}
                <NavLogo open={navIsOpen} />
                {/* EXTEND NAV BUTTON */}
                <NavExtendButton
                  open={navIsOpen}
                  extendNav={() => setNavIsOpen((prev) => !prev)}
                />
                {/* LINKS */}
                <ul
                  id="nav-links"
                  className={`flex sm:flex-col items-start justify-around transition-all duration-200 delay-75 ease-in-out
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
                {/*NAV SEARCH  */}
                <NavSearch
                  OpenNav={() => setNavIsOpen(true)}
                  navIsOpen={navIsOpen}
                />{" "}
                {/* USER */}
                <div className="relative" id="nav--right-div">
                  {!loading && user && (
                    <>
                      {" "}
                      <UserBox
                        userName={user?.displayName}
                        userPhoto={user?.photoURL}
                        navIsOpen={navIsOpen}
                        logout={() =>
                          auth.signOut().then(() => router.push("/login"))
                        }
                      />
                    </>
                  )}
                </div>
              </div>
              {navIsOpen && (
                <div>
                  <Results />
                </div>
              )}
            </nav>
          </SearchProvider>
        </header>
      )}
    </>
  );
}