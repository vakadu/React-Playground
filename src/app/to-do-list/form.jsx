import { memo } from "react";

function Form({ value, setValue, handleSubmit, clearAll }) {
      console.log("Form");

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Add your task"
        />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <button onClick={clearAll}>Clear All</button>
    </div>
  );
}

export default memo(Form);
