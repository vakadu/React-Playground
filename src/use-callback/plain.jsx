import { memo } from "react";

//memo memoizes the component and doesnt rerender if the props doesnt changes

function Search({ value, handleChange }) {
  console.log("input");

  return (
    <div>
      <input value={value} onChange={handleChange} />
    </div>
  );
}

export default memo(Search);
