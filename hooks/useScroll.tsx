import { useEffect, useState } from "react";

export default function useScroll(length: number) {
  const [index, setIndex] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIndex((prev) => (prev + 1 > length - 1 ? prev : prev + 1));
    } else setIndex((prev) => (prev - 1 < 0 ? prev : prev - 1));
    console.log(index);
  };
  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener("wheel", handleScroll);
      return () => window.removeEventListener("wheel", handleScroll);
    }
  }, [index]);
  return { index, setIndex };
}
