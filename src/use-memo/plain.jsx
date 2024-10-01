export default function Search({ value, handleChange }) {
  console.log("input");

  return (
    <div>
      <input value={value} onChange={handleChange} />
    </div>
  );
}
