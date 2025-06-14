import { useState } from "react";

const formSchema = [
  { type: "text", label: "Name" },
  {
    type: "group",
    label: "Address",
    fields: [
      { type: "text", label: "Street" },
      { type: "text", label: "City" },
    ],
  },
  {
    type: "repeat",
    label: "Contacts",
    fields: [
      { type: "text", label: "Phone" },
      { type: "text", label: "Email" },
    ],
  },
];

export default function FormBuilder() {
  const [state, setState] = useState({});

  const handleChange = (value, key) => {
    const tempState = {...state};
    tempState[key] = value;
    setState(tempState);
  };

  return (
    <div>
        <div style={{ marginTop: 12, marginBottom: 12 }}>
            {JSON.stringify(state)}
        </div>
      <form>
        {formSchema.map((f, i) => {
          return (
            <Builder
              handleChange={handleChange}
              state={state}
              key={i}
              item={f}
            />
          );
        })}
      </form>
    </div>
  );
}

function Builder({ item, handleChange, state }) {
  const isGroup = item.type === "group";
  const isRepeat = item.type === "repeat";
  const key = item.label.toLowerCase();

  return (
    <div>
      <label>{item.label}</label>
      <input
        name={item.label.toLowerCase()}
        onChange={(e) => handleChange(e.target.value, item.label.toLowerCase())}
        type={item.type}
        value={state?.[key] ?? ""}
      />
      {(isGroup || isRepeat) &&
        item.fields.map((it, i) => (
          <Builder
            key={i}
            handleChange={handleChange}
            state={state}
            item={it}
          />
        ))}
    </div>
  );
}
