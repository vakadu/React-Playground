"use client";

import { useEffect, useMemo, useState } from "react";
import { FixedSizeGrid as Grid } from 'react-window';

export default function ReusableGrid() {
  const [rowsVal, setRowsVal] = useState('');
  const [columnsVal, setColumnsVal] = useState('');  

  // Memoize the rows and columns arrays
  const rows = useMemo(() => {
    return Array.from({ length: rowsVal }).fill(0);
  }, [rowsVal]);

  const columns = useMemo(() => {
    return Array.from({ length: columnsVal }).fill(0);
  }, [columnsVal]);

    const cellRenderer = ({ columnIndex, rowIndex, style }) => {
    return (
      <div
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #ddd',
        }}
      >
      </div>
    );
  };


  return (
    <div style={{ overflow: 'auto', width: '100%' }}>
      <div>
        <input 
          type="number" 
          value={rowsVal} 
          onChange={(e) => setRowsVal(e.target.value)} 
          placeholder="Enter number of rows"
        />
        <input 
          type="number" 
          value={columnsVal} 
          onChange={(e) => setColumnsVal(e.target.value)} 
          placeholder="Enter number of columns"
        />
      </div>

       {/* <Grid
        columnCount={columns.length}
        columnWidth={52} // Column width
        height={window?.innerHeight ?? 1000} // Height of the grid viewport
        rowCount={rows.length}
        rowHeight={52} // Height of each row
        width={window?.innerWidth ?? 1000} // Width of the grid viewport
      >
        {cellRenderer}
      </Grid> */}

      {/* <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {rows.map((row, i) => {
          return (
            <div key={i} style={{ display: "flex" }}>
              {columns.map((column, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: "52px", // Column width
                      height: "52px", // Row height
                      border: "1px solid #ddd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxSizing: "border-box",
                    }}
                  >
                  </div>
                );
              })}
            </div>
          );
        })}
      </div> */}
    </div>
  );
}
