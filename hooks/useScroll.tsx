import { useEffect, useState, useContext, useCallback } from "react";
import { Context } from "../context/ContextProvider";

export default function useScroll(length: number) {
  const [index, setIndex] = useState(0);
  const { modalOpen } = useContext(Context);

  const incrementIndex = () =>
    setIndex((prev) => (prev + 1 > length - 1 ? prev : prev + 1));
  const decrementIndex = () =>
    setIndex((prev) => (prev - 1 < 0 ? prev : prev - 1));

  const handleScroll = () => {
    if (modalOpen) return;
    if (window.scrollY > 0) {
      incrementIndex();
    } else decrementIndex();
  };

  useEffect(() => {
    if (window !== undefined || typeof window !== "undefined") {
      window.addEventListener("wheel", handleScroll);
    }
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [index, modalOpen]);
  return { index, setIndex };
}
