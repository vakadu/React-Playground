"use client";

import { useState } from "react";

export default function UsersDatabase() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [users, setUsers] = useState([
    { first: "Hans", last: "Emil", id: `${Date.now()}-${Math.random()}` },
    { first: "Max", last: "Mustermann", id: `${Date.now()}-${Math.random()}` },
    { first: "Roman", last: "Tisch", id: `${Date.now()}-${Math.random()}` },
  ]);

  const filterdUsers = users.filter(
    (user) =>
      user.first.toLowerCase().includes(search.toLowerCase()) ||
      user.last.toLowerCase().includes(search.toLowerCase())
  );

  function onCreate(e) {
    e.preventDefault();
    const id = `${Date.now()}`;
    let obj = { id, first, last };
    setUsers([obj, ...users]);
  }

  function onUpdate(e) {
    e.preventDefault();
    let temp = [...users];
    const findUser = temp.find((user) => user.id === selected);
    findUser.first = first;
    findUser.last = last;
    setUsers(temp);
  }

  function onDelete(e) {
    e.preventDefault();
    setUsers(users.filter((user) => user.id !== selected));
    setFirst("");
    setLast("");
    setSelected();
  }

  return (
    <form>
      <div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search users"
          type="text"
          placeholder="Search"
        />
      </div>
      <div>
        <select
          size={5}
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
            const foundUser = users.find((user) => user.id === e.target.value);
            setFirst(foundUser.first);
            setLast(foundUser.last);
          }}
        >
          {filterdUsers.map((name) => {
            return (
              <option value={name.id} key={name.id}>
                {name.first}, {name.last}
              </option>
            );
          })}
        </select>
        <div className="inputs">
          <label>
            First Name:
            <input
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              type="text"
              required
            />
          </label>
          <label>
            Last Name:
            <input
              value={last}
              onChange={(e) => setLast(e.target.value)}
              type="text"
              required
            />
          </label>
        </div>
      </div>

      <div className="buttons">
        <button onClick={onCreate} value="create">
          Create
        </button>
        <button onClick={onUpdate} name="intent" value="update">
          Update
        </button>
        <button onClick={onDelete} name="intent" value="delete">
          Delete
        </button>
        <button name="intent" value="cancel">
          Cancel
        </button>
      </div>
    </form>
  );
}
