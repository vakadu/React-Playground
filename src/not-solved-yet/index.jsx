export default function Boxes() {
  return (
    <div
      style={{
        width: 120,
        height: 120,
        border: "1px solid black",
        display: "grid",
        gridTemplateRows: "repeat(3, 1fr)",
      }}
    >
      <div
        style={{ width: 40, height: "100%", border: "1px solid black" }}
      ></div>
      <div
        style={{ width: 40, height: "100%", border: "1px solid black" }}
      ></div>
      <div
        style={{ width: 40, height: "100%", border: "1px solid black" }}
      ></div>
    </div>
  );
}
