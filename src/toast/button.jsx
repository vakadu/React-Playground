import useToastMethods from "./use-methods";

export default function Buttons() {
  const { success } = useToastMethods();

  return (
    <div>
      <button
        onClick={() => success("1")}
        className="p-2 bg-blue-500 text-white rounded"
      >
        1
      </button>
    </div>
  );
}
