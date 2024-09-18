import { useState } from "react";
import useHook from "./hook";
import Image from "./img";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data } = useHook();

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };
  console.log(data);

  return (
    <section style={{ display: "flex", position: "relative" }}>
      <button
        onClick={handlePrev}
        style={{ position: "absolute", top: "50%", left: 0 }}
      >
        Prev
      </button>
      {/* {data?.map((image) => {
        return <Image key={image.id} url={image.urls.raw} />;
      })} */}
      {data && <Image url={data?.[currentIndex]?.urls.raw} />}

      <button
        onClick={handleNext}
        style={{ position: "absolute", top: "50%", right: 0 }}
      >
        Next
      </button>
    </section>
  );
};

export default Carousel;
