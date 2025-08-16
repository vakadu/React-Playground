"use client";

import { useState } from "react";
import users from "./data.json";

function paginateUsers(page, size, userList) {
  const start = (page - 1) * size;
  const end = page * size;
  const data = userList.slice(start, end);
  const total = Math.ceil(userList.length / size);
  return { data, total };
}

function sortUsers(key, direction, users) {
  let temp = [...users];
  if (key === "id" || key === "age") {
    return temp.sort((a, b) =>
      direction === "asc" ? a[key] - b[key] : b[key] - a[key]
    );
  }

  if (key === "name" || key === "occupation") {
    return temp.sort((a, b) =>
      direction === "asc"
        ? a[key].localeCompare(b[key]) - b[key].localeCompare(a[key])
        : b[key].localeCompare(a[key]) - a[key].localeCompare(b[key])
    );
  }

  return temp;
}

const labels = [
  { key: "id", label: "Id" },
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "occupation", label: "Occupation" },
];

export default function Datatables() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [sortKey, setSortKey] = useState();
  const [direction, setDirection] = useState("asc");
  const sortedUsers = sortUsers(sortKey, direction, users);
  const { data, total } = paginateUsers(page, size, sortedUsers);

  const handleSort = (key) => {
    setSortKey(key);
    setDirection(direction === "asc" ? "desc" : "asc");
    setPage(1);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {labels.map((label) => {
              return (
                <th key={label.key}>
                  <button onClick={() => handleSort(label.key)}>
                    {label.label}
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => {
            return (
              <tr key={item?.id}>
                <td>{item?.id}</td>
                <td>{item?.name}</td>
                <td>{item?.age}</td>
                <td>{item?.occupation}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ display: "flex" }}>
        <select onChange={(e) => setSize(Number(e.target.value))}>
          <option key={5} value={5}>
            5
          </option>
          <option key={10} value={10}>
            10
          </option>
        </select>
        <button disabled={page <= 0} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <div>
          Page {page} of {total}
        </div>
        <button disabled={page >= total} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
