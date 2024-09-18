import { useCallback, useState } from "react";

import { shuffle } from "../utils";

import Search from "./search";

const allUsers = ["john", "alex", "george", "simon", "james"];

export default function UseCallback() {
  const [users, setUsers] = useState(allUsers);

  const handleSearch = useCallback(
    () => (text) => {
      const filteredUsers = allUsers.filter((user) => user.includes(text));
      setUsers(filteredUsers);
    },
    [users]
  );

  const shuffledUsers = () => {
    setUsers((prev) => {
      let temp = shuffle([...prev]);
      return temp;
    });
  };

  return (
    <div className="tutorial">
      <div className="align-center mb-2 flex">
        <button onClick={shuffledUsers}>Shuffle</button>
        <Search onChange={handleSearch} />
      </div>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
}
