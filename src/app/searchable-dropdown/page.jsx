"use client";

import { useState } from "react";
import { fruits } from "../../lib/utils";

export default function SearchableDropdown() {
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  const handleDropdown = (show) => {
    setShow(show);
  };

  const filteredFruits = fruits.filter((fruit) =>
    fruit.toLowerCase().includes(value)
  );
  console.log(filteredFruits);

  return (
    <div>
      <div
        style={{ position: "relative" }}
        onClick={() => handleDropdown(true)}
      >
        {show ? (
          <div>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
          </div>
        ) : selected ? (
          selected
        ) : (
          "Choose a fruit"
        )}
      </div>
      {show && (
        <div
          style={{
            position: "absolute",
            top: 24,
            maxHeight: 240,
            overflowY: "scroll",
            border: "1px solid",
          }}
        >
          {filteredFruits.map((fruit) => {
            return (
              <div
                onClick={() => {
                  setSelected(fruit);
                  handleDropdown(false);
                }}
                key={fruit}
              >
                {fruit}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
