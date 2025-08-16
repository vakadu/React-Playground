"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

let names = ["Alice", "Bob", "Charlie", "David", "Emily"];

function checkUserName(name) {    
    console.log(name);
    
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = names.some((item) => item.toLowerCase() === name);      
      resolve(!result);
    }, 2000);
  });
}

function debounce(fn) {
  let timeout;

  return function (...args) {    
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, 500);
  };
}

export default function FormBuilderWithValidation() {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if(!username.trim()) {
        return
    }

    setStatus("checking...");

    const timeout = setTimeout(() => {
        checkUserName(username).then((available) => {
            if(available) {
                setStatus("Available")
            } else {
                setStatus("taken")
            }
        })
    }, 500)

    return () => {
        clearTimeout(timeout)
    }
  }, [username])

  return (
    <div>
      <form>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <span>{status}</span>
        <button style={{ marginTop: 12 }}>Submit</button>
      </form>
    </div>
  );
}
