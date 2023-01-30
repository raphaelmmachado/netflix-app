import { useEffect, useState, useContext } from "react";
import { Context } from "../context/ContextProvider";

export default function useScroll(length: number) {
  const [index, setIndex] = useState(0);
  const { modalOpen } = useContext(Context);
  const handleScroll = () => {
    if (modalOpen) return;
    if (window.scrollY > 0) {
      setIndex((prev) => (prev + 1 > length - 1 ? prev : prev + 1));
    } else setIndex((prev) => (prev - 1 < 0 ? prev : prev - 1));
  };

  useEffect(() => {
    if (window !== undefined || typeof window !== "undefined") {
      window.addEventListener("wheel", handleScroll);
    }
    return () => window.removeEventListener("wheel", handleScroll);
  }, [index, modalOpen]);
  return { index, setIndex };
}
