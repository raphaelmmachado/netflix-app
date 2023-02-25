import Image from "next/image";
import LogoutIcon from "@heroicons/react/20/solid/ArrowRightOnRectangleIcon";
import { useState } from "react";

interface Props {
  userPhoto: string | null;
  userName: string | null;
  navIsOpen: boolean;
  logout: () => void;
}
export default function UserBox({
  userName,
  userPhoto,
  navIsOpen,
  logout,
}: Props) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <>
        <button
          onClick={() => setShowLogoutModal((prev) => !prev)}
          onKeyDown={(e) =>
            import("../../utils/checkKeyboardKeys").then(
              (module) =>
                module.default(e.code) && setShowLogoutModal((prev) => !prev)
            )
          }
          className="flex items-center gap-2  rounded-sm"
        >
          <Image
            src={userPhoto!}
            tabIndex={0}
            alt="user"
            width={30}
            height={30}
            className="rounded-sm shadow-md hover:cursor-pointer"
          />
          {navIsOpen && (
            <a className="text-sm " tabIndex={0}>
              {userName!}
            </a>
          )}
        </button>
        {showLogoutModal && (
          <button
            onClick={() => logout()}
            onKeyDown={(e) =>
              import("../../utils/checkKeyboardKeys").then(
                (module) => module.default(e.code) && logout()
              )
            }
            tabIndex={0}
            className="flex items-center gap-3 bg-red
            text-white px-1 py-1 w-fit mt-3
             rounded-md shadow-md hover:cursor-pointer"
          >
            <LogoutIcon className="w-5 h-5" />
            {navIsOpen && <h3 className="text-sm">Sair</h3>}
          </button>
        )}
      </>
    </>
  );
}
