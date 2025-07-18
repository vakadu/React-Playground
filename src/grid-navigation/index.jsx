import { useEffect, useState } from "react";

export default function GridNavigation() {
  const [active, setActive] = useState([0, 0]);

  const handleKeyDown = (event) => {
    // const eventKey = event.key;
    // let tempActive = [...active];

    // if (eventKey === "ArrowRight") {
    //   tempActive[1] = Math.min(tempActive[1] + 1, 5);
    // }
    // if (eventKey === "ArrowLeft") {
    //   tempActive[1] = Math.max(tempActive[1] - 1, 0);
    // }
    // if (eventKey === "ArrowDown") {
    //   tempActive[0] = Math.min(tempActive[0] + 1, 5);
    // }
    // if ((eventKey === "ArrowUp")) {
    //   tempActive[0] = Math.max(tempActive[0] - 1, 0);
    // }
    // setActive(tempActive);

    const eventKey = event.key;
    const directions = {
        ArrowRight: [0,1],
        ArrowLeft: [0,-1],
        ArrowDown: [1,0],
        ArrowUp: [-1,0]
    }
    const move = directions[eventKey];
    if(!move) return;
    
    let [row, col] = active;
    const newRow = Math.max(0, Math.min(5, row + move[0]));
    const newCol = Math.max(0, Math.min(5, col + move[1]));
    setActive([newRow, newCol])
  };  

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [active]);

  return (
    <div>
      {Array(6)
        .fill(" ")
        .map((_, i) => {
          return (
            <div style={{ display: "flex" }} key={i}>
              {Array(6)
                .fill("")
                .map((_, ind) => {
                  const currentIndex = [i, ind];
                  const activeIndex =
                    currentIndex[0] === active[0] &&
                    currentIndex[1] === active[1];

                  return (
                    <div
                      key={ind}
                      style={{
                        width: 52,
                        height: 52,
                        border: `1px solid ${activeIndex ? "red" : "black"}`,
                      }}
                    ></div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
}
