import { useState } from "react";
import Input from "./input";

export default function TaskMangement() {
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState("");
  const [sort, setSort] = useState("asc");
  const [search, setSearch] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    const task = {
      id: Date.now(),
      msg: value,
      priority: "low",
      completed: false,
    };
    setTasks((prev) => [...prev, task]);
    setValue("");
  };

  const remove = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const sortTasks = (type) => {
    const sorting = sort === "asc" ? "desc" : "asc";
    setSort(sorting);
    const newTasks = [...tasks];
    if (type === "id") {
      newTasks.sort((a, b) => (sorting === "asc" ? a.id - b.id : b.id - a.id));
    }
    if (type === "priority") {
      newTasks.sort((a, b) =>
        sorting === "asc"
          ? a.priority.localeCompare(b.priority)
          : b.priority.localeCompare(a.priority)
      );
    }

    if (type === "status") {
      newTasks.sort((a, b) =>
        sorting === "asc"
          ? Number(a.completed) - Number(b.completed)
          : Number(b.completed) - Number(a.completed)
      );
    }

    setTasks(newTasks);
  };

  const onSelectChange = (val, id, type) => {
    if (type === "priority") {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, priority: val } : task))
      );
    } else {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, completed: val === "completed" ? true : false }
            : task
        )
      );
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setTasks((prev) => prev.filter((newTask) => newTask.msg.includes(search)));
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: 24,
        maxWidth: 920,
        margin: "20px auto",
      }}
    >
      <table
        style={{ border: "1px solid", width: "100%", tableLayout: "fixed" }}
      >
        <thead>
          <tr>
            <th onClick={() => sortTasks("id")} style={{ width: "25%" }}>
              Id
            </th>
            <th style={{ width: "25%" }}>Task</th>
            <th onClick={() => sortTasks("priority")} style={{ width: "25%" }}>
              Priority
            </th>
            <th onClick={() => sortTasks("status")} style={{ width: "25%" }}>
              Status
            </th>
            <th style={{ width: "15%" }}></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr key={task.id}>
                <td style={{ textAlign: "center" }}>{task.id}</td>
                <td style={{ textAlign: "center" }}>{task.msg}</td>
                <td style={{ textAlign: "center" }}>
                  <select
                    onChange={(e) =>
                      onSelectChange(e.target.value, task.id, "priority")
                    }
                    defaultValue={task.priority}
                  >
                    <option value="low">Low</option>
                    <option value="high">High</option>
                  </select>
                </td>
                <td style={{ textAlign: "center" }}>
                  <select
                    onChange={(e) =>
                      onSelectChange(e.target.value, task.id, "status")
                    }
                    defaultValue={task.completed}
                  >
                    <option value="completed">Completed</option>
                    <option value="not-completed">Not Completed</option>
                  </select>
                </td>
                <td
                  onClick={() => remove(task.id)}
                  style={{ textAlign: "center" }}
                >
                  Dlt
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ border: "1px solid", padding: 20 }}>
        <div>
          <Input value={value} setValue={setValue} addTask={addTask} />
        </div>
        <div style={{ marginTop: 16 }}>
          <Input
            value={search}
            setValue={setSearch}
            addTask={handleSearch}
            text="Search"
          />
        </div>
      </div>
    </div>
  );
}
