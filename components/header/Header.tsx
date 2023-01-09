import Image from "next/image";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/solid";
import { GiftIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/solid";
import useWindowSize from "../../hooks/useWindowSize";
import { useEffect, useState } from "react";

export default function Header() {
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
          <nav className="flex justify-between bg-black py-6 md:px-16">
            <div className="flex gap-8 items-center" id="nav--left-div">
              <Image
                src="/assets/NetflixLogoSvg.svg"
                alt="logo"
                width={111}
                height={30}
                priority
              />
              <div className="flex text-white gap-4 items-center">
                <p className="hover:text-red cursor-pointer">Home</p>
                <p className="hover:text-red cursor-pointer">TV Shows</p>
                <p className="hover:text-red cursor-pointer">Movies</p>
                <p className="hover:text-red cursor-pointer">New & Popular</p>
                <p className="hover:text-red cursor-pointer">My List</p>
              </div>
            </div>
            <div className="flex items-center gap-2" id="nav--right-div">
              <div className="flex items-center gap-3">
                <MagnifyingGlassIcon
                  height={20}
                  width={20}
                  className="text-white"
                />
                <input
                  type="text"
                  placeholder="search"
                  className="bg-transparent text-white px-2 "
                />
              </div>
              <div className="flex items-center gap-4">
                <GiftIcon className="icon" />
                <BellIcon className="text-white h-5 w-5" />
                <Image
                  src="/assets/ProfileIMG.svg"
                  alt="user"
                  width={32}
                  height={32}
                />
                <ChevronDownIcon className="text-white h-5 w-5" />
              </div>
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav className="flex justify-between bg-black p-6">
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
              <>
                <MagnifyingGlassIcon
                  height={24}
                  width={24}
                  className="text-white"
                />
              </>
              <>
                <Bars3Icon className="h-8 w-8" />
              </>
              <div className="flex items-center">
                <Image
                  src="/assets/ProfileIMG.svg"
                  alt="user"
                  width={32}
                  height={32}
                />
                <ChevronDownIcon className="text-white h-5 w-5" />
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
