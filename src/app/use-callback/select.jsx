import { memo } from "react";

function Select({ selected, onChange }) {
  console.log("select");

  return (
    <select value={selected} onChange={onChange}>
      {["a", "b", "c"].map((item) => {
        return (
          <option key={item} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
}

export default memo(Select);
