import Form from "./form";
import { useStorage } from "./use-storage";

const newId = (() => {
  let id = 0;
  return () => id++;
})();

const TodoList = () => {
  const { value, setValue, data, handleDelete, handleSubmit, handleCheckbox, clearAll } = useStorage(
    "todos",
    []
  );  

  return (
    <div>
      <h1>Todo List</h1>
      <Form
        value={value}
        setValue={setValue}
        handleSubmit={handleSubmit}
        clearAll={clearAll}
      />
      <ul>
        {data?.map((it) => {
          return (
            <li key={it.id.toString()}>
              <input type="checkbox" checked={it.status === "completed"} onChange={() => handleCheckbox(it.id)} />
              <span>{it.text}</span>
              <span>({it.status})</span>
              <button onClick={() => handleDelete(it.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
