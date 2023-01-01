import Image from "next/image";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/solid";
import { GiftIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
export default function Header() {
  return (
    <header>
      <nav className="flex justify-between bg-black py-6 px-16">
        <div className="flex gap-8 items-center" id="nav--left-div">
          <div>
            <Image
              src="/assets/NetflixLogoSvg.svg"
              alt="logo"
              width={111}
              height={30}
              priority
            />
          </div>
          <div className="flex text-white gap-4 items-center">
            <p>Home</p>
            <p>TV Shows</p>
            <p>Movies</p>
            <p>New & Popular</p>
            <p>My List</p>
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
            <GiftIcon className="text-white h-5 w-5" />
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
    </header>
  );
}
