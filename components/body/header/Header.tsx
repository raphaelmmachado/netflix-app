import Image from "next/image";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/solid";
import { GiftIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/solid";
import useWindowSize from "../../../hooks/useWindowSize";
import { useEffect, useState } from "react";
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
          <nav className="flex justify-between py-6 md:px-16">
            <div className="flex gap-8 items-center" id="nav--left-div">
              <Image
                src="/assets/NetflixLogoSvg.svg"
                alt="logo"
                width={111}
                height={30}
                priority
              />
              <ul className="flex text-smokewt gap-4 items-center">
                <li
                  onClick={() => setIndex(0)}
                  className="hover:text-red cursor-pointer"
                >
                  Início
                </li>
                <li
                  onClick={() => setIndex(2)}
                  className="hover:text-red cursor-pointer"
                >
                  Séries
                </li>
                <li
                  onClick={() => setIndex(1)}
                  className="hover:text-red cursor-pointer"
                >
                  Filmes
                </li>
                <li
                  onClick={() => setIndex(0)}
                  className="hover:text-red cursor-pointer"
                >
                  Lançamentos
                </li>
                <li
                  onClick={() => setIndex(7)}
                  className="hover:text-red cursor-pointer"
                >
                  Minha Lista
                </li>
              </ul>
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
                  placeholder="Procurar"
                  className="bg-transparent text-white px-2 "
                />
              </div>
              <div className="flex items-center gap-4">
                <GiftIcon className="icon" />
                <BellIcon className="text-white h-5 w-5" />
                <span className="flex items-center gap-1">
                  <Image
                    src="/assets/ProfileIMG.svg"
                    alt="user"
                    width={32}
                    height={32}
                  />
                  <Bars3Icon className="text-white h-6 w-6" />
                </span>
              </div>
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav className="flex justify-between p-6">
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
