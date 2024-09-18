import { useEffect, useRef, useState } from "react";

const Image = ({ url }) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setLoaded(true);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.unobserve(ref.current);
    };
  }, []);

  return (
    <img
      ref={ref}
      src={loaded ? url : ""}
      style={{
        height: window.innerHeight,
        width: window.innerWidth,
        backgroundColor: "#e0e0e0",
      }}
    />
  );
};

export default Image;
