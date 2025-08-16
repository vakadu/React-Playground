import { useEffect, useState } from "react";
import { chatService } from "./chat-service";

export default function UserList() {
  const [users, setUsers] = useState(new Map());

  useEffect(() => {
    const update = (newUsers) => {
      const newMap = new Map(newUsers);
      setUsers(newMap);
    };

    chatService.suscribe(update);

    return () => chatService.unsubscribe(update);
  }, []);
  console.log(users);

  return (
    <div>
      {[...users.values()].map((user) => {
        return (
          <div style={{ display: "flex", gap: 12 }}>
            <span>{user.name}</span>
            <div>Msg: {user.msg}</div>
            <button onClick={() => chatService.sendMessage(user)}>send</button>
          </div>
        );
      })}
      {/* {users.map((user) => {
        console.log(user);

        return (
          <div>
            <span>{user.name}</span>
          </div>
        );
      })} */}
    </div>
  );
}
