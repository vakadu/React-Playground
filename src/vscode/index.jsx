import { useState } from "react";
import { createPortal } from "react-dom";
import { v4 } from "uuid";

export default function Vscode() {
  const [data, setData] = useState([]);
  const [activeId, setActiveId] = useState();
  const [showMenu, setShowMenu] = useState(false);
  const [points, setPoints] = useState({});
  const [show, setShow] = useState(false);

  function handleAddFile() {
    const newData = [
      ...data,
      {
        id: v4(),
        name: "file",
      },
    ];
    setData(newData);
  }

  function updateFileName(id, value) {
    const newData = data?.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          name: value,
        };
      }
      return item;
    });
    setData(newData);
  }

  function fileItemClick(e) {
    e.stopPropagation();
    const target = e.target.closest("[data-id]");
    const id = target.getAttribute("data-id");
    if (id) {
      setActiveId(id);
    }
    setShowMenu(false);
  }

  function handleMenuContext(e) {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target.closest("[data-id]");
    if (target) {
      const id = target.getAttribute("data-id");
      if (id) {
        setActiveId(id);
        setShowMenu(true);
        setPoints({
          x: e.pageX,
          y: e.pageY,
        });
      }
    }
  }

  function handleAdd(e) {
    e.stopPropagation();
  }

  function handleRename(e) {
    e.stopPropagation();
    setShow(true);
  }

  function handleDelete(e) {
    e.stopPropagation();
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: 300,
          borderRight: "1px solid gray",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            padding: 12,
            margin: "6px 12px",
            border: "1px solid wheat",
            borderRadius: 12,
            gap: 16,
            display: "flex",
          }}
        >
          <button
            onClick={handleAddFile}
            style={{
              width: 32,
              height: 32,
              border: "none",
              color: "white",
              fontSize: 18,
              backgroundColor: "teal",
              cursor: "pointer",
            }}
          >
            +
          </button>
          <button
            style={{
              width: 32,
              height: 32,
              backgroundColor: "tomato",
              cursor: "pointer",
              border: "none",
              color: "white",
              fontSize: 18,
            }}
          >
            -
          </button>
        </div>
        <div
          style={{
            margin: "6px 12px",
            border: "1px solid wheat",
            padding: 12,
            borderRadius: 12,
            position: "relative",
          }}
          onClick={fileItemClick}
          onContextMenu={handleMenuContext}
        >
          {data?.map((item) => {
            return (
              <FileName
                item={item}
                updateFileName={updateFileName}
                activeId={activeId}
                key={item.id}
                fileItemClick={fileItemClick}
                show={show}
                setShow={setShow}
              />
            );
          })}
          {showMenu && (
            <Portal x={points.x} y={points.y}>
              <button onClick={handleAdd}>Add</button>
              <button onClick={handleRename}>Rename</button>
              <button onClick={handleDelete}>Delete</button>
            </Portal>
          )}
        </div>
      </div>
      <div style={{ flex: 1 }}></div>
    </div>
  );
}

function FileName({ item, updateFileName, activeId, show }) {
  const [value, setValue] = useState("");

  function onKeyDown(e, id) {
    if (e.code === "Enter") {
      updateFileName(id, value);
      setValue("");
    }
  }

  return (
    <div
      style={{
        padding: "6px 0",
        cursor: "pointer",
        backgroundColor: activeId === item.id ? "wheat" : "white",
      }}
      key={item.id}
      data-id={item.id}
    >
      {show && activeId === item.id ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => onKeyDown(e, item.id)}
        />
      ) : (
        <div>{item.name}</div>
      )}
    </div>
  );
}

function Portal({ children, x, y }) {
  return createPortal(
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        border: "1px solid wheat",
        backgroundColor: "wheat",
        padding: 8,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {children}
    </div>,
    document.getElementById("portal-root")
  );
}
