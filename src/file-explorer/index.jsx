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
  const hasChildren = d.children?.length > 0;

  return (
    <div style={{ marginLeft: 6 }} onClick={() => setShow(true)}>
      <span>
        {d.name}
        {hasChildren && <span>{show ? "-" : "+"}</span>}
      </span>
      {show &&
        hasChildren &&
        d.children.map((c) => {
          return <File key={c.id} d={c} />;
        })}
    </div>
  );
};

const sortData = (data) => {
  return data
    .map((item) => {
      if (item.children) {
        item.children = sortData(item.children);
      }
      return item;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
};

const FileExplorer = () => {
  const sortedData = sortData(data);
  return (
    <div>
      {sortedData.map((item) => {
        return <File key={item.id} d={item} />;
      })}
    </div>
  );
};

export default FileExplorer;
