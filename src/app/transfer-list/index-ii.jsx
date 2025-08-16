import { useEffect, useState } from "react";

const DEFAULT_ITEMS_LEFT = ["HTML", "JavaScript", "CSS", "TypeScript"];
const DEFAULT_ITEMS_RIGHT = ["React", "Angular", "Vue", "Svelte"];

function Checkbox({ label, onChange, isChecked }) {
  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onChange(label)}
        value={label}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
}

function ItemsList({ list, setItems, selected, setDefaultItems }) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (selected.length === list.length && list.length > 0) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [selected, list]);

  const handleCheckbox = (label) => {
    if (selected.includes(label)) {
      setItems(selected.filter((item) => item !== label));
    } else {
      setItems([...selected, label]);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    setDefaultItems([...list, value]);
    setValue("");
  }

  function handleSelectAll() {
    if (checked) {
      setItems([]);
    } else {
      setItems(list);
    }
    setChecked(!checked);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ margin: "12px" }}>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
      </form>
      <div>
        <input type="checkbox" checked={checked} onChange={handleSelectAll} />
        {selected.length}/{list.length} selected
      </div>
      <ul
        style={{
          listStyle: "none",
          border: "1px solid",
          padding: 12,
          margin: 0,
        }}
      >
        {list.map((list) => {
          return (
            <li key={list}>
              <Checkbox
                label={list}
                isChecked={selected.includes(list)}
                onChange={handleCheckbox}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function TransferListii() {
  const [itemsLeft, setItemsLeft] = useState(DEFAULT_ITEMS_LEFT);
  const [itemsRight, setItemsRight] = useState(DEFAULT_ITEMS_RIGHT);
  const [selectedLeft, setSelectedLeft] = useState([]);
  const [selectedRight, setSelectedRight] = useState([]);

  function moveAllLeft() {
    setItemsLeft([...itemsLeft, ...itemsRight]);
    setItemsRight([]);
    setSelectedRight([]);
  }

  function moveLeft() {
    setItemsLeft([...itemsLeft, ...selectedRight]);
    setItemsRight(itemsRight.filter((item) => !selectedRight.includes(item)));
  }

  function moveRight() {
    setItemsRight([...itemsRight, ...selectedLeft]);
    setItemsLeft(itemsLeft.filter((item) => !selectedLeft.includes(item)));
  }

  function moveAllRight() {
    setItemsRight([...itemsRight, ...itemsLeft]);
    setItemsLeft([]);
    setSelectedLeft([]);
  }

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <ItemsList
        list={itemsLeft}
        selected={selectedLeft}
        setItems={setSelectedLeft}
        setDefaultItems={setItemsLeft}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button onClick={moveAllLeft}>{"<<"}</button>
        <button onClick={moveLeft}>{"<"}</button>
        <button onClick={moveAllRight}>{">>"}</button>
        <button onClick={moveRight}>{">"}</button>
      </div>
      <ItemsList
        list={itemsRight}
        selected={selectedRight}
        setItems={setSelectedRight}
        setDefaultItems={setItemsRight}
      />
    </div>
  );
}
