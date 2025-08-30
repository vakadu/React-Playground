"use client";

import { useState } from "react";
import users from "./users";

export default function Page() {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const start = page * limit;
  const end = start+limit
  const mappedUsers = users.slice(start, end);
  const totalPages = Math.ceil(users.length/limit)

  function handlePrev() {
    setPage((p) => Math.max(0, p-1))
  }

  function handleNext() {
    setPage((p) => Math.min(totalPages-1, p+1))
  }

  function handleLimit(val: number) {
    setLimit(Number(val));
    setPage(0)
  }

  return (
    <div>
      <table>
        <thead>
          <tr className="font-semibold">
            <td>ID</td>
            <td>Name</td>
            <td>Age</td>
            <td>Occupation</td>
          </tr>
        </thead>
        <tbody>
          {mappedUsers.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.occupation}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-12 flex gap-10">
        <div className="flex flex-col max-w-[120px] rounded-2xl">
            <label>Choose Limit</label>
        <select
          value={limit}
          onChange={(e) => handleLimit(Number(e.target.value))}
        >
          {[5, 10, 20].map((it) => {
            return <option key={it}>{it}</option>;
          })}
        </select>
        </div>
        <div className="flex justify-center items-center gap-2">
            <button onClick={handlePrev}>Prev</button>
            <div>
                {page+1} of {totalPages}
            </div>
            <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
}
