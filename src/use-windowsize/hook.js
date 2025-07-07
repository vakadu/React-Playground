import { useEffect, useRef, useState } from "react";

function throttle(fn) {
    let last = 0;

    return function(...args) {
        const now = new Date().getTime();

        if(now-last >= 500) {
            fn(...args);
            last = now
        }
    }
}

export function useWindowSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  function onResize(target) {
      setWidth(target.innerWidth);
      setHeight(target.innerHeight);
  }

  const throttleFunction = throttle(onResize)

  function handleResize(e) {
    throttleFunction(e.currentTarget)
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener('resize', handleResize)
    }
  }, []);

  return {
    width,
    height,
  };
}
