import { useEffect, useRef, useState } from "react";

const useInView = (options) => {
  const ref = useRef();
  const [isVisible, setisVisible] = useState();
  console.log(options);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setisVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return {
    ref,
    isVisible,
  };
};

export default useInView;
