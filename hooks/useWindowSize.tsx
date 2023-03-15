import { useState, useEffect } from "react";

// '() => { width: number; } | undefined'
export default function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/

  interface IWidth {
    width: number | undefined;
  }

  const [windowSize, setWindowSize] = useState<IWidth>({
    width: 10,
  });

  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      //nextjs runs on server so we have to check if window is not undefined
      if (window !== undefined || typeof window !== "undefined") {
        // Set window width/height to state
        switch (true) {
          case window.innerWidth < 450:
            setWindowSize({ width: 2 });
            break;
          case window.innerWidth < 640:
            setWindowSize({ width: 4 });
            break;
          case window.innerWidth < 770:
            setWindowSize({ width: 5 });
            break;
          case window.innerWidth < 850:
            setWindowSize({ width: 6 });
            break;
          case window.innerWidth < 980:
            setWindowSize({ width: 7 });
            break;
          case window.innerWidth < 1080:
            setWindowSize({ width: 8 });
            break;
          case window.innerWidth < 1440:
            setWindowSize({ width: 10 });
            break;
          default:
            setWindowSize({ width: 10 });
            break;
        }
      }
    }

    function checkIfMobile() {
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.includes("mobi") || userAgent.includes("tablet"))
        setMobile(true);
      else {
        return setMobile(false);
      }
    }
    checkIfMobile();
    // Add event listener
    window.addEventListener("resize", handleResize);
    // window.addEventListener("resize", checkOrientation);

    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      // window.removeEventListener("resize", checkOrientation);
    };
  }, []); // Empty array ensures that effect is only run on mount
  const { width } = windowSize;

  return { width, mobile };
}
