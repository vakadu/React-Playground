"use client";

import CreateUser from "./user-create";
import UserList from "./user-list";

export default function Chat() {
  return (
    <div>
      <CreateUser />
      <UserList />
    </div>
  );
}
