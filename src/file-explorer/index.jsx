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

const File = ({ d }) => {
  const [show, setShow] = useState(false);
  return (
    <div onClick={() => setShow(true)}>
      {d.name}
      {show &&
        d.children?.length > 0 &&
        d.children.map((c) => {
          return <File key={c.id} d={c} />;
        })}
    </div>
  );
};

const FileExplorer = () => {
  return (
    <div>
      {data.map((d) => {
        return <File key={d.id} d={d} />;
      })}
    </div>
  );
};

export default FileExplorer;
