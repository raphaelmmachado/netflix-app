import { useState, useEffect } from "react";

// '() => { width: number; } | undefined'
export default function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/

  interface IWidth {
    width: number | undefined;
  }

  const [windowSize, setWindowSize] = useState<IWidth>({
    width: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      //nextjs runs on server so we have to check if window is not undefined
      if (window !== undefined || typeof window !== "undefined") {
        // Set window width/height to state
        switch (true) {
          case window.innerWidth < 500:
            setWindowSize({ width: 1 });
            break;
          case window.innerWidth < 690:
            setWindowSize({ width: 2 });
            break;
          case window.innerWidth < 870:
            setWindowSize({ width: 3 });
            break;
          case window.innerWidth < 1100:
            setWindowSize({ width: 4 });
            break;
          case window.innerWidth < 1440:
            setWindowSize({ width: 5 });
            break;
          case window.innerWidth > 1440:
            setWindowSize({ width: 5 });
            break;
          default:
            break;
        }
      }
    }

    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup

    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}
// 4

// case window.innerWidth < 450:
//   setWindowSize({ width: 1 });
//   break;
// case window.innerWidth < 768:
//   setWindowSize({ width: 2 });
//   break;
// case window.innerWidth < 1024:
//   setWindowSize({ width: 3 });
//   break;
// case window.innerWidth < 1440:
//   setWindowSize({ width: 4 });
//   break;
// case window.innerWidth > 1440:
//   setWindowSize({ width: 5 });
//   break;
// default:
//   break;

//5
// case window.innerWidth < 500:
//   setWindowSize({ width: 1 });
//   break;
// case window.innerWidth < 690:
//   setWindowSize({ width: 2 });
//   break;
// case window.innerWidth < 870:
//   setWindowSize({ width: 3 });
//   break;
// case window.innerWidth < 1100:
//   setWindowSize({ width: 4 });
//   break;
// case window.innerWidth < 1440:
//   setWindowSize({ width: 5 });
//   break;
// case window.innerWidth > 1440:
//   setWindowSize({ width: 5 });
//   break;
// default:
//   break;
