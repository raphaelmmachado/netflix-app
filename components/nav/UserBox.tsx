import Image from "next/image";
import LogoutIcon from "@heroicons/react/20/solid/ArrowRightOnRectangleIcon";
import TrashIcon from "@heroicons/react/20/solid/TrashIcon";
import { useState } from "react";

interface Props {
  userPhoto: string | null;
  userName: string | null;
  navIsOpen: boolean;
  logout: () => void;
  userDelete: () => void;
}
export default function UserBox({
  userName,
  userPhoto,
  navIsOpen,
  logout,
  userDelete,
}: Props) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <section className="flex flex-col justify-center items-center">
        <button
          onClick={() => setShowLogoutModal((prev) => !prev)}
          onKeyDown={(e) =>
            import("../../utils/checkKeyboardKeys").then(
              (module) =>
                module.enterKeyPressed(e.code) &&
                setShowLogoutModal((prev) => !prev)
            )
          }
          className="flex flex-col sm:flex-row items-center gap-5 sm:gap-2  rounded-sm"
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
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={() => logout()}
              onKeyDown={(e) =>
                import("../../utils/checkKeyboardKeys").then(
                  (module) => module.enterKeyPressed(e.code) && logout()
                )
              }
              tabIndex={0}
              className="flex items-center gap-2 bg-def_yellow-600
            text-white px-1 py-1 w-fit mt-3
             rounded-md shadow-md hover:cursor-pointer"
            >
              <LogoutIcon className="w-5 h-5" />
              {navIsOpen && <h3 className="text-sm">Sair</h3>}
            </button>
            <button
              className="flex items-center gap-2 bg-red
            text-white px-1 py-1 w-fit mt-3
             rounded-md shadow-md hover:cursor-pointer"
              onClick={() => userDelete()}
            >
              <TrashIcon className="w-5 h-5" />
              {navIsOpen && <h3 className="text-sm">Delete</h3>}
            </button>
          </div>
        )}
      </section>
    </>
  );
}
