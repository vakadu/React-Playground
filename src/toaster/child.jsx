import { useToast } from "./context";

export default function Child() {
  const { addToast } = useToast();

  function add() {
    addToast({ msg: "New Toast" });
  }

  return (
    <div>
      <button onClick={add}>Add Toast</button>
    </div>
  );
}
