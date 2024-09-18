import { useRef, useState } from "react";

const newId = (() => {
  let id = 0;
  return () => id++;
})();

const TodoList = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      id: newId(),
      text: value,
    };
    setData((prev) => {
      return [...prev, item];
    });
    setValue("");
  };

  const handleDelete = (id) => {
    const filterData = data.filter((d) => d.id !== id);
    setData(filterData);
  };

  return (
    <div>
      <h1>Todo List</h1>
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
      <ul>
        {data?.map((it) => {
          return (
            <li key={it.id.toString()}>
              <span>{it.text}</span>
              <button onClick={() => handleDelete(it.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
