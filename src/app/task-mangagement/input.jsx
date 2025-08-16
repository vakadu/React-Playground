export default function Input({ value, setValue, addTask, text = "Add Task" }) {
  return (
    <form>
      <input
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="true"
      />
      <button type="submit" onClick={addTask}>
        {text}
      </button>
    </form>
  );
}
