'use client'

import { useEffect, useRef, useState } from "react";

const options = [
  { id: "apple", label: "Apple" },
  { id: "banana", label: "Banana" },
  { id: "orange", label: "Orange" },
  { id: "mango", label: "Mango" },
];

export default function MultiSelectDropdown() {
  const [state, setState] = useState(options);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const filteredOptions = state.filter((option) =>
    option.label.toLowerCase().includes(value.toLowerCase())
  );
  const ref = useRef();

  useEffect(() => {
    function handleOutside(e) {
      console.log(ref, e.target);
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    window.addEventListener("mousedown", handleOutside);

    return () => {
      window.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  const handleCheckboxes = (id, value) => {
    // const temp = state.map((option) => {
    //     if(option.id === id) {
    //         return {
    //             ...option,
    //             checked: value
    //         }
    //     }
    //     return option
    // });
    // setState(temp)

    setState((prev) =>
      prev.map((option) => {
        if (option.id === id) {
          return {
            ...option,
            checked: value,
          };
        }
        return option;
      })
    );
  };

  const selectAll = () => {
    setState((prev) => prev.map((o) => ({ ...o, checked: true })));
  };
  const clearAll = () => {
    setState((prev) => prev.map((o) => ({ ...o, checked: false })));
  };

  return (
    <div ref={ref}>
      <div style={{ zIndex: 10 }}>
        <button
          onClick={(e) => {
            e.preventDefault();
            setOpen(!open);
          }}
        >
          Click here to select
        </button>
        {open && (
          <div>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            {filteredOptions.map((option) => {
              return (
                <div key={option.id}>
                  <input
                    checked={option.checked}
                    onChange={(e) =>
                      handleCheckboxes(option.id, e.target.checked)
                    }
                    type="checkbox"
                  />
                  <label>{option.label}</label>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
