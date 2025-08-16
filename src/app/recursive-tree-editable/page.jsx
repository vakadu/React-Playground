'use client'

import { useState } from "react";

const tree = {
  id: "root",
  label: "Root",
  children: [
    {
      id: "1",
      label: "Node 1",
      children: [
        { id: "1.1", label: "Node 1.1" },
        {
          id: "1.2",
          label: "Node 1.2",
          children: [{ id: "1.2.1", label: "Node 1.2.1" }],
        },
      ],
    },
    { id: "2", label: "Node 2" },
    {
      id: "3",
      label: "Node 3",
      children: [{ id: "3.1", label: "Node 3.1" }],
    },
  ],
};

function Input({ item, handleNodeUpdate }) {
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState("");

  const handleDoubleClick = () => {
    setValue(item.label);
    setShowInput(true);
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      handleNodeUpdate(item.id, value);
      setShowInput(false);
    }
  };

  return (
    <>
      {showInput ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{item?.label}</span>
      )}
    </>
  );
}

function RenderTree({
  nodes,
  expanded,
  handleExpanded,
  handleNodeUpdate,
  handleDelete,
  handleAdd,
}) {
  return (
    <div style={{ marginLeft: 12 }}>
      {nodes &&
        nodes.map((c) => {
          return (
            <div key={c.id}>
              <div>
                <Input item={c} handleNodeUpdate={handleNodeUpdate} />
                <button onClick={() => handleExpanded(c.id)}>+</button>
                <button onClick={() => handleDelete(c.id)}>Del</button>
                <button
                  onClick={() =>
                    handleAdd(
                      c.id,
                      Math.floor(Math.random() * 100).toString(),
                      "Node"
                    )
                  }
                >
                  Add
                </button>
              </div>
              {expanded[c.id] && (
                <RenderTree
                  nodes={c.children}
                  expanded={expanded}
                  handleExpanded={handleExpanded}
                  handleNodeUpdate={handleNodeUpdate}
                  handleDelete={handleDelete}
                  handleAdd={handleAdd}
                />
              )}
            </div>
          );
        })}
    </div>
  );
}

export default function RecursiveTree() {
  const [expanded, setExpanded] = useState({ root: true });
  const [treeDs, setTreeDs] = useState(tree.children);

  const handleExpanded = (id) => {
    setExpanded((prev) => {
      return {
        ...prev,
        [id]: !prev[id],
      };
    });
  };

  const collapseAll = () => {
    setExpanded({ root: true });
  };

  const expandAll = (children) => {
    const keys = getKeys(children);
    const tempExpanded = { ...expanded };
    for (let key of keys) {
      tempExpanded[key] = true;
    }
    setExpanded((prev) => {
      return {
        ...prev,
        ...tempExpanded,
      };
    });
  };

  const getKeys = (children) => {
    const keys = [];
    for (let temp of children) {
      if (temp.children) {
        const newKeys = getKeys(temp.children);
        keys.push(temp.id);
        keys.push(...newKeys);
      } else {
        keys.push(temp.id);
      }
    }
    return keys;
  };

  const handleNodeUpdate = (id, val) => {
    const result = checkNode(id, val, treeDs);
    setTreeDs(result);
  };

  const checkNode = (id, val, nodes) => {
    return nodes.map((node) => {
      if (node.id === id) {
        return { ...node, label: val };
      }

      if (node.children) {
        return {
          ...node,
          children: checkNode(id, val, node.children),
        };
      }

      return node;
    });
  };

  const deleteNodes = (nodes, id) => {
    return nodes
      .filter((nod) => nod.id !== id)
      .map((node) => {
        if (node.children) {
          return {
            ...node,
            children: deleteNodes(node.children, id),
          };
        }
        return node;
      });
  };

  const handleDelete = (id) => {
    const newNodes = deleteNodes(treeDs, id);
    setTreeDs(newNodes);
  };

  const addNode = (nodes, parentId, id, label) => {
    return nodes.map((node) => {
      if (node.id === parentId) {
        const newChild = { id, label };
        const updatedChild = Array.isArray(node.children)
          ? [...nodes.children, newChild]
          : [newChild];
        return {
          ...node,
          children: updatedChild,
        };
      }

      if (node.children) {
        return {
          ...node,
          children: addNode(node.children, parentId, id, label),
        };
      }
      return node;
    });
  };

  const handleAdd = (parentId, id, label) => {
    const newNodes = addNode(treeDs, parentId, id, label);
    setTreeDs(newNodes)
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        {tree.label}
        <RenderTree
          nodes={treeDs}
          expanded={expanded}
          handleExpanded={handleExpanded}
          handleNodeUpdate={handleNodeUpdate}
          handleDelete={handleDelete}
          handleAdd={handleAdd}
        />
      </div>
      <button
        style={{ width: "auto", height: 42 }}
        onClick={() => expandAll(treeDs)}
      >
        Expand All
      </button>
      <button
        style={{ width: "auto", height: 42 }}
        onClick={() => collapseAll()}
      >
        Collapse All
      </button>
    </div>
  );
}
