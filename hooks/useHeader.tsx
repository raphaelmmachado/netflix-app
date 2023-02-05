import { useEffect, useState } from "react";

export default function useScroll() {
  const [transparentNav, setTransparentNav] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setTransparentNav(false);
    } else setTransparentNav(true);
  };

  useEffect(() => {
    if (window !== undefined || typeof window !== "undefined") {
      window.addEventListener("wheel", handleScroll);
    }
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [transparentNav]);
  return transparentNav;
}
