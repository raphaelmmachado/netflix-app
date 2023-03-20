import { useState, useEffect } from "react";

function useMouseIdle(timeout: number = 5000, bool: boolean = true) {
  const [isIdle, setIsIdle] = useState(bool);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    function onActivity() {
      setIsIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIsIdle(true), timeout);
    }

    window.addEventListener("mousemove", onActivity);
    window.addEventListener("mousedown", onActivity);

    return () => {
      window.removeEventListener("mousemove", onActivity);
      window.removeEventListener("mousedown", onActivity);
      clearTimeout(timer);
    };
  }, [timeout]);
  return isIdle;
}

export default useMouseIdle;
