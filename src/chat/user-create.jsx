import { useState } from "react";
import { chatService } from "./chat-service";

export default function CreateUser() {
  const [value, setValue] = useState("");

  const addUser = () => {
    const payload = {
      name: value,
      msg: "",
    };
    chatService.addUser(payload);
    setValue("");
  };

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={addUser}>Add</button>
    </div>
  );
}
