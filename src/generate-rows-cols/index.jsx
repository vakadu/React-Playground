import { useEffect, useState } from "react";

const Generate = () => {
  const [rows, setRows] = useState("");
  const [cols, setCols] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data);

    const rows = data.get("rows");
    setRows(Number(rows));
    const columns = data.get("cols");
    setCols(Number(columns));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input id="rows" name="rows" type="number" />
        <input id="cols" name="cols" type="number" />
        <button type="submit">submit</button>
      </form>
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          {Array.from({ length: rows }, () => 0).map((_, row) => (
            <tr key={row}>
              {Array.from({ length: cols }, () => 0).map((_, col) => {
                // const cellValue = row * cols + (col + 1);
                //increaing seq
                return (
                  <td style={{ border: "1px solid" }} key={col}>
                    {col % 2 === 0
                      ? rows * col + (row + 1)
                      : rows * (col + 1) - row}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Generate;
