"use client";

import { useState } from "react";

const data = [
  {
    id: 1,
    name: "README.md",
  },
  {
    id: 2,
    name: "Documents",
    children: [
      {
        id: 3,
        name: "Word.doc",
      },
      {
        id: 4,
        name: "Powerpoint.ppt",
      },
    ],
  },
  {
    id: 5,
    name: "Downloads",
    children: [
      {
        id: 6,
        name: "unnamed.txt",
      },
      {
        id: 7,
        name: "Misc",
        children: [
          {
            id: 8,
            name: "foo.txt",
          },
          {
            id: 9,
            name: "bar.txt",
          },
        ],
      },
    ],
  },
];

export default function Page() {
  const [state, setState] = useState(data);

  return (
    <div>
      {state.map((node) => {
        return <File node={node} key={node.id} updateNode={setState} />;
      })}
    </div>
  );
}

function Input({ onKeyDown }: any) {
  const [value, setValue] = useState("");

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={onKeyDown}
    />
  );
}

function File({ node, updateNode }: any) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState(false);

  function onKeyDown(e: any) {
    if (e.code === "Enter") {
      //update node
      
      setShowInput(!showInput);
    }
  }

  return (
    <div>
      {showInput ? (
        <Input onKeyDown={onKeyDown} />
      ) : (
        <span onDoubleClick={() => setShowInput(!showInput)}>{node.name}</span>
      )}
      {node.children && <button onClick={() => setExpand(!expand)}>+</button>}
      {expand &&
        node.children &&
        node.children.map((newNode: any) => (
          <div className="ml-2 flex flex-row">
            <File node={newNode} updateNode={updateNode} />
          </div>
        ))}
    </div>
  );
}
