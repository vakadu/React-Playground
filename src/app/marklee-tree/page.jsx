"use client";

import { useState } from "react";
import data from "./data.json";

export default function MarkleeTree() {
  const history = data.versionHistory;
  //   const [date, setDate] = useState(null);//one date at a time open
  const [date, setDate] = useState(new Set());

  const handleDate = (newDate) => {
    const newSetDate = new Set(date)
    if(newSetDate.has(newDate)) {
        newSetDate.delete(newDate)
    } else {
        newSetDate.add(newDate)
    }
    setDate(newSetDate)
  };
  console.log(date);
  

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {Object.keys(history).map((h) => {
        return (
          <div
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
            key={h}
          >
            <div style={{ display: "flex" }}>
              <div>{h}</div>
              <div onClick={() => handleDate(h)}>+</div>
            </div>
            {date.has(h) &&
            //   history[date] &&
            //   h === date &&
              Object.entries(history[h]).map(([k, v]) => {
                console.log("===");
                
                return (
                  <div style={{ marginLeft: 24 }} key={k}>
                    <div>
                      {k} {"->"} {v.user}
                    </div>
                    <div style={{ marginLeft: 24 }}>
                      {v.ops.map((op, key) => {
                        return <div key={key}>{op.text}</div>;
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}
