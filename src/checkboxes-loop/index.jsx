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

const Page = () => {
  const [checkboxes, setCheckboxes] = useState(defaultCheckboxData);

  const onChange = (checkbox) => {
    const updateCheckboxes = (items, box) => {
      return items.map((i) => {
        if (i.id === box.id) {
          i.checked = !i.checked;

          //to check child
          if (i.children) {
            i.children = i.children.map((child) => ({
              ...child,
              checked: i.checked,
            }));
          }
        } else if (i.children) {
          i.children = updateCheckboxes(i.children, box);
          const allChildrenChecked = i.children.every((child) => child.checked);
          const someChildrenChecked = i.children.some((child) => child.checked);

          if (someChildrenChecked) {
            i.checked = allChildrenChecked; // Parent is checked if all children are
          } else {
            i.checked = false; // Uncheck parent if no children are checked
          }

          //   return {
          //     ...i,
          //     children: updateCheckboxes(i.children, box),
          //   };
        }
        return i;
      });
    };

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

export default Page;
