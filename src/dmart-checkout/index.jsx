import { useState } from "react";

const DMartCheckout = () => {
  const initialCounters = new Array(5).fill().map(() => []);
  const [value, setValue] = useState("");
  const [grid, setGrid] = useState(initialCounters);
  const onSubmit = (e) => {
    e.preventDefault();

    const tempGrid = [...grid];
    let minIndex = tempGrid
      .map((counter) => counter.reduce((sum, item) => sum + item, 0))
      .indexOf(
        Math.min(
          ...tempGrid.map((counter) =>
            counter.reduce((sum, item) => sum + item, 0)
          )
        )
      );

    console.log(minIndex);

    // let minIndex = tempGrid
    //   .map((counter) => {
    //     console.log(counter, "====");

    //     return counter.length;
    //   })
    //   .indexOf(Math.min(...tempGrid.map((counter) => counter.length)));

    tempGrid[minIndex].push(Number(value));
    setGrid(tempGrid);
    setValue("");
  };

  const getMaxItemsLength = () => {
    return Math.max(...grid.map((counter) => counter.length));
  };

  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(+e.target.value)}
            required
          />
          <button type="submit">submit</button>
        </form>
      </div>

      <div style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          {grid.map((_, i) => (
            <div key={i} style={{ textAlign: "center", width: "50px" }}>
              <strong>{i + 1}</strong>
            </div>
          ))}
        </div>

        {grid.map((counter, counterIndex) => (
          <div
            key={counterIndex}
            style={{
              height: "30px", // Adjust as needed
              width: "50px",
              textAlign: "center",
              border: "1px solid teal",
            }}
          >
            {counter || ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DMartCheckout;
