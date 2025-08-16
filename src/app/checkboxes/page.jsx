"use client";

import React, { useMemo, useState } from "react";

const Checkbox = () => {
  const [checkboxes, setCheckboxes] = useState([
    { id: 0, checked: false, label: "Checkbox 1" },
    { id: 1, checked: false, label: "Checkbox 2" },
    { id: 2, checked: false, label: "Checkbox 3" },
    { id: 3, checked: false, label: "Checkbox 4" },
  ]);
  const allSelected = useMemo(() => {
    return checkboxes.every((box) => box.checked);
  }, [checkboxes]);
  const selected = useMemo(() => {
    return checkboxes.filter((box) => box.checked).length;
  }, [checkboxes]);

  const handleChange = (checkbox) => {
    const temp = checkboxes.map((box) => {
      if (checkbox.id === box.id) {
        return {
          ...box,
          checked: !box.checked,
        };
      }
      return box;
    });
    setCheckboxes(temp);
  };

  const selectAll = () => {
    const selected = checkboxes.every((box) => box.checked);
    const temp = checkboxes.map((box) => {
      return {
        ...box,
        checked: !selected,
      };
    });
    setCheckboxes(temp);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 16,
        marginTop: 32,
      }}
    >
      <span>{selected}</span>
      <button disabled={allSelected} onClick={selectAll}>
        Select All
      </button>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {checkboxes.map((checkbox) => {
          console.log(checkbox);

          return (
            <div key={checkbox.id}>
              <label>{checkbox.label}</label>
              <input
                checked={checkbox.checked}
                onChange={() => handleChange(checkbox)}
                type="checkbox"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Checkbox;
