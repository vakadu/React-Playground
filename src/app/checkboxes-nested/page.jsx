"use client";

import { useState } from "react";

const defaultCheckboxData = [
  {
    id: 1,
    name: "Electronics",
    checked: false,
    children: [
      {
        id: 2,
        name: "Mobile phones",
        checked: false,
        children: [
          { id: 3, name: "iPhone", checked: false },
          { id: 4, name: "Android", checked: false },
        ],
      },
      {
        id: 5,
        name: "Laptops",
        checked: false,
        children: [
          { id: 6, name: "MacBook", checked: false },
          { id: 7, name: "Surface Pro", checked: false },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Books",
    checked: false,
    children: [
      { id: 9, name: "Fiction", checked: false },
      { id: 10, name: "Non-fiction", checked: false },
    ],
  },
  { id: 11, name: "Toys", checked: false },
];

const Checkbox = ({ checkbox, onChange }) => {
  return (
    <div>
      <div style={{ marginBottom: 6 }}>
        <input
          onChange={() => onChange(checkbox)}
          type="checkbox"
          checked={checkbox.checked}
        />
        <span>{checkbox.name}</span>
      </div>
      {checkbox.children &&
        checkbox.children.map((box) => {
          return (
            <div key={box.id} style={{ marginLeft: 12 }}>
              <Checkbox checkbox={box} onChange={onChange} />
            </div>
          );
        })}
    </div>
  );
};

const CheckboxNested = () => {
  const [checkboxes, setCheckboxes] = useState(defaultCheckboxData);

  const allChildrenChecked = (children) => {
    return children.every((child) => child.checked);
  };

  const onChange = (checkbox) => {
    function updateCheckboxes(items, box) {
      return items.map((item) => {
        if (item.id === box.id) {
          const isChecked = !item.checked;
          item.checked = isChecked;

          if (item.children) {
            item.children = updateChildren(item.children, isChecked);
          }
        } else if (item.children) {
          item.children = updateCheckboxes(item.children, box);
          item.checked = allChildrenChecked(item.children);
        }

        return { ...item };
      });
    }

    function updateChildren(children, checked) {
      return children.map((child) => {
        return {
          ...child,
          checked,
          children: child.children
            ? updateChildren(child.children, checked)
            : [],
        };
      });
    }

    const updatedBoxes = updateCheckboxes(checkboxes, checkbox);
    setCheckboxes(updatedBoxes);
  };

  return (
    <div>
      {checkboxes.map((checkbox) => {
        return (
          <Checkbox key={checkbox.id} checkbox={checkbox} onChange={onChange} />
        );
      })}
    </div>
  );
};

export default CheckboxNested;
