import Image from "next/image";
import { useRouter } from "next/router";
import NetflixLogo from "../NetflixLogo";
interface Props {
  open: boolean;
}
export default function NavLogo({ open }: Props) {
  const router = useRouter();

  return (
    <>
      {" "}
      <span
        onClick={() => router.push("/")}
        className="cursor-pointer
        hover:scale-105
         transition-all
          duration-200 
          delay-75
           ease-in-out"
      >
        {open ? (
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
    </>
  );
}
