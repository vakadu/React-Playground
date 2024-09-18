import React, { useState } from "react";

const StarRating = () => {
  let stars = new Array(5).fill(false);
  const [state, setState] = useState(stars);
  const [hoverInder, setHoverIndex] = useState(-1);

  const handleClick = (e) => {
    e.stopPropagation();
    const elem = e.target;
    const id = elem.getAttribute("data-id");
    const temp = state.map((_, i) => i <= Number(id));
    setState(temp);
  };

  const handleMouseEnter = (i) => {
    setHoverIndex(i);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  return (
    <div onClick={handleClick}>
      {state.map((star, i) => {
        return (
          <i
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            data-id={i}
            className={star || hoverInder >= i ? "fas fa-star" : "far fa-star"}
          ></i>
        );
      })}
    </div>
  );
};

export default StarRating;
